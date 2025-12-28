// Diagnostic Scoring System
// Uses simple accuracy + time analysis for the 1-hour diagnostic
// BKT is reserved for practice sessions

import {
  ResponseQuality,
  TimeFlag,
  calculateTimeFlag,
  determineResponseQuality,
  markPatternResponses,
  calculateEngagementScore,
  shouldFlagForReview,
  ResponseForQualityCheck,
} from './ResponseQualityChecker'

// =============================================================================
// TYPES
// =============================================================================

export type SkillDifficulty = 'Easy' | 'Medium' | 'Hard'

export type SkillStatus =
  | 'MASTERED'          // accuracy >= 0.85 AND validResponses >= 2
  | 'DEVELOPING'        // accuracy >= 0.5 AND < 0.85 AND validResponses >= 2
  | 'WEAK'              // accuracy < 0.5 AND validResponses >= 1
  | 'INSUFFICIENT_DATA' // validResponses < 1

export type TimeAnalysis =
  | 'FLUENT'    // avgTime < expectedTime AND accuracy >= 0.7
  | 'SLOW'      // avgTime > 1.5x expectedTime AND accuracy >= 0.5
  | 'STRUGGLED' // avgTime > 2x expectedTime OR (slow AND accuracy < 0.5)
  | 'RUSHED'    // avgTime < 0.5x expectedTime

export interface QuestionResult {
  questionId: string
  skillId: string
  isCorrect: boolean
  timeSpentMs: number
  expectedTimeMs: number
  minReasonableTimeMs: number
  responseQuality: ResponseQuality
  timeFlag: TimeFlag
  selectedAnswer: string
}

export interface SkillResult {
  skillId: string
  displayName: string
  topic: string
  pattern: string
  difficulty: SkillDifficulty
  questionsAttempted: number
  questionsCorrect: number
  accuracy: number // 0-1, only from VALID responses
  avgTimeMs: number
  timeAnalysis: TimeAnalysis
  status: SkillStatus
  validResponses: number
  expectedTimeMs: number // average expected time for this skill's questions
}

export interface SectionResult {
  sectionId: string
  sectionName: string
  slug: string
  totalSkills: number
  masteredCount: number
  developingCount: number
  weakCount: number
  insufficientDataCount: number
  overallAccuracy: number
  avgTimeMs: number
  engagementScore: number
  skills: SkillResult[]
}

export interface DiagnosticResult {
  sessionId: string
  userId: string
  completedAt: Date
  totalTimeMs: number

  // Overall stats
  totalQuestions: number
  correctCount: number
  accuracy: number
  engagementScore: number
  flaggedForReview: boolean

  // Breakdowns
  sections: SectionResult[]
  skills: SkillResult[]

  // Prioritized lists for the report
  strengths: SkillResult[] // top 5 MASTERED skills
  weaknesses: SkillResult[] // all WEAK skills, sorted by importance
  recommended: SkillResult[] // suggested practice order
}

// Input types for scoring functions
export interface QuestionInput {
  questionId: string
  skillId: string
  selectedAnswer: string
  correctAnswer: string
  timeSpentMs: number
  expectedTimeMs: number
  minReasonableTimeMs: number
}

export interface SkillInfo {
  skillId: string
  displayName: string
  topic: string
  pattern: string
  difficulty: SkillDifficulty
  prerequisites?: string[] // skill IDs that should be learned first
}

export interface SectionInfo {
  sectionId: string
  sectionName: string
  slug: string
}

// =============================================================================
// SCORING FUNCTIONS
// =============================================================================

/**
 * Score a single question response
 */
export function scoreQuestion(input: QuestionInput): QuestionResult {
  const isCorrect = input.selectedAnswer === input.correctAnswer
  const responseQuality = determineResponseQuality(
    input.timeSpentMs,
    input.minReasonableTimeMs
  )
  const timeFlag = calculateTimeFlag(input.timeSpentMs, input.expectedTimeMs)

  return {
    questionId: input.questionId,
    skillId: input.skillId,
    isCorrect,
    timeSpentMs: input.timeSpentMs,
    expectedTimeMs: input.expectedTimeMs,
    minReasonableTimeMs: input.minReasonableTimeMs,
    responseQuality,
    timeFlag,
    selectedAnswer: input.selectedAnswer,
  }
}

/**
 * Score multiple questions and apply pattern detection
 */
export function scoreQuestionsWithPatterns(
  inputs: QuestionInput[]
): QuestionResult[] {
  // First, score each question individually
  const results = inputs.map(scoreQuestion)

  // Convert to format for pattern detection
  const forPatternCheck: ResponseForQualityCheck[] = results.map(r => ({
    timeSpentMs: r.timeSpentMs,
    selectedAnswer: r.selectedAnswer,
    isCorrect: r.isCorrect,
    minReasonableTimeMs: r.minReasonableTimeMs,
    expectedTimeMs: r.expectedTimeMs,
  }))

  // Apply pattern detection (spam, low engagement)
  const updatedQualities = markPatternResponses(forPatternCheck)

  // Update results with pattern-detected qualities
  return results.map((result, idx) => ({
    ...result,
    responseQuality: updatedQualities[idx],
  }))
}

/**
 * Determine skill status based on accuracy and valid responses
 */
function determineSkillStatus(
  accuracy: number,
  validResponses: number
): SkillStatus {
  if (validResponses < 1) {
    return 'INSUFFICIENT_DATA'
  }

  if (accuracy >= 0.85 && validResponses >= 2) {
    return 'MASTERED'
  }

  if (accuracy >= 0.5 && validResponses >= 2) {
    return 'DEVELOPING'
  }

  return 'WEAK'
}

/**
 * Determine time analysis based on average time and accuracy
 */
function determineTimeAnalysis(
  avgTimeMs: number,
  expectedTimeMs: number,
  accuracy: number
): TimeAnalysis {
  const timeRatio = avgTimeMs / expectedTimeMs

  // Rushed: < 0.5x expected time
  if (timeRatio < 0.5) {
    return 'RUSHED'
  }

  // Struggled: > 2x expected OR (slow AND low accuracy)
  if (timeRatio > 2 || (timeRatio > 1.5 && accuracy < 0.5)) {
    return 'STRUGGLED'
  }

  // Slow: > 1.5x expected but decent accuracy
  if (timeRatio > 1.5 && accuracy >= 0.5) {
    return 'SLOW'
  }

  // Fluent: < expected AND good accuracy
  if (timeRatio <= 1 && accuracy >= 0.7) {
    return 'FLUENT'
  }

  // Default to SLOW for everything else
  return 'SLOW'
}

/**
 * Score a skill based on question results
 */
export function scoreSkill(
  skillInfo: SkillInfo,
  questionResults: QuestionResult[]
): SkillResult {
  const skillResults = questionResults.filter(q => q.skillId === skillInfo.skillId)

  if (skillResults.length === 0) {
    return {
      skillId: skillInfo.skillId,
      displayName: skillInfo.displayName,
      topic: skillInfo.topic,
      pattern: skillInfo.pattern,
      difficulty: skillInfo.difficulty,
      questionsAttempted: 0,
      questionsCorrect: 0,
      accuracy: 0,
      avgTimeMs: 0,
      timeAnalysis: 'SLOW',
      status: 'INSUFFICIENT_DATA',
      validResponses: 0,
      expectedTimeMs: 0,
    }
  }

  // Separate valid and invalid responses
  const validResults = skillResults.filter(r => r.responseQuality === 'VALID')
  const validResponses = validResults.length

  // Calculate accuracy only from VALID responses
  const validCorrect = validResults.filter(r => r.isCorrect).length
  const accuracy = validResponses > 0 ? validCorrect / validResponses : 0

  // Calculate average time from all attempts
  const totalTime = skillResults.reduce((sum, r) => sum + r.timeSpentMs, 0)
  const avgTimeMs = skillResults.length > 0 ? totalTime / skillResults.length : 0

  // Calculate expected time (average of question expected times)
  const totalExpected = skillResults.reduce((sum, r) => sum + r.expectedTimeMs, 0)
  const expectedTimeMs = skillResults.length > 0 ? totalExpected / skillResults.length : 60000

  // Determine status and time analysis
  const status = determineSkillStatus(accuracy, validResponses)
  const timeAnalysis = determineTimeAnalysis(avgTimeMs, expectedTimeMs, accuracy)

  return {
    skillId: skillInfo.skillId,
    displayName: skillInfo.displayName,
    topic: skillInfo.topic,
    pattern: skillInfo.pattern,
    difficulty: skillInfo.difficulty,
    questionsAttempted: skillResults.length,
    questionsCorrect: skillResults.filter(r => r.isCorrect).length,
    accuracy,
    avgTimeMs,
    timeAnalysis,
    status,
    validResponses,
    expectedTimeMs,
  }
}

/**
 * Score a section based on skill results
 */
export function scoreSection(
  sectionInfo: SectionInfo,
  skillResults: SkillResult[]
): SectionResult {
  const sectionSkills = skillResults.filter(s =>
    // Skills belong to this section (we'll need to pass this mapping)
    true // For now, assume all passed skills belong to this section
  )

  const masteredCount = sectionSkills.filter(s => s.status === 'MASTERED').length
  const developingCount = sectionSkills.filter(s => s.status === 'DEVELOPING').length
  const weakCount = sectionSkills.filter(s => s.status === 'WEAK').length
  const insufficientDataCount = sectionSkills.filter(s => s.status === 'INSUFFICIENT_DATA').length

  // Calculate overall accuracy (weighted by questions attempted)
  const totalQuestions = sectionSkills.reduce((sum, s) => sum + s.questionsAttempted, 0)
  const totalCorrect = sectionSkills.reduce((sum, s) => sum + s.questionsCorrect, 0)
  const overallAccuracy = totalQuestions > 0 ? totalCorrect / totalQuestions : 0

  // Calculate average time
  const totalTime = sectionSkills.reduce((sum, s) => sum + s.avgTimeMs * s.questionsAttempted, 0)
  const avgTimeMs = totalQuestions > 0 ? totalTime / totalQuestions : 0

  // Calculate engagement score
  const totalValid = sectionSkills.reduce((sum, s) => sum + s.validResponses, 0)
  const engagementScore = totalQuestions > 0 ? totalValid / totalQuestions : 1

  return {
    sectionId: sectionInfo.sectionId,
    sectionName: sectionInfo.sectionName,
    slug: sectionInfo.slug,
    totalSkills: sectionSkills.length,
    masteredCount,
    developingCount,
    weakCount,
    insufficientDataCount,
    overallAccuracy,
    avgTimeMs,
    engagementScore,
    skills: sectionSkills,
  }
}

/**
 * Get practice sequence sorted by priority
 * Priority: prerequisites first, then Easy > Medium > Hard, then by pattern
 */
export function getPracticeSequence(
  weaknesses: SkillResult[],
  skillInfoMap: Map<string, SkillInfo>
): SkillResult[] {
  // Create a copy to avoid mutating original
  const toSort = [...weaknesses]

  // Sort by:
  // 1. Difficulty (Easy first)
  // 2. Topic/Pattern (group related skills)
  // 3. Accuracy (lower accuracy = higher priority)
  toSort.sort((a, b) => {
    // Difficulty order
    const difficultyOrder: Record<SkillDifficulty, number> = {
      Easy: 0,
      Medium: 1,
      Hard: 2,
    }

    const diffA = difficultyOrder[a.difficulty]
    const diffB = difficultyOrder[b.difficulty]

    if (diffA !== diffB) return diffA - diffB

    // Same difficulty - group by topic
    if (a.topic !== b.topic) return a.topic.localeCompare(b.topic)

    // Same topic - group by pattern
    if (a.pattern !== b.pattern) return a.pattern.localeCompare(b.pattern)

    // Same pattern - lower accuracy first
    return a.accuracy - b.accuracy
  })

  // TODO: Implement prerequisite ordering when we have skill dependencies
  // This would topologically sort based on prerequisites

  return toSort
}

/**
 * Score an entire diagnostic session
 */
export function scoreDiagnostic(
  sessionId: string,
  userId: string,
  questionInputs: QuestionInput[],
  skillInfoMap: Map<string, SkillInfo>,
  sectionInfos: SectionInfo[],
  skillToSectionMap: Map<string, string> // skillId -> sectionId
): DiagnosticResult {
  // Score all questions with pattern detection
  const questionResults = scoreQuestionsWithPatterns(questionInputs)

  // Calculate overall stats
  const totalQuestions = questionResults.length
  const correctCount = questionResults.filter(q => q.isCorrect).length
  const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0
  const totalTimeMs = questionResults.reduce((sum, q) => sum + q.timeSpentMs, 0)

  // Calculate engagement score
  const engagementScore = calculateEngagementScore(
    questionResults.map(q => ({ responseQuality: q.responseQuality }))
  )
  const flaggedForReview = shouldFlagForReview(engagementScore)

  // Score each skill
  const skillIds = [...new Set(questionResults.map(q => q.skillId))]
  const skillResults: SkillResult[] = skillIds.map(skillId => {
    const skillInfo = skillInfoMap.get(skillId)
    if (!skillInfo) {
      // Fallback if skill info not found
      return scoreSkill(
        {
          skillId,
          displayName: skillId,
          topic: 'Unknown',
          pattern: 'Unknown',
          difficulty: 'Medium',
        },
        questionResults
      )
    }
    return scoreSkill(skillInfo, questionResults)
  })

  // Group skills by section
  const sectionResults: SectionResult[] = sectionInfos.map(sectionInfo => {
    const sectionSkillIds = [...skillToSectionMap.entries()]
      .filter(([_, secId]) => secId === sectionInfo.sectionId)
      .map(([skillId]) => skillId)

    const sectionSkills = skillResults.filter(s =>
      sectionSkillIds.includes(s.skillId)
    )

    return scoreSection(sectionInfo, sectionSkills)
  })

  // Generate prioritized lists
  const strengths = skillResults
    .filter(s => s.status === 'MASTERED')
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5)

  const weaknesses = skillResults
    .filter(s => s.status === 'WEAK' || s.status === 'DEVELOPING')
    .sort((a, b) => a.accuracy - b.accuracy)

  const recommended = getPracticeSequence(weaknesses, skillInfoMap)

  return {
    sessionId,
    userId,
    completedAt: new Date(),
    totalTimeMs,
    totalQuestions,
    correctCount,
    accuracy,
    engagementScore,
    flaggedForReview,
    sections: sectionResults,
    skills: skillResults,
    strengths,
    weaknesses,
    recommended,
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Format accuracy as percentage string
 */
export function formatAccuracy(accuracy: number): string {
  return `${Math.round(accuracy * 100)}%`
}

/**
 * Format time in human-readable format
 */
export function formatTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.round((ms % 60000) / 1000)
  return `${minutes}m ${seconds}s`
}

/**
 * Get status color for UI
 */
export function getStatusColor(status: SkillStatus): string {
  switch (status) {
    case 'MASTERED':
      return 'green'
    case 'DEVELOPING':
      return 'yellow'
    case 'WEAK':
      return 'red'
    case 'INSUFFICIENT_DATA':
      return 'gray'
  }
}

/**
 * Get time analysis description
 */
export function getTimeAnalysisDescription(analysis: TimeAnalysis): string {
  switch (analysis) {
    case 'FLUENT':
      return 'Quick and accurate'
    case 'SLOW':
      return 'Taking extra time but succeeding'
    case 'STRUGGLED':
      return 'Needs more practice'
    case 'RUSHED':
      return 'May be guessing'
  }
}

/**
 * Calculate estimated SAT score improvement from fixing weak skills
 * This is a rough estimate based on skill difficulty and count
 */
export function estimateScoreImprovement(weaknesses: SkillResult[]): number {
  let points = 0

  for (const skill of weaknesses) {
    // Rough point values by difficulty
    const basePoints: Record<SkillDifficulty, number> = {
      Easy: 10,
      Medium: 15,
      Hard: 20,
    }
    points += basePoints[skill.difficulty]
  }

  // Cap at realistic improvement
  return Math.min(points, 200)
}
