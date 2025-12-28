// Response Quality Checker
// Detects guessing, spam patterns, and low engagement in diagnostic responses

export type ResponseQuality =
  | 'VALID'          // Normal response, trust it
  | 'RUSHED'         // Response < 5000ms (can't read the question)
  | 'GUESSING'       // Response < minReasonableTimeMs (too fast to solve)
  | 'SPAM_PATTERN'   // Part of 4+ consecutive same-answer streak
  | 'LOW_ENGAGEMENT' // Part of 5+ fast wrong answers in a row

export type TimeFlag = 'NORMAL' | 'SLOW' | 'RUSHED'

// Thresholds
const RUSHED_THRESHOLD_MS = 5000 // Can't even read the question in < 5 seconds
const FAST_WRONG_THRESHOLD_MS = 10000 // "Fast" for low engagement detection
const SPAM_STREAK_LENGTH = 4 // 4+ same answers in a row = spam
const LOW_ENGAGEMENT_STREAK = 5 // 5+ fast wrong answers = disengaged

export interface ResponseForQualityCheck {
  timeSpentMs: number
  selectedAnswer: string
  isCorrect: boolean
  minReasonableTimeMs?: number
  expectedTimeMs?: number
}

/**
 * Check if response was too fast to even read the question
 */
export function checkRushed(timeSpentMs: number): boolean {
  return timeSpentMs < RUSHED_THRESHOLD_MS
}

/**
 * Check if response was too fast to legitimately solve
 */
export function checkGuessing(timeSpentMs: number, minReasonableTimeMs: number): boolean {
  return timeSpentMs < minReasonableTimeMs
}

/**
 * Find responses that are part of 4+ consecutive same-answer streaks
 * Returns indices of all responses in spam patterns
 */
export function checkSpamPattern(responses: { selectedAnswer: string }[]): number[] {
  const spamIndices: number[] = []

  if (responses.length < SPAM_STREAK_LENGTH) return spamIndices

  let streakStart = 0
  let streakLength = 1

  for (let i = 1; i <= responses.length; i++) {
    const current = responses[i]?.selectedAnswer
    const previous = responses[i - 1]?.selectedAnswer

    if (current === previous && i < responses.length) {
      streakLength++
    } else {
      // Streak ended - check if it was long enough
      if (streakLength >= SPAM_STREAK_LENGTH) {
        for (let j = streakStart; j < streakStart + streakLength; j++) {
          spamIndices.push(j)
        }
      }
      streakStart = i
      streakLength = 1
    }
  }

  return spamIndices
}

/**
 * Find responses that are part of 5+ fast-wrong streaks
 * Returns indices of all responses in low engagement patterns
 */
export function checkLowEngagement(
  responses: { timeSpentMs: number; isCorrect: boolean }[]
): number[] {
  const lowEngagementIndices: number[] = []

  if (responses.length < LOW_ENGAGEMENT_STREAK) return lowEngagementIndices

  let streakStart = 0
  let streakLength = 0

  for (let i = 0; i <= responses.length; i++) {
    const response = responses[i]
    const isFastWrong = response &&
      response.timeSpentMs < FAST_WRONG_THRESHOLD_MS &&
      !response.isCorrect

    if (isFastWrong) {
      if (streakLength === 0) streakStart = i
      streakLength++
    } else {
      // Streak ended - check if it was long enough
      if (streakLength >= LOW_ENGAGEMENT_STREAK) {
        for (let j = streakStart; j < streakStart + streakLength; j++) {
          lowEngagementIndices.push(j)
        }
      }
      streakLength = 0
    }
  }

  return lowEngagementIndices
}

/**
 * Calculate engagement score as ratio of VALID responses
 */
export function calculateEngagementScore(
  responses: { responseQuality: ResponseQuality }[]
): number {
  if (responses.length === 0) return 1

  const validCount = responses.filter(r => r.responseQuality === 'VALID').length
  return validCount / responses.length
}

/**
 * Determine TimeFlag based on response time vs expected time
 */
export function calculateTimeFlag(
  timeSpentMs: number,
  expectedTimeMs: number
): TimeFlag {
  if (timeSpentMs < expectedTimeMs * 0.5) {
    return 'RUSHED'
  } else if (timeSpentMs > expectedTimeMs * 2) {
    return 'SLOW'
  }
  return 'NORMAL'
}

/**
 * Determine overall ResponseQuality for a single response
 * Priority: RUSHED > GUESSING > VALID (spam/low engagement checked separately)
 */
export function determineResponseQuality(
  timeSpentMs: number,
  minReasonableTimeMs: number
): ResponseQuality {
  // Can't even read the question
  if (checkRushed(timeSpentMs)) {
    return 'RUSHED'
  }

  // Too fast to legitimately solve
  if (checkGuessing(timeSpentMs, minReasonableTimeMs)) {
    return 'GUESSING'
  }

  return 'VALID'
}

/**
 * Process all responses and mark spam/low engagement patterns
 * Call this after individual quality checks to overlay pattern detection
 */
export function markPatternResponses(
  responses: ResponseForQualityCheck[]
): ResponseQuality[] {
  // Start with individual quality assessments
  const qualities: ResponseQuality[] = responses.map(r =>
    determineResponseQuality(r.timeSpentMs, r.minReasonableTimeMs || 8000)
  )

  // Find spam patterns
  const spamIndices = checkSpamPattern(responses)
  for (const idx of spamIndices) {
    // Only upgrade to SPAM_PATTERN if currently VALID
    // (RUSHED/GUESSING are more severe)
    if (qualities[idx] === 'VALID') {
      qualities[idx] = 'SPAM_PATTERN'
    }
  }

  // Find low engagement patterns
  const lowEngagementIndices = checkLowEngagement(responses)
  for (const idx of lowEngagementIndices) {
    // Only upgrade to LOW_ENGAGEMENT if currently VALID
    if (qualities[idx] === 'VALID') {
      qualities[idx] = 'LOW_ENGAGEMENT'
    }
  }

  return qualities
}

/**
 * Check if we should flag a diagnostic for review
 */
export function shouldFlagForReview(engagementScore: number): boolean {
  return engagementScore < 0.7
}

/**
 * Get human-readable description of response quality
 */
export function getQualityDescription(quality: ResponseQuality): string {
  switch (quality) {
    case 'VALID':
      return 'Valid response'
    case 'RUSHED':
      return 'Answered too quickly to read the question'
    case 'GUESSING':
      return 'Answered faster than minimum solve time'
    case 'SPAM_PATTERN':
      return 'Part of repeated same-answer pattern'
    case 'LOW_ENGAGEMENT':
      return 'Part of fast incorrect answer streak'
  }
}
