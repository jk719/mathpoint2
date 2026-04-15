'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BayesianKT, SkillMastery } from '@/lib/adaptive/BayesianKT';
import { ItemSelector, ItemCandidate } from '@/lib/adaptive/ItemSelector';
import { KnowledgeGraph } from '@/lib/adaptive/KnowledgeGraph';
import { ResponseTimeModel } from '@/lib/adaptive/ResponseTimeModel';
import { SATQuestion } from '@/types/sat';
import { DiagnosticQuestion } from '@/types';
import { demoSkills, getDemoSkillById } from '@/data/demo-skills';
import { demoQuestions } from '@/data/demo-questions';
import { getAllEdges } from '@/data/skill-prerequisites';
import {
  toDisplayQuestion,
  toItemCandidate,
  extractAnswerLabel,
} from '@/lib/utils/questionAdapters';
import { Language } from '@/lib/i18n/translations';

// ─── Internal (non-persisted) engine state ───────────────────────────────────

let bkt: BayesianKT | null = null;
let selector: ItemSelector | null = null;
let knowledgeGraph: KnowledgeGraph | null = null;
let timeModel: ResponseTimeModel | null = null;
let masteriesMap: Map<string, SkillMastery> = new Map();
let itemCandidates: ItemCandidate[] = [];
let itemsPresented: string[] = [];

// ─── Constants ──────────────────────────────────────────────────────────────

const MAX_PRACTICE_QUESTIONS = 10;
const MASTERY_THRESHOLD = 0.85;

// ─── Types ──────────────────────────────────────────────────────────────────

interface PracticeResponse {
  questionId: string;
  skillId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

interface PracticeState {
  phase: 'idle' | 'active' | 'complete';
  targetSkillId: string | null;
  targetSkillName: string | null;
  currentQuestion: DiagnosticQuestion | null;
  currentQuestionRaw: SATQuestion | null;
  questionNumber: number;
  responses: PracticeResponse[];
  startTime: number | null;
  questionStartTime: number | null;
  initialMastery: number;
  currentMastery: number;
  lastAnswerCorrect: boolean | null;

  // Actions
  startPractice: (skillId: string, language?: Language) => void;
  submitAnswer: (answer: string | string[], language?: Language) => void;
  reset: () => void;
}

// ─── Helper: pick next question for the target skill ────────────────────────

function selectAndConvert(targetSkillId: string, language: Language = 'en'): {
  display: DiagnosticQuestion;
  raw: SATQuestion;
} | null {
  if (!selector) return null;

  const candidate = selector.selectNextItem(
    itemCandidates,
    masteriesMap,
    { targetSkills: [targetSkillId] },
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

// ─── Store ──────────────────────────────────────────────────────────────────

export const usePracticeStore = create<PracticeState>()(
  persist(
    (set, get) => ({
      phase: 'idle',
      targetSkillId: null,
      targetSkillName: null,
      currentQuestion: null,
      currentQuestionRaw: null,
      questionNumber: 0,
      responses: [],
      startTime: null,
      questionStartTime: null,
      initialMastery: 0,
      currentMastery: 0,
      lastAnswerCorrect: null,

      startPractice: (skillId: string, language: Language = 'en') => {
        const targetSkill = getDemoSkillById(skillId);
        if (!targetSkill) return;

        // Initialize engines
        bkt = new BayesianKT();
        selector = new ItemSelector(bkt);
        masteriesMap = new Map();
        itemsPresented = [];

        // Initialize mastery for every demo skill
        for (const skill of demoSkills) {
          masteriesMap.set(skill.id, bkt.initializeSkillMastery(skill.id));
        }

        // Initialize knowledge graph
        const edges = getAllEdges(demoSkills);
        knowledgeGraph = new KnowledgeGraph(
          edges,
          demoSkills.map((s) => ({ id: s.id, topic: s.topic, pattern: s.pattern, difficulty: s.difficulty }))
        );

        bkt.onMasteryUpdate((skillCode, _mastery, _isCorrect) => {
          if (knowledgeGraph && masteriesMap.has(skillCode)) {
            const currentMastery = masteriesMap.get(skillCode)!.pMastery;
            knowledgeGraph.propagate(skillCode, masteriesMap, currentMastery);
          }
        });

        // Initialize response time model
        timeModel = new ResponseTimeModel();
        timeModel.initialize(
          demoSkills.map((s) => ({ id: s.id, difficulty: s.difficulty }))
        );
        selector.setTimeModel(timeModel);

        // Build item candidates — include target skill + same-topic skills for variety
        const targetTopic = targetSkill.topic;
        const relevantQuestions = demoQuestions.filter((q) => {
          const sk = getDemoSkillById(q.skillId);
          return sk && sk.topic === targetTopic;
        });

        itemCandidates = relevantQuestions.map((q) => {
          const skill = getDemoSkillById(q.skillId)!;
          return toItemCandidate(q, skill);
        });

        // Record initial mastery for the target skill
        const initMastery = masteriesMap.get(skillId)?.pMastery ?? 0.3;

        // Select first question
        const first = selectAndConvert(skillId, language);
        if (!first) return;

        set({
          phase: 'active',
          targetSkillId: skillId,
          targetSkillName: targetSkill.displayName,
          currentQuestion: first.display,
          currentQuestionRaw: first.raw,
          questionNumber: 1,
          responses: [],
          startTime: Date.now(),
          questionStartTime: Date.now(),
          initialMastery: Math.round(initMastery * 100),
          currentMastery: Math.round(initMastery * 100),
          lastAnswerCorrect: null,
        });
      },

      submitAnswer: (answer: string | string[], language: Language = 'en') => {
        const state = get();
        if (state.phase !== 'active' || !state.currentQuestionRaw || !bkt || !selector || !state.targetSkillId) return;

        const answerStr = Array.isArray(answer) ? answer[0] : answer;
        const label = extractAnswerLabel(answerStr);
        const raw = state.currentQuestionRaw;
        const isCorrect = label === raw.correctAnswer;
        const timeSpentMs = Date.now() - (state.questionStartTime ?? Date.now());

        // Update BKT mastery (triggers knowledge graph propagation)
        const mastery = masteriesMap.get(raw.skillId);
        if (mastery) {
          bkt.updateMastery(mastery, isCorrect, 0.75, timeSpentMs);
        }

        // Update response time model
        if (timeModel) {
          timeModel.update(raw.skillId, timeSpentMs);
        }

        // Record response
        const response: PracticeResponse = {
          questionId: raw.id,
          skillId: raw.skillId,
          selectedAnswer: label,
          correctAnswer: raw.correctAnswer,
          isCorrect,
          timeSpentMs,
        };
        const newResponses = [...state.responses, response];

        // Get updated mastery for target skill
        const targetMastery = masteriesMap.get(state.targetSkillId)?.pMastery ?? 0;
        const currentMasteryPct = Math.round(targetMastery * 100);

        // Check stopping conditions
        const shouldStop =
          targetMastery >= MASTERY_THRESHOLD ||
          newResponses.length >= MAX_PRACTICE_QUESTIONS;

        if (shouldStop) {
          set({
            phase: 'complete',
            responses: newResponses,
            currentMastery: currentMasteryPct,
            lastAnswerCorrect: isCorrect,
            currentQuestion: null,
            currentQuestionRaw: null,
          });
          return;
        }

        // Select next question
        const next = selectAndConvert(state.targetSkillId, language);
        if (!next) {
          // No more questions — force completion
          set({
            phase: 'complete',
            responses: newResponses,
            currentMastery: currentMasteryPct,
            lastAnswerCorrect: isCorrect,
          });
          return;
        }

        set({
          currentQuestion: next.display,
          currentQuestionRaw: next.raw,
          questionNumber: state.questionNumber + 1,
          questionStartTime: Date.now(),
          responses: newResponses,
          currentMastery: currentMasteryPct,
          lastAnswerCorrect: isCorrect,
        });
      },

      reset: () => {
        bkt = null;
        selector = null;
        knowledgeGraph = null;
        timeModel = null;
        masteriesMap = new Map();
        itemCandidates = [];
        itemsPresented = [];

        set({
          phase: 'idle',
          targetSkillId: null,
          targetSkillName: null,
          currentQuestion: null,
          currentQuestionRaw: null,
          questionNumber: 0,
          responses: [],
          startTime: null,
          questionStartTime: null,
          initialMastery: 0,
          currentMastery: 0,
          lastAnswerCorrect: null,
        });
      },
    }),
    {
      name: 'mathpoint-practice',
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
          targetSkillId: state.targetSkillId,
          targetSkillName: state.targetSkillName,
          questionNumber: state.questionNumber,
          responses: state.responses,
          startTime: state.startTime,
          initialMastery: state.initialMastery,
          currentMastery: state.currentMastery,
        }) as unknown as PracticeState,
    }
  )
);
