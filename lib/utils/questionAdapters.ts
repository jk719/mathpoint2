import { SATQuestion, SATSkill } from '@/types/sat';
import { DiagnosticQuestion } from '@/types';
import { ItemCandidate } from '@/lib/adaptive/ItemSelector';
import { Language } from '@/lib/i18n/translations';
import { demoQuestionsZh } from '@/data/demo-questions-zh';

/**
 * Convert a SATQuestion + its skill into a DiagnosticQuestion for the QuestionCard component.
 * When language is 'zh', overlays Mandarin question text and choices.
 */
export function toDisplayQuestion(
  q: SATQuestion,
  skill: SATSkill,
  language: Language = 'en'
): DiagnosticQuestion {
  const zh = language === 'zh' ? demoQuestionsZh[q.id] : null;

  return {
    id: q.id,
    type: 'multiple-choice',
    difficulty: skill.difficulty,
    branch: skill.topic,
    content: zh?.questionText ?? q.questionText,
    options: zh
      ? zh.choices.map((c) => `${c.label}. ${c.text}`)
      : q.choices.map((c) => `${c.label}. ${c.text}`),
    hint: q.explanation,
  };
}

/**
 * Convert a SATQuestion + its skill into an ItemCandidate for the adaptive ItemSelector.
 * Synthesizes IRT parameters from difficulty level.
 */
export function toItemCandidate(
  q: SATQuestion,
  skill: SATSkill
): ItemCandidate {
  const difficultyMap: Record<string, { irtB: number; diff: 'LOW' | 'MEDIUM' | 'HIGH' }> = {
    Easy: { irtB: -1.0, diff: 'LOW' },
    Medium: { irtB: 0.0, diff: 'MEDIUM' },
    Hard: { irtB: 1.5, diff: 'HIGH' },
  };

  const params = difficultyMap[skill.difficulty] ?? { irtB: 0, diff: 'MEDIUM' };

  return {
    id: q.id,
    code: q.skillId,
    skillCodes: [q.skillId],
    difficulty: params.diff,
    format: 'multiple-choice',
    irtA: 1.0,
    irtB: params.irtB,
    irtC: 0.25, // 1/4 chance for 4-choice MC
    presentedCount: 0,
  };
}

/**
 * Extract the answer label (A, B, C, D) from the full option text
 * that QuestionCard returns on submit.
 * e.g., "A. California Roll" → "A"
 */
export function extractAnswerLabel(fullAnswer: string): string {
  const match = fullAnswer.match(/^([A-D])\./);
  return match ? match[1] : fullAnswer;
}
