import {
  DiagnosticQuestion,
  StudentResponse,
  Branch,
  BranchingRule,
  PartialDiagnosis,
  Concept,
  ErrorType,
} from '@/types';
import { ResponseAnalyzer, AnalysisResult } from './ResponseAnalyzer';

export class DecisionTree {
  private analyzer: ResponseAnalyzer;
  private questionBank: Map<string, DiagnosticQuestion>;
  private maxQuestions: number = 7;
  private minQuestions: number = 4;

  constructor(questions: DiagnosticQuestion[]) {
    this.analyzer = new ResponseAnalyzer();
    this.questionBank = new Map(questions.map(q => [q.id, q]));
  }

  getNextQuestion(
    currentQuestion: DiagnosticQuestion,
    response: StudentResponse,
    questionsAsked: string[],
    currentDiagnosis: PartialDiagnosis
  ): DiagnosticQuestion | null {
    if (questionsAsked.length >= this.maxQuestions) {
      return null;
    }

    if (questionsAsked.length >= this.minQuestions && this.canTerminateEarly(currentDiagnosis)) {
      return null;
    }

    const analysis = this.analyzer.analyze(response, currentQuestion);

    // Check if current question has branching rules
    const matchingRule = currentQuestion.nextQuestionRules?.find(rule =>
      this.analyzer.matchesCondition(analysis, rule.condition)
    );

    if (matchingRule?.diagnosis) {
      this.updateDiagnosis(currentDiagnosis, matchingRule.diagnosis);
    }

    if (!matchingRule?.nextQuestionId) {
      return this.selectAdaptiveQuestion(analysis, questionsAsked, currentDiagnosis);
    }

    const nextQuestion = this.questionBank.get(matchingRule.nextQuestionId);

    if (!nextQuestion || questionsAsked.includes(nextQuestion.id)) {
      return this.selectAdaptiveQuestion(analysis, questionsAsked, currentDiagnosis);
    }

    return nextQuestion;
  }

  private canTerminateEarly(diagnosis: PartialDiagnosis): boolean {
    const hasHighConfidenceStrengths = diagnosis.strengths.length >= 2 &&
      diagnosis.confidence > 0.85;

    const hasClearWeaknesses = diagnosis.weaknesses.length >= 2 &&
      diagnosis.errorPatterns.length >= 1 &&
      diagnosis.confidence > 0.8;

    const hasMastery = diagnosis.strengths.length >= 3 &&
      diagnosis.weaknesses.length === 0 &&
      diagnosis.confidence > 0.9;

    return hasHighConfidenceStrengths || hasClearWeaknesses || hasMastery;
  }

  private selectAdaptiveQuestion(
    analysis: AnalysisResult,
    questionsAsked: string[],
    diagnosis: PartialDiagnosis
  ): DiagnosticQuestion | null {
    const availableQuestions = Array.from(this.questionBank.values())
      .filter(q => !questionsAsked.includes(q.id));

    if (availableQuestions.length === 0) {
      return null;
    }

    const scoredQuestions = availableQuestions.map(question => ({
      question,
      score: this.calculateQuestionScore(question, analysis, diagnosis),
    }));

    scoredQuestions.sort((a, b) => b.score - a.score);

    return scoredQuestions[0]?.question || null;
  }

  private calculateQuestionScore(
    question: DiagnosticQuestion,
    previousAnalysis: AnalysisResult,
    diagnosis: PartialDiagnosis
  ): number {
    let score = 0;

    const targetsBranch = this.getTargetBranch(previousAnalysis, diagnosis);
    if (question.branch === targetsBranch) {
      score += 30;
    }

    // Only check concepts if they exist on the question
    if (question.conceptsTested) {
      const weakConcepts = new Set(diagnosis.weaknesses.map(c => c.id));
      const questionConcepts = new Set(question.conceptsTested.map(c => c.id));
      const intersection = new Set([...weakConcepts].filter(x => questionConcepts.has(x)));
      score += intersection.size * 15;
    }

    // Check if question targets identified errors
    if (question.conceptsTested) {
      const targetsErrors = previousAnalysis.errorTypes.some(error =>
        question.conceptsTested!.some(concept =>
          this.errorRelatedToConcept(error, concept)
        )
      );
      if (targetsErrors) {
        score += 20;
      }
    }

    const difficultyScore = this.getDifficultyScore(
      question.difficulty,
      previousAnalysis,
      diagnosis
    );
    score += difficultyScore;

    if (question.conceptsTested && question.conceptsTested.length > 0) {
      const conceptOverlap = question.conceptsTested.filter(c =>
        diagnosis.strengths.some(s => s.id === c.id) ||
        diagnosis.weaknesses.some(w => w.id === c.id)
      ).length;
      score -= conceptOverlap * 5;
    }

    return score;
  }

  private getTargetBranch(
    analysis: AnalysisResult,
    diagnosis: PartialDiagnosis
  ): Branch {
    if (analysis.errorTypes.includes('factor-pair-error') ||
        analysis.errorTypes.includes('foil-error')) {
      return 'A';
    }

    if (analysis.errorTypes.includes('coefficient-identification') ||
        analysis.errorTypes.includes('discriminant-calculation') ||
        analysis.errorTypes.includes('formula-application')) {
      return 'B';
    }

    if (analysis.errorTypes.includes('zero-product-property') ||
        analysis.errorTypes.includes('substitution-error')) {
      return 'C';
    }

    if (analysis.attemptPattern === 'gave-up' ||
        diagnosis.confidence < 0.3) {
      return 'D';
    }

    return 'main';
  }

  private errorRelatedToConcept(error: ErrorType, concept: Concept): boolean {
    const errorConceptMap: Record<ErrorType, string[]> = {
      'sign-error': ['arithmetic', 'factoring'],
      'arithmetic-error': ['arithmetic'],
      'factor-pair-error': ['factoring'],
      'foil-error': ['factoring', 'algebra-basics'],
      'formula-application': ['quadratic-formula'],
      'coefficient-identification': ['quadratic-formula', 'algebra-basics'],
      'discriminant-calculation': ['quadratic-formula', 'arithmetic'],
      'zero-product-property': ['algebra-basics', 'factoring'],
      'substitution-error': ['verification', 'algebra-basics'],
    };

    const relatedCategories = errorConceptMap[error] || [];
    return relatedCategories.includes(concept.category);
  }

  private getDifficultyScore(
    difficulty: string,
    analysis: AnalysisResult,
    diagnosis: PartialDiagnosis
  ): number {
    const baseScore = { easy: 5, medium: 10, hard: 5 }[difficulty] || 0;

    if (analysis.isCorrect && analysis.timeAnalysis === 'too-fast') {
      return difficulty === 'hard' ? 15 : 0;
    }

    if (!analysis.isCorrect && analysis.attemptPattern === 'gave-up') {
      return difficulty === 'easy' ? 15 : 0;
    }

    return baseScore;
  }

  private updateDiagnosis(
    current: PartialDiagnosis,
    update: PartialDiagnosis
  ): void {
    const strengthMap = new Map(current.strengths.map(s => [s.id, s]));
    update.strengths.forEach(s => strengthMap.set(s.id, s));
    current.strengths = Array.from(strengthMap.values());

    const weaknessMap = new Map(current.weaknesses.map(w => [w.id, w]));
    update.weaknesses.forEach(w => weaknessMap.set(w.id, w));
    current.weaknesses = Array.from(weaknessMap.values());

    const errorSet = new Set([...current.errorPatterns, ...update.errorPatterns]);
    current.errorPatterns = Array.from(errorSet);

    current.confidence = (current.confidence + update.confidence) / 2;
  }
}