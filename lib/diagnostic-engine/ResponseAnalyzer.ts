import { StudentResponse, ErrorType, ResponseCondition, DiagnosticQuestion } from '@/types';

export interface AnalysisResult {
  isCorrect: boolean;
  isPartiallyCorrect: boolean;
  errorTypes: ErrorType[];
  confidence: number;
  timeAnalysis: 'too-fast' | 'normal' | 'slow';
  attemptPattern: 'first-try' | 'multiple-attempts' | 'gave-up';
}

export class ResponseAnalyzer {
  private readonly avgTimePerQuestion = 120;
  private readonly fastThreshold = 30;
  private readonly slowThreshold = 300;

  analyze(
    response: StudentResponse,
    question: DiagnosticQuestion
  ): AnalysisResult {
    const isCorrect = this.checkCorrectness(response, question);
    const errorTypes = this.identifyErrors(response, question);
    const timeAnalysis = this.analyzeTime(response.timeSpent);
    const attemptPattern = this.analyzeAttempts(response.attemptNumber);
    const confidence = this.calculateConfidence(
      isCorrect,
      errorTypes,
      timeAnalysis,
      attemptPattern,
      response.confidence
    );

    return {
      isCorrect,
      isPartiallyCorrect: this.checkPartialCorrectness(response, question),
      errorTypes,
      confidence,
      timeAnalysis,
      attemptPattern,
    };
  }

  private checkCorrectness(
    response: StudentResponse,
    question: DiagnosticQuestion
  ): boolean {
    if (!question.correctAnswer) return false;

    if (Array.isArray(question.correctAnswer)) {
      const userAnswers = Array.isArray(response.answer)
        ? response.answer
        : [response.answer];
      return question.correctAnswer.every(ans =>
        userAnswers.includes(ans)
      );
    }

    return response.answer === question.correctAnswer;
  }

  private checkPartialCorrectness(
    response: StudentResponse,
    question: DiagnosticQuestion
  ): boolean {
    if (!question.correctAnswer || this.checkCorrectness(response, question)) {
      return false;
    }

    if (question.id === 'q1' && response.answer.includes('5') && response.answer.includes('-2')) {
      return true;
    }

    if (Array.isArray(question.correctAnswer) && Array.isArray(response.answer)) {
      const correctSet = new Set(question.correctAnswer);
      const responseSet = new Set(response.answer);
      const intersection = new Set([...correctSet].filter(x => responseSet.has(x)));
      return intersection.size > 0 && intersection.size < correctSet.size;
    }

    return false;
  }

  private identifyErrors(
    response: StudentResponse,
    question: DiagnosticQuestion
  ): ErrorType[] {
    const errors: ErrorType[] = [];
    const answer = response.answer.toString().toLowerCase();

    if (question.branch === 'A') {
      if (answer.includes('-') && !this.checkCorrectness(response, question)) {
        errors.push('sign-error');
      }
      if (this.detectFactorPairError(answer, question)) {
        errors.push('factor-pair-error');
      }
      if (this.detectFOILError(answer, question)) {
        errors.push('foil-error');
      }
    }

    if (question.branch === 'B') {
      if (this.detectCoefficientError(answer, question)) {
        errors.push('coefficient-identification');
      }
      if (this.detectDiscriminantError(answer, question)) {
        errors.push('discriminant-calculation');
      }
      if (answer.includes('formula') && !this.checkCorrectness(response, question)) {
        errors.push('formula-application');
      }
    }

    if (question.branch === 'C') {
      if (this.detectZeroProductError(answer, question)) {
        errors.push('zero-product-property');
      }
      if (this.detectSubstitutionError(answer, question)) {
        errors.push('substitution-error');
      }
    }

    if (this.detectArithmeticError(answer, question)) {
      errors.push('arithmetic-error');
    }

    return errors;
  }

  private detectFactorPairError(answer: string, question: DiagnosticQuestion): boolean {
    if (!question.content.includes('multiply') && !question.content.includes('factor')) {
      return false;
    }

    const factorPairRegex = /(-?\d+)\s*(?:and|,)\s*(-?\d+)/;
    const match = answer.match(factorPairRegex);

    if (match) {
      const [_, num1, num2] = match;
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);

      if (question.content.includes('-10')) {
        return n1 * n2 !== -10;
      }
      if (question.content.includes('-3')) {
        return n1 + n2 !== -3;
      }
    }

    return false;
  }

  private detectFOILError(answer: string, question: DiagnosticQuestion): boolean {
    return question.content.toLowerCase().includes('foil') &&
           !this.checkCorrectness({ ...question, answer } as StudentResponse, question);
  }

  private detectCoefficientError(answer: string, question: DiagnosticQuestion): boolean {
    if (!question.content.includes('identify') || !question.content.includes('coefficient')) {
      return false;
    }

    const coefficientRegex = /a\s*=\s*(-?\d+)/;
    const match = answer.match(coefficientRegex);

    return match && match[1] !== '1';
  }

  private detectDiscriminantError(answer: string, question: DiagnosticQuestion): boolean {
    if (!question.content.toLowerCase().includes('discriminant')) {
      return false;
    }

    const discriminantRegex = /b²\s*-\s*4ac\s*=\s*(-?\d+)/;
    const match = answer.match(discriminantRegex);

    if (match && question.content.includes('x² - 3x - 10')) {
      const expectedDiscriminant = 9 + 40;
      return parseInt(match[1]) !== expectedDiscriminant;
    }

    return false;
  }

  private detectZeroProductError(answer: string, question: DiagnosticQuestion): boolean {
    return question.content.toLowerCase().includes('zero product') &&
           answer.split(',').length < 2;
  }

  private detectSubstitutionError(answer: string, question: DiagnosticQuestion): boolean {
    return question.content.toLowerCase().includes('substitute') &&
           !answer.includes('0');
  }

  private detectArithmeticError(answer: string, question: DiagnosticQuestion): boolean {
    const arithmeticRegex = /\d+\s*[+\-*/]\s*\d+\s*=\s*(\d+)/g;
    const matches = [...answer.matchAll(arithmeticRegex)];

    for (const match of matches) {
      const expression = match[0].split('=')[0];
      const givenResult = parseInt(match[1]);

      try {
        const actualResult = eval(expression);
        if (actualResult !== givenResult) {
          return true;
        }
      } catch {
        continue;
      }
    }

    return false;
  }

  private analyzeTime(timeSpent: number): 'too-fast' | 'normal' | 'slow' {
    if (timeSpent < this.fastThreshold) return 'too-fast';
    if (timeSpent > this.slowThreshold) return 'slow';
    return 'normal';
  }

  private analyzeAttempts(attemptNumber: number): 'first-try' | 'multiple-attempts' | 'gave-up' {
    if (attemptNumber === 1) return 'first-try';
    if (attemptNumber > 3) return 'gave-up';
    return 'multiple-attempts';
  }

  private calculateConfidence(
    isCorrect: boolean,
    errorTypes: ErrorType[],
    timeAnalysis: string,
    attemptPattern: string,
    userConfidence?: number
  ): number {
    let confidence = 0.5;

    if (isCorrect) {
      confidence = 0.8;
      if (timeAnalysis === 'normal' && attemptPattern === 'first-try') {
        confidence = 0.95;
      }
    } else {
      confidence = 0.3;
      if (errorTypes.length === 1) {
        confidence = 0.4;
      }
      if (attemptPattern === 'gave-up') {
        confidence = 0.2;
      }
    }

    if (userConfidence !== undefined) {
      confidence = confidence * 0.7 + (userConfidence / 100) * 0.3;
    }

    return Math.min(Math.max(confidence, 0), 1);
  }

  matchesCondition(
    analysis: AnalysisResult,
    condition: ResponseCondition
  ): boolean {
    switch (condition.type) {
      case 'correct':
        return analysis.isCorrect;
      case 'incorrect':
        return !analysis.isCorrect && !analysis.isPartiallyCorrect;
      case 'partial':
        return analysis.isPartiallyCorrect;
      case 'no-attempt':
        return analysis.attemptPattern === 'gave-up';
      case 'specific-error':
        return condition.errorType ?
          analysis.errorTypes.includes(condition.errorType) :
          false;
      default:
        return false;
    }
  }
}