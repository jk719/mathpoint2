'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BayesianKT, SkillMastery } from '@/lib/adaptive/BayesianKT';
import { ItemSelector, ItemCandidate } from '@/lib/adaptive/ItemSelector';
import {
  scoreDiagnostic,
  QuestionInput,
  SkillInfo,
  SectionInfo,
  DiagnosticResult,
} from '@/lib/diagnostic/DiagnosticScorer';
import { SATQuestion } from '@/types/sat';
import { DiagnosticQuestion } from '@/types';
import { demoSkills, getDemoSkillById } from '@/data/demo-skills';
import { demoQuestions } from '@/data/demo-questions';
import {
  toDisplayQuestion,
  toItemCandidate,
  extractAnswerLabel,
} from '@/lib/utils/questionAdapters';
import { Language } from '@/lib/i18n/translations';

// ─── Internal (non-persisted) engine state ───────────────────────────────────

let bkt: BayesianKT | null = null;
let selector: ItemSelector | null = null;
let masteriesMap: Map<string, SkillMastery> = new Map();
let itemCandidates: ItemCandidate[] = [];
let itemsPresented: string[] = [];

// ─── Persisted store types ───────────────────────────────────────────────────

interface StoredResponse {
  questionId: string;
  skillId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

interface DiagnosticState {
  phase: 'idle' | 'active' | 'complete';
  currentQuestion: DiagnosticQuestion | null;
  currentQuestionRaw: SATQuestion | null;
  questionNumber: number;
  responses: StoredResponse[];
  startTime: number | null;
  questionStartTime: number | null;
  diagnosticResult: DiagnosticResult | null;

  // Actions
  startDiagnostic: (language?: Language) => void;
  submitAnswer: (answer: string | string[], language?: Language) => void;
  updateLanguage: (language: Language) => void;
  reset: () => void;
}

// ─── Time defaults by difficulty ─────────────────────────────────────────────

const TIME_DEFAULTS: Record<string, { expected: number; min: number }> = {
  Easy: { expected: 30000, min: 1000 },
  Medium: { expected: 45000, min: 1000 },
  Hard: { expected: 60000, min: 1500 },
};

// ─── Helper: pick a question and set it as current ───────────────────────────

function selectAndConvert(language: Language = 'en'): {
  display: DiagnosticQuestion;
  raw: SATQuestion;
} | null {
  if (!selector) return null;

  const candidate = selector.selectNextItem(
    itemCandidates,
    masteriesMap,
    {},
    itemsPresented
  );
  if (!candidate) return null;

  const raw = demoQuestions.find((q) => q.id === candidate.id);
  const skill = getDemoSkillById(raw?.skillId ?? '');
  if (!raw || !skill) return null;

  itemsPresented.push(candidate.id);
  candidate.presentedCount += 1;

  return { display: toDisplayQuestion(raw, skill, language), raw };
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set, get) => ({
      phase: 'idle',
      currentQuestion: null,
      currentQuestionRaw: null,
      questionNumber: 0,
      responses: [],
      startTime: null,
      questionStartTime: null,
      diagnosticResult: null,

      startDiagnostic: (language: Language = 'en') => {
        // Initialize engines
        bkt = new BayesianKT();
        selector = new ItemSelector(bkt);
        masteriesMap = new Map();
        itemsPresented = [];

        // Initialize mastery for every demo skill
        for (const skill of demoSkills) {
          masteriesMap.set(skill.id, bkt.initializeSkillMastery(skill.id));
        }

        // Build item candidates from all demo questions
        itemCandidates = demoQuestions.map((q) => {
          const skill = getDemoSkillById(q.skillId)!;
          return toItemCandidate(q, skill);
        });

        // Select first question
        const first = selectAndConvert(language);
        if (!first) return;

        set({
          phase: 'active',
          currentQuestion: first.display,
          currentQuestionRaw: first.raw,
          questionNumber: 1,
          responses: [],
          startTime: Date.now(),
          questionStartTime: Date.now(),
          diagnosticResult: null,
        });
      },

      updateLanguage: (language: Language) => {
        const state = get();
        if (state.phase !== 'active' || !state.currentQuestionRaw) return;
        const skill = getDemoSkillById(state.currentQuestionRaw.skillId);
        if (!skill) return;
        set({
          currentQuestion: toDisplayQuestion(state.currentQuestionRaw, skill, language),
        });
      },

      submitAnswer: (answer: string | string[], language: Language = 'en') => {
        const state = get();
        if (state.phase !== 'active' || !state.currentQuestionRaw || !bkt || !selector) return;

        const answerStr = Array.isArray(answer) ? answer[0] : answer;
        const label = extractAnswerLabel(answerStr);
        const raw = state.currentQuestionRaw;
        const isCorrect = label === raw.correctAnswer;
        const timeSpentMs = Date.now() - (state.questionStartTime ?? Date.now());

        // Update BKT mastery
        const mastery = masteriesMap.get(raw.skillId);
        if (mastery) {
          bkt.updateMastery(mastery, isCorrect, 0.75, timeSpentMs);
        }

        // Record response
        const response: StoredResponse = {
          questionId: raw.id,
          skillId: raw.skillId,
          selectedAnswer: label,
          correctAnswer: raw.correctAnswer,
          isCorrect,
          timeSpentMs,
        };
        const newResponses = [...state.responses, response];

        // Check if we should stop (min 15, max 25 for thorough demo)
        const { shouldStop } = selector.shouldStop(
          masteriesMap,
          newResponses.length,
          15,
          25
        );

        if (shouldStop) {
          // Score the diagnostic
          const skillInfoMap = new Map<string, SkillInfo>();
          for (const s of demoSkills) {
            skillInfoMap.set(s.id, {
              skillId: s.id,
              displayName: s.displayName,
              topic: s.topic,
              pattern: s.pattern,
              difficulty: s.difficulty,
            });
          }

          // Build section infos from topics
          const topics = [...new Set(demoSkills.map((s) => s.topic))];
          const sectionInfos: SectionInfo[] = topics.map((t) => ({
            sectionId: t.toLowerCase().replace(/\s+/g, '-'),
            sectionName: t,
            slug: t.toLowerCase().replace(/\s+/g, '-'),
          }));

          const skillToSectionMap = new Map<string, string>();
          for (const s of demoSkills) {
            skillToSectionMap.set(
              s.id,
              s.topic.toLowerCase().replace(/\s+/g, '-')
            );
          }

          const questionInputs: QuestionInput[] = newResponses.map((r) => {
            const sk = getDemoSkillById(r.skillId);
            const times = TIME_DEFAULTS[sk?.difficulty ?? 'Medium'];
            return {
              questionId: r.questionId,
              skillId: r.skillId,
              selectedAnswer: r.selectedAnswer,
              correctAnswer: r.correctAnswer,
              timeSpentMs: r.timeSpentMs,
              expectedTimeMs: times.expected,
              minReasonableTimeMs: times.min,
            };
          });

          const result = scoreDiagnostic(
            `demo-${Date.now()}`,
            'demo-user',
            questionInputs,
            skillInfoMap,
            sectionInfos,
            skillToSectionMap
          );

          set({
            phase: 'complete',
            responses: newResponses,
            diagnosticResult: result,
            currentQuestion: null,
            currentQuestionRaw: null,
          });
          return;
        }

        // Select next question
        const next = selectAndConvert(language);
        if (!next) {
          // No more questions available — force completion
          set({ phase: 'complete', responses: newResponses });
          return;
        }

        set({
          currentQuestion: next.display,
          currentQuestionRaw: next.raw,
          questionNumber: state.questionNumber + 1,
          questionStartTime: Date.now(),
          responses: newResponses,
        });
      },

      reset: () => {
        bkt = null;
        selector = null;
        masteriesMap = new Map();
        itemCandidates = [];
        itemsPresented = [];

        set({
          phase: 'idle',
          currentQuestion: null,
          currentQuestionRaw: null,
          questionNumber: 0,
          responses: [],
          startTime: null,
          questionStartTime: null,
          diagnosticResult: null,
        });
      },
    }),
    {
      name: 'mathpoint-diagnostic',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
      partialize: (state) =>
        ({
          phase: state.phase,
          questionNumber: state.questionNumber,
          responses: state.responses,
          startTime: state.startTime,
          diagnosticResult: state.diagnosticResult,
        }) as unknown as DiagnosticState,
    }
  )
);
