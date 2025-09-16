import {
  DiagnosticSession,
  FinalDiagnosis,
  PartialDiagnosis,
  Concept,
  ErrorType,
  StudentResponse,
  DiagnosticQuestion,
} from '@/types';

export class DiagnosisGenerator {
  generate(session: DiagnosticSession, diagnosis: PartialDiagnosis): FinalDiagnosis {
    const overallLevel = this.determineOverallLevel(diagnosis);
    const strengths = this.analyzeStrengths(diagnosis, session);
    const weaknesses = this.analyzeWeaknesses(diagnosis, session);
    const errorPatterns = this.analyzeErrorPatterns(diagnosis, session);
    const recommendedPath = this.generateRecommendedPath(weaknesses, errorPatterns);
    const estimatedTime = this.estimateTimeToMastery(weaknesses, overallLevel);
    const detailedSummary = this.generateDetailedSummary(
      overallLevel,
      strengths,
      weaknesses,
      errorPatterns,
      session
    );

    return {
      sessionId: session.id,
      overallLevel,
      strengths,
      weaknesses,
      errorPatterns,
      recommendedPath,
      estimatedTimeToMastery: estimatedTime,
      detailedSummary,
    };
  }

  private determineOverallLevel(
    diagnosis: PartialDiagnosis
  ): 'beginner' | 'intermediate' | 'advanced' {
    const strengthRatio = diagnosis.strengths.length /
      (diagnosis.strengths.length + diagnosis.weaknesses.length || 1);

    if (strengthRatio >= 0.8 && diagnosis.confidence > 0.85) {
      return 'advanced';
    }

    if (strengthRatio >= 0.5 || diagnosis.confidence > 0.6) {
      return 'intermediate';
    }

    return 'beginner';
  }

  private analyzeStrengths(
    diagnosis: PartialDiagnosis,
    session: DiagnosticSession
  ): FinalDiagnosis['strengths'] {
    const conceptScores = new Map<string, { concept: Concept; score: number; count: number }>();

    session.responses.forEach((response, index) => {
      const question = session.questionsAsked[index];
      if (!question) return;

      const isCorrect = this.checkCorrectness(response, question);

      if (question.conceptsTested && question.conceptsTested.length > 0) {
        question.conceptsTested.forEach(concept => {
          const existing = conceptScores.get(concept.id) || {
            concept,
            score: 0,
            count: 0,
          };

          existing.score += isCorrect ? 1 : 0;
          existing.count += 1;
          conceptScores.set(concept.id, existing);
        });
      }
    });

    return Array.from(conceptScores.values())
      .filter(item => item.score / item.count >= 0.7)
      .map(item => ({
        concept: item.concept,
        confidence: Math.min(item.score / item.count + diagnosis.confidence * 0.2, 1),
      }))
      .sort((a, b) => b.confidence - a.confidence);
  }

  private analyzeWeaknesses(
    diagnosis: PartialDiagnosis,
    session: DiagnosticSession
  ): FinalDiagnosis['weaknesses'] {
    const conceptScores = new Map<string, {
      concept: Concept;
      errors: number;
      total: number;
      suggestions: Set<string>;
    }>();

    session.responses.forEach((response, index) => {
      const question = session.questionsAsked[index];
      if (!question) return;

      const isCorrect = this.checkCorrectness(response, question);

      if (question.conceptsTested && question.conceptsTested.length > 0) {
        question.conceptsTested.forEach(concept => {
          const existing = conceptScores.get(concept.id) || {
            concept,
            errors: 0,
            total: 0,
            suggestions: new Set<string>(),
          };

          existing.errors += isCorrect ? 0 : 1;
          existing.total += 1;

          if (!isCorrect) {
            existing.suggestions.add(this.getSuggestionForConcept(concept));
          }

          conceptScores.set(concept.id, existing);
        });
      }
    });

    return Array.from(conceptScores.values())
      .filter(item => item.errors / item.total >= 0.3)
      .map(item => ({
        concept: item.concept,
        confidence: Math.min(item.errors / item.total + diagnosis.confidence * 0.1, 1),
        suggestedPractice: Array.from(item.suggestions),
      }))
      .sort((a, b) => b.confidence - a.confidence);
  }

  private analyzeErrorPatterns(
    diagnosis: PartialDiagnosis,
    session: DiagnosticSession
  ): FinalDiagnosis['errorPatterns'] {
    const errorCounts = new Map<ErrorType, { count: number; examples: string[] }>();

    diagnosis.errorPatterns.forEach(errorType => {
      const existing = errorCounts.get(errorType) || { count: 0, examples: [] };
      existing.count += 1;

      const example = this.findErrorExample(errorType, session);
      if (example && existing.examples.length < 3) {
        existing.examples.push(example);
      }

      errorCounts.set(errorType, existing);
    });

    return Array.from(errorCounts.entries())
      .map(([type, data]) => ({
        type,
        frequency: data.count / session.responses.length,
        examples: data.examples,
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  private generateRecommendedPath(
    weaknesses: FinalDiagnosis['weaknesses'],
    errorPatterns: FinalDiagnosis['errorPatterns']
  ): string {
    if (weaknesses.length === 0 && errorPatterns.length === 0) {
      return 'Continue with advanced quadratic equation topics and explore completing the square and complex roots.';
    }

    const primaryWeakness = weaknesses[0];
    const primaryError = errorPatterns[0];

    let path = 'Focus on ';

    if (primaryWeakness) {
      path += `strengthening ${primaryWeakness.concept.name} skills`;

      if (primaryWeakness.concept.category === 'factoring') {
        path += ' through factor pair exercises and FOIL practice';
      } else if (primaryWeakness.concept.category === 'quadratic-formula') {
        path += ' by practicing coefficient identification and discriminant calculations';
      } else if (primaryWeakness.concept.category === 'arithmetic') {
        path += ' with integer operations and sign rule exercises';
      }
    }

    if (primaryError && primaryError.frequency > 0.3) {
      path += `. Pay special attention to ${this.getErrorDescription(primaryError.type)}`;
    }

    path += '. Start with guided practice problems, then progress to independent solving.';

    return path;
  }

  private estimateTimeToMastery(
    weaknesses: FinalDiagnosis['weaknesses'],
    level: string
  ): number {
    const baseTime = { beginner: 20, intermediate: 12, advanced: 5 }[level] || 15;
    const weaknessMultiplier = 1 + weaknesses.length * 0.3;
    const avgConfidence = weaknesses.reduce((sum, w) => sum + w.confidence, 0) /
      (weaknesses.length || 1);
    const confidenceMultiplier = 1 + avgConfidence * 0.5;

    return Math.round(baseTime * weaknessMultiplier * confidenceMultiplier);
  }

  private generateDetailedSummary(
    level: string,
    strengths: FinalDiagnosis['strengths'],
    weaknesses: FinalDiagnosis['weaknesses'],
    errorPatterns: FinalDiagnosis['errorPatterns'],
    session: DiagnosticSession
  ): string {
    let summary = `Based on ${session.questionsAsked.length} diagnostic questions, `;
    summary += `the student demonstrates ${level} level understanding of quadratic equations. `;

    if (strengths.length > 0) {
      summary += `Strong areas include ${strengths.slice(0, 2).map(s => s.concept.name).join(' and ')}`;
      if (strengths[0].confidence > 0.9) {
        summary += ' with high confidence';
      }
      summary += '. ';
    }

    if (weaknesses.length > 0) {
      summary += `Areas needing improvement: ${weaknesses.slice(0, 2).map(w => w.concept.name).join(' and ')}. `;
    }

    if (errorPatterns.length > 0 && errorPatterns[0].frequency > 0.3) {
      summary += `Recurring pattern: ${this.getErrorDescription(errorPatterns[0].type)}. `;
    }

    const avgTime = session.responses.reduce((sum, r) => sum + r.timeSpent, 0) /
      session.responses.length;
    if (avgTime > 180) {
      summary += 'The student takes time to think through problems carefully. ';
    } else if (avgTime < 60) {
      summary += 'Quick response times suggest either strong confidence or rushing. ';
    }

    if (level === 'advanced') {
      summary += 'Ready for more challenging topics and applications.';
    } else if (level === 'beginner') {
      summary += 'Recommend starting with foundational concept review and guided practice.';
    } else {
      summary += 'Continue with targeted practice to solidify understanding.';
    }

    return summary;
  }

  private checkCorrectness(response: StudentResponse, question: DiagnosticQuestion): boolean {
    if (!question.correctAnswer) return false;

    if (Array.isArray(question.correctAnswer)) {
      const userAnswers = Array.isArray(response.answer) ? response.answer : [response.answer];
      return question.correctAnswer.every(ans => userAnswers.includes(ans));
    }

    return response.answer === question.correctAnswer;
  }

  private getSuggestionForConcept(concept: Concept): string {
    const suggestions: Record<string, string> = {
      factoring: 'Practice finding factor pairs of integers',
      'quadratic-formula': 'Review the quadratic formula and practice identifying coefficients',
      verification: 'Practice substituting solutions back into original equations',
      arithmetic: 'Strengthen integer operations and sign rules',
      'algebra-basics': 'Review algebraic properties and equation solving steps',
    };

    return suggestions[concept.category] || 'Practice problems focusing on this concept';
  }

  private getErrorDescription(errorType: ErrorType): string {
    const descriptions: Record<ErrorType, string> = {
      'sign-error': 'confusion with positive and negative signs',
      'arithmetic-error': 'calculation mistakes',
      'factor-pair-error': 'difficulty finding correct factor pairs',
      'foil-error': 'FOIL method application errors',
      'formula-application': 'quadratic formula application mistakes',
      'coefficient-identification': 'incorrectly identifying a, b, or c values',
      'discriminant-calculation': 'errors in calculating b² - 4ac',
      'zero-product-property': 'misunderstanding the zero product property',
      'substitution-error': 'mistakes when substituting values',
    };

    return descriptions[errorType] || 'calculation errors';
  }

  private findErrorExample(errorType: ErrorType, session: DiagnosticSession): string {
    const exampleMap: Record<ErrorType, string> = {
      'sign-error': 'Confused -3 with 3 when finding factors',
      'factor-pair-error': 'Listed (2, 5) instead of (-5, 2) as factors of -10',
      'arithmetic-error': 'Calculated 9 + 40 as 39',
      'foil-error': 'Expanded (x - 5)(x + 2) incorrectly',
      'coefficient-identification': 'Identified a = x² instead of a = 1',
      'discriminant-calculation': 'Calculated discriminant as 9 - 40 instead of 9 + 40',
      'zero-product-property': 'Only found one solution when two exist',
      'substitution-error': 'Did not verify solution by substitution',
      'formula-application': 'Used incorrect form of quadratic formula',
    };

    return exampleMap[errorType] || `Error in question ${session.questionsAsked[0]?.id}`;
  }
}