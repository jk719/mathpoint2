/**
 * Response Time Model
 *
 * Tracks response times using a log-normal distribution per skill.
 * Uses Welford's online algorithm for numerically stable running
 * mean and variance in log-space.
 *
 * Key features:
 * - Difficulty-based priors for cold start
 * - Fluency classification: AUTOMATED, COMPUTED, STRUGGLING, GUESSING
 * - Generates human-readable tutor context strings
 * - Z-score based fluency scoring (0-1)
 */

import type { TimeModelState, FluencyLevel, FluencyAssessment } from '@/types/adaptive';

// Difficulty-based priors (in milliseconds)
// These serve as fallbacks when we have < 2 observations for a skill
const DIFFICULTY_PRIORS: Record<string, { meanLogTime: number; variance: number }> = {
  Easy:   { meanLogTime: Math.log(20000),  variance: 0.5 },  // ~20s
  Medium: { meanLogTime: Math.log(35000),  variance: 0.6 },  // ~35s
  Hard:   { meanLogTime: Math.log(50000),  variance: 0.7 },  // ~50s
};

// Classification thresholds
const FAST_Z_THRESHOLD = -1.0;  // z-score below this = fast

export class ResponseTimeModel {
  private states: Map<string, TimeModelState> = new Map();
  private skillDifficulty: Map<string, string> = new Map();

  /**
   * Initialize the model with skill difficulty mappings
   */
  initialize(skills: { id: string; difficulty: string }[]): void {
    for (const skill of skills) {
      this.skillDifficulty.set(skill.id, skill.difficulty);
      const prior = DIFFICULTY_PRIORS[skill.difficulty] || DIFFICULTY_PRIORS.Medium;
      this.states.set(skill.id, {
        skillId: skill.id,
        meanLogTime: prior.meanLogTime,
        m2LogTime: 0,
        sampleCount: 0,
        lastObservedTimeMs: 0,
      });
    }
  }

  /**
   * Update the time model with a new observation.
   * Uses Welford's online algorithm for numerically stable
   * running mean and variance in log-space.
   *
   * Only processes VALID responses (caller should filter).
   */
  update(skillId: string, observedTimeMs: number): void {
    const state = this.states.get(skillId);
    if (!state) return;
    if (observedTimeMs <= 0) return;

    const logTime = Math.log(observedTimeMs);
    state.sampleCount++;
    state.lastObservedTimeMs = observedTimeMs;

    const n = state.sampleCount;

    if (n === 1) {
      // First observation: blend with prior
      // Use 50/50 blend so prior doesn't get instantly overwritten
      const prior = DIFFICULTY_PRIORS[this.skillDifficulty.get(skillId) || 'Medium'];
      state.meanLogTime = (prior.meanLogTime + logTime) / 2;
      state.m2LogTime = 0;
    } else {
      // Welford's online update
      const delta = logTime - state.meanLogTime;
      state.meanLogTime += delta / n;
      const delta2 = logTime - state.meanLogTime;
      state.m2LogTime += delta * delta2;
    }
  }

  /**
   * Assess fluency for a given response.
   *
   * Classification matrix:
   *              | Correct        | Incorrect
   * Fast (z<-1) | AUTOMATED      | GUESSING
   * Normal/Slow | COMPUTED       | STRUGGLING
   */
  assessFluency(
    skillId: string,
    observedTimeMs: number,
    isCorrect: boolean
  ): FluencyAssessment {
    const state = this.states.get(skillId);
    const difficulty = this.skillDifficulty.get(skillId) || 'Medium';

    // Compute z-score
    const logTime = Math.log(Math.max(1, observedTimeMs));
    let meanLog: number;
    let stdDev: number;

    if (state && state.sampleCount >= 2) {
      // Use skill-specific statistics
      meanLog = state.meanLogTime;
      const variance = state.m2LogTime / (state.sampleCount - 1);
      stdDev = Math.sqrt(Math.max(variance, 0.01));
    } else {
      // Fall back to difficulty-level priors
      const prior = DIFFICULTY_PRIORS[difficulty] || DIFFICULTY_PRIORS.Medium;
      meanLog = prior.meanLogTime;
      stdDev = Math.sqrt(prior.variance);
    }

    const zScore = (logTime - meanLog) / Math.max(stdDev, 0.1);

    // Classify
    let fluencyLevel: FluencyLevel;
    if (isCorrect) {
      fluencyLevel = zScore < FAST_Z_THRESHOLD ? 'AUTOMATED' : 'COMPUTED';
    } else {
      fluencyLevel = zScore < FAST_Z_THRESHOLD ? 'GUESSING' : 'STRUGGLING';
    }

    // Fluency score: 0-1, higher = more fluent (only meaningful for correct)
    // Maps z-score range [-2, 2] to [1, 0]
    const fluencyScore = isCorrect
      ? Math.max(0, Math.min(1, 1 - (zScore + 2) / 4))
      : 0;

    // Generate tutor context
    const tutorContext = this.generateTutorContext(
      fluencyLevel,
      zScore,
      observedTimeMs,
      meanLog
    );

    return {
      skillId,
      fluencyLevel,
      zScore,
      fluencyScore,
      rawTimeMs: observedTimeMs,
      isCorrect,
      tutorContext,
    };
  }

  /**
   * Get the current state for a skill (for serialization or inspection)
   */
  getState(skillId: string): TimeModelState | undefined {
    return this.states.get(skillId);
  }

  /**
   * Get expected time in ms for a skill (for difficulty scoring)
   */
  getExpectedTimeMs(skillId: string): number {
    const state = this.states.get(skillId);
    if (state && state.sampleCount >= 1) {
      return Math.exp(state.meanLogTime);
    }
    const difficulty = this.skillDifficulty.get(skillId) || 'Medium';
    const prior = DIFFICULTY_PRIORS[difficulty] || DIFFICULTY_PRIORS.Medium;
    return Math.exp(prior.meanLogTime);
  }

  /**
   * Generate human-readable context for the AI tutor
   */
  private generateTutorContext(
    level: FluencyLevel,
    zScore: number,
    timeMs: number,
    meanLogTime: number
  ): string {
    const timeSec = (timeMs / 1000).toFixed(1);
    const expectedSec = (Math.exp(meanLogTime) / 1000).toFixed(1);

    switch (level) {
      case 'AUTOMATED':
        return `Student solved quickly and correctly (${timeSec}s vs ${expectedSec}s expected) — has automated this skill pattern.`;

      case 'COMPUTED':
        if (zScore > 0.5) {
          return `Student solved correctly but slowly (${timeSec}s vs ${expectedSec}s expected) — likely computing from scratch rather than recognizing the pattern. Teach the shortcut or pattern recognition approach.`;
        }
        return `Student solved correctly at expected pace (${timeSec}s).`;

      case 'STRUGGLING':
        return `Student is struggling — took ${timeSec}s (expected ${expectedSec}s) and answered incorrectly. May need the concept re-explained with a different approach.`;

      case 'GUESSING':
        return `Likely guessing — answered in ${timeSec}s (too fast) and got it wrong. Student may not understand the underlying concept.`;
    }
  }
}
