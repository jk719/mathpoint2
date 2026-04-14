// ── Knowledge Graph Types ──────────────────────────────

export type EdgeType = 'prerequisite' | 'difficulty_progression' | 'lateral';

export interface SkillEdge {
  from: string;        // skillId of the prerequisite / easier skill
  to: string;          // skillId of the dependent / harder skill
  type: EdgeType;
  weight: number;      // 0-1, strength of the relationship
}

export interface SkillNode {
  skillId: string;
  topic: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prerequisites: string[];   // skillIds this depends on
  dependents: string[];      // skillIds that depend on this
  laterals: string[];        // same-difficulty correlated skills
}

export interface PropagationResult {
  skillId: string;
  previousMastery: number;
  propagatedMastery: number;
  source: 'direct_observation' | 'upward_propagation' | 'downward_propagation' | 'lateral';
  confidence: number;  // decays with hop distance
}

// ── Response Time Model Types ──────────────────────────

export type FluencyLevel = 'AUTOMATED' | 'COMPUTED' | 'STRUGGLING' | 'GUESSING';

export interface TimeModelState {
  skillId: string;
  meanLogTime: number;       // running mean of ln(timeMs)
  m2LogTime: number;         // Welford's M2 accumulator for variance
  sampleCount: number;
  lastObservedTimeMs: number;
}

export interface FluencyAssessment {
  skillId: string;
  fluencyLevel: FluencyLevel;
  zScore: number;            // how many SDs from mean log-time
  fluencyScore: number;      // 0-1 normalized, higher = more fluent
  rawTimeMs: number;
  isCorrect: boolean;
  tutorContext: string;      // human-readable context for AI tutor
}

// ── Re-test Loop Types ─────────────────────────────────

export type RetestPhase = 'pre_tutor' | 'tutoring' | 'post_tutor' | 'complete';

export interface RetestSession {
  skillId: string;
  phase: RetestPhase;
  preTutorMastery: number;
  preTutorAvgTimeMs: number;
  postTutorMastery: number;
  postTutorAvgTimeMs: number;
  questionsServed: number;
  questionsTarget: number;
  masteryDelta: number;
  timeDelta: number;         // negative = faster = better
  tutorEfficiencyScore: number;
}

export interface RetestResult {
  skillId: string;
  masteryDelta: number;
  timeDelta: number;
  fluencyImproved: boolean;
  tutorEfficiencyScore: number;
  recommendation: 'mastered' | 'improving' | 'needs_more_practice' | 'try_different_approach';
}
