// Enhanced Types for Algebra 1 Adaptive Diagnostic System

import { AlgebraSkill } from '@/data/algebra1-skills';
import { AlgebraMisconception } from '@/data/algebra1-misconceptions';
import { SkillMastery, MasteryUpdate } from '@/lib/adaptive/BayesianKT';

// =====================================
// QUESTION FORMATS
// =====================================

export type ItemFormat =
  | 'MCQ'           // Multiple choice
  | 'NUM'           // Numerical input
  | 'FR'            // Free response
  | 'TWO_TIER'      // Answer + reasoning
  | 'ERROR_ANALYSIS' // Find and fix errors
  | 'MULTI_STEP'    // Step-by-step solution
  | 'STEP_SELECTION' // Check all steps that apply
  | 'HYBRID_VERIFY'; // Answer + process verification

export type ItemDifficulty = 'LOW' | 'MEDIUM' | 'HIGH';

// =====================================
// QUESTION MODELS
// =====================================

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionCodes?: string[]; // Misconceptions triggered by this choice
  feedback?: string;             // Specific feedback for this choice
}

export interface Rubric {
  pattern: string | RegExp;       // Pattern to match in response
  points: number;                 // Points awarded
  misconceptionCodes?: string[];  // Misconceptions indicated
  feedback?: string;              // Feedback for this pattern
}

export interface Hint {
  level: number;        // 1, 2, 3 (progressive)
  content: string;      // Hint text (supports LaTeX)
  deductPoints?: number; // Points to deduct if used
}

export interface AlgebraItem {
  id: string;
  code: string;                    // e.g., "ALG1_LINEAR_001"
  stem: string;                    // Question text (supports LaTeX via $...$)
  format: ItemFormat;
  difficulty: ItemDifficulty;

  // Skills tested
  skillCodes: string[];            // Skills from algebra1-skills.ts
  primarySkillCode: string;        // Main skill being tested

  // IRT Parameters
  irtA: number;                    // Discrimination (0.5-2.5)
  irtB: number;                    // Difficulty (-3 to 3)
  irtC: number;                    // Guessing (0-0.5)

  // Content based on format
  choices?: Choice[];              // For MCQ, TWO_TIER
  correctAnswer?: any;             // Answer format varies by type
  rubric?: Rubric[];              // For FR, ERROR_ANALYSIS

  // Two-tier specific
  reasoningPrompt?: string;        // "Why did you choose that answer?"
  reasoningRubric?: Rubric[];     // Scoring for reasoning

  // Error analysis specific
  errorProblem?: string;           // Problem with intentional error
  errorLocation?: string;          // Where the error is
  errorType?: string;              // Type of error made

  // Multi-step specific
  steps?: QuestionStep[];          // Individual steps to solve

  // Step-selection specific
  stepOptions?: StepOption[];      // All possible steps (correct and incorrect)

  // Hybrid verification specific
  verificationPrompt?: string;      // "Which steps did you use to solve this?"
  verificationOptions?: VerificationOption[]; // Steps/methods to verify
  requiredVerifications?: string[]; // IDs of must-select verifications

  // Support content
  solution?: string;               // Full solution explanation
  hints?: Hint[];                  // Progressive hints
  context?: string;                // Real-world context if applicable

  // Timing
  timeLimit: number;               // Seconds
  avgTimeMs?: number;              // Average time from past attempts

  // Metadata
  tags?: string[];                 // Additional categorization
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QuestionStep {
  id: string;
  instruction: string;
  expectedAnswer: any;
  rubric?: Rubric[];
  skillCode?: string;              // Specific skill for this step
}

// For STEP_SELECTION format
export interface StepOption {
  id: string;
  text: string;                    // Step description (supports LaTeX)
  isCorrect: boolean;              // Whether this is a correct step
  order?: number;                  // Order for correct steps (1, 2, 3...)
  misconceptionCode?: string;      // Misconception indicated if selected
  skillCode?: string;              // Skill being tested
  feedback?: string;               // Specific feedback for this step
}

// For HYBRID_VERIFY format
export interface VerificationOption {
  id: string;
  text: string;                    // Verification step/method description
  isRequired?: boolean;            // Must be selected for full credit
  isCorrect?: boolean;             // Whether this is a correct approach
  category?: 'setup' | 'solve' | 'check'; // Step category
  points?: number;                 // Points for selecting this
  misconceptionCode?: string;      // Misconception if incorrectly selected/omitted
  skillCode?: string;              // Skill being verified
}

// =====================================
// STUDENT RESPONSE
// =====================================

export interface StudentAttempt {
  id: string;
  itemId: string;
  studentId: string;
  sessionId: string;

  // Response data
  answerGiven: any;                // Format depends on question type
  isCorrect: boolean;
  partialCredit?: number;          // 0-1 for partial credit

  // Two-tier response
  reasoning?: string;              // For TWO_TIER format
  reasoningScore?: number;

  // Multi-step responses
  stepResponses?: StepResponse[];

  // Hybrid verification responses
  verificationSelections?: string[]; // IDs of selected verification steps

  // Rich data
  timeSpentMs: number;
  confidence: number;              // 0-100
  hintsUsed: number[];            // Which hints were used
  attemptNumber: number;

  // Process data
  keystrokes?: KeystrokeData[];
  workShown?: string;             // Student's scratch work

  // Analysis results
  misconceptionsTriggered: string[]; // Detected misconceptions
  skillScores: Map<string, number>;  // Score per skill tested

  timestamp: Date;
}

export interface StepResponse {
  stepId: string;
  answer: any;
  isCorrect: boolean;
  timeMs: number;
}

export interface KeystrokeData {
  timestamp: number;
  key: string;
  action: 'press' | 'release';
}

// =====================================
// DIAGNOSTIC SESSION
// =====================================

export interface AdaptiveDiagnosticSession {
  id: string;
  studentId: string;

  // Session configuration
  config: SessionConfig;

  // Progress
  startTime: Date;
  endTime?: Date;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ABANDONED';

  // Items and responses
  itemsPresented: AlgebraItem[];
  attempts: StudentAttempt[];
  currentItemIndex: number;

  // Mastery tracking
  masteryStates: Map<string, SkillMastery>;
  masteryUpdates: MasteryUpdate[];

  // Misconception tracking
  misconceptionsDetected: MisconceptionDetection[];

  // Results
  finalReport?: DiagnosticReport;
}

export interface SessionConfig {
  maxItems: number;                // Maximum questions (default 25)
  minItems: number;                // Minimum questions (default 10)
  targetDomains?: string[];        // Focus areas
  adaptiveMode: boolean;           // Use adaptive selection
  allowHints: boolean;
  timeLimit?: number;              // Total time in minutes
  mvp?: boolean;                   // Use MVP question set (15 questions)
  demo?: boolean;                  // Demo mode (alias for mvp)
}

export interface MisconceptionDetection {
  misconceptionCode: string;
  frequency: number;               // How often detected (0-1)
  confidence: number;              // Detection confidence (0-1)
  evidenceItems: string[];         // Item IDs where detected
}

// =====================================
// DIAGNOSTIC REPORT
// =====================================

export interface DiagnosticReport {
  sessionId: string;
  studentId: string;
  completedAt: Date;

  // Summary statistics
  totalQuestions: number;
  correctCount: number;
  avgTimePerQuestion: number;
  avgConfidence: number;

  // Skill mastery
  masteredSkills: SkillReport[];      // Strong understanding
  developingSkills: SkillReport[];    // Developing understanding
  weakSkills: SkillReport[];          // Needs more practice

  // Misconceptions
  misconceptions: MisconceptionReport[];

  // Learning path
  recommendations: Recommendation[];
  learningPath: string[];             // Ordered skill codes to study

  // Predicted outcomes
  estimatedTimeToMastery: Map<string, number>; // Hours per skill
  predictedSuccessRate: Map<string, number>;   // If studied

  // Detailed performance
  domainPerformance: DomainReport[];
}

export interface SkillReport {
  skill: AlgebraSkill;
  level: 'STRONG' | 'DEVELOPING' | 'WEAK';  // Simplified mastery level
  evidenceCount: number;
  correctRate: number;
  avgResponseTime: number;
  misconceptions: string[];          // Related misconceptions
}

export interface MisconceptionReport {
  misconception: AlgebraMisconception;
  frequency: number;
  confidence: number;
  affectedSkills: string[];
  evidenceItems: string[];
  remediation: string;
}

export interface Recommendation {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'PRACTICE' | 'REVIEW' | 'LESSON' | 'ASSESSMENT';
  skillCode: string;
  description: string;
  estimatedTime: number;             // Minutes
  resources?: Resource[];
}

export interface Resource {
  type: 'VIDEO' | 'EXERCISE' | 'READING' | 'GAME';
  title: string;
  url?: string;
  duration?: number;                 // Minutes
}

export interface DomainReport {
  domain: string;
  overallMastery: number;
  questionsAttempted: number;
  correctRate: number;
  strongestSkills: string[];
  weakestSkills: string[];
  timeSpent: number;                // Total milliseconds
}

// =====================================
// API INTERFACES
// =====================================

export interface StartDiagnosticRequest {
  studentId: string;
  config?: Partial<SessionConfig>;
  resumeSessionId?: string;         // Resume previous session
}

export interface StartDiagnosticResponse {
  sessionId: string;
  firstItem: AlgebraItem;
  estimatedDuration: number;        // Minutes
  totalSkillsToTest: number;
}

export interface SubmitAnswerRequest {
  sessionId: string;
  itemId: string;
  answer: any;
  reasoning?: string;               // For TWO_TIER
  stepResponses?: StepResponse[];  // For MULTI_STEP
  confidence: number;
  timeSpentMs: number;
  workShown?: string;
  hintsUsed?: number[];
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  partialCredit?: number;
  feedback?: string;
  correctAnswer?: any;
  solution?: string;

  // Misconceptions detected
  misconceptionsDetected: string[];

  // Next item or completion
  nextItem?: AlgebraItem;
  isComplete: boolean;
  report?: DiagnosticReport;

  // Progress
  questionsRemaining: number;
  estimatedTimeRemaining: number;
}

export interface GetReportRequest {
  sessionId: string;
  includeDetails?: boolean;
}

// =====================================
// UTILITY TYPES
// =====================================

export interface ItemBank {
  items: AlgebraItem[];
  totalItems: number;
  bySkill: Map<string, AlgebraItem[]>;
  byDomain: Map<string, AlgebraItem[]>;
  byFormat: Map<ItemFormat, AlgebraItem[]>;
  byDifficulty: Map<ItemDifficulty, AlgebraItem[]>;
}

export interface MasterySnapshot {
  timestamp: Date;
  masteries: Map<string, number>;
  questionsAnswered: number;
}

export interface PerformanceMetrics {
  accuracy: number;
  avgTimeMs: number;
  consistency: number;              // How consistent responses are
  improvementRate: number;          // Learning velocity
  engagementScore: number;          // Based on time, confidence, hints
}