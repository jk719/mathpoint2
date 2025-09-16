import {
  DiagnosticSession,
  DiagnosticQuestion,
  StudentResponse,
  PartialDiagnosis,
  FinalDiagnosis,
  Branch,
  ErrorType,
  Concept,
} from '@/types';
import { ResponseAnalyzer } from './ResponseAnalyzer';
import { DecisionTree } from './DecisionTree';
import { DiagnosisGenerator } from './DiagnosisGenerator';

export interface DiagnosticEngineConfig {
  questions: DiagnosticQuestion[];
  maxQuestions?: number;
  minQuestions?: number;
}

export class DiagnosticEngine {
  private analyzer: ResponseAnalyzer;
  private decisionTree: DecisionTree;
  private diagnosisGenerator: DiagnosisGenerator;
  private questions: DiagnosticQuestion[];

  constructor(config: DiagnosticEngineConfig) {
    this.questions = config.questions;
    this.analyzer = new ResponseAnalyzer();
    this.decisionTree = new DecisionTree(config.questions);
    this.diagnosisGenerator = new DiagnosisGenerator();
  }

  startSession(userId: string): DiagnosticSession {
    const startQuestion = this.getStartQuestion();

    return {
      id: this.generateSessionId(),
      userId,
      startTime: new Date(),
      questionsAsked: [startQuestion],
      responses: [],
      currentPath: ['main'],
      isComplete: false,
    };
  }

  async processResponse(
    session: DiagnosticSession,
    response: StudentResponse
  ): Promise<{
    nextQuestion: DiagnosticQuestion | null;
    diagnosis: PartialDiagnosis | FinalDiagnosis;
    isComplete: boolean;
  }> {
    const currentQuestion = session.questionsAsked[session.questionsAsked.length - 1];

    session.responses.push(response);

    const analysis = this.analyzer.analyze(response, currentQuestion);

    const partialDiagnosis = this.updatePartialDiagnosis(
      session,
      analysis,
      currentQuestion
    );

    const nextQuestion = this.decisionTree.getNextQuestion(
      currentQuestion,
      response,
      session.questionsAsked.map(q => q.id),
      partialDiagnosis
    );

    if (nextQuestion) {
      session.questionsAsked.push(nextQuestion);
      this.updatePath(session, nextQuestion.branch);

      return {
        nextQuestion,
        diagnosis: partialDiagnosis,
        isComplete: false,
      };
    }

    session.isComplete = true;
    session.endTime = new Date();

    const finalDiagnosis = this.diagnosisGenerator.generate(session, partialDiagnosis);
    session.finalDiagnosis = finalDiagnosis;

    return {
      nextQuestion: null,
      diagnosis: finalDiagnosis,
      isComplete: true,
    };
  }

  getSessionProgress(session: DiagnosticSession): {
    questionsAnswered: number;
    estimatedRemaining: number;
    percentComplete: number;
    currentBranch: Branch;
  } {
    const answered = session.responses.length;
    const minRemaining = Math.max(0, 4 - answered);
    const maxRemaining = Math.max(0, 7 - answered);
    const estimatedRemaining = Math.round((minRemaining + maxRemaining) / 2);
    const percentComplete = Math.min(100, Math.round((answered / 6) * 100));
    const currentBranch = session.currentPath[session.currentPath.length - 1] || 'main';

    return {
      questionsAnswered: answered,
      estimatedRemaining,
      percentComplete,
      currentBranch,
    };
  }

  validateResponse(response: string, question: DiagnosticQuestion): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!response || response.trim().length === 0) {
      errors.push('Please provide an answer');
    }

    if (question.type === 'multiple-choice' && question.options) {
      if (!question.options.includes(response)) {
        errors.push('Please select a valid option');
      }
    }

    if (question.type === 'multi-select') {
      const answers = response.split(',').map(a => a.trim());
      if (answers.length === 0) {
        errors.push('Please select at least one option');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private getStartQuestion(): DiagnosticQuestion {
    // Start with a medium difficulty question from any branch
    const mediumQuestions = this.questions.filter(q => q.difficulty === 'medium');
    if (mediumQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * mediumQuestions.length);
      return mediumQuestions[randomIndex];
    }
    // Fallback to easy question if no medium questions
    const easyQuestions = this.questions.filter(q => q.difficulty === 'easy');
    if (easyQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * easyQuestions.length);
      return easyQuestions[randomIndex];
    }
    // Final fallback to first question
    if (this.questions.length === 0) {
      throw new Error('No questions found in question bank');
    }
    return this.questions[0];
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private updatePartialDiagnosis(
    session: DiagnosticSession,
    analysis: { errorTypes: ErrorType[]; isCorrect: boolean; confidence: number; },
    question: DiagnosticQuestion
  ): PartialDiagnosis {
    const diagnosis: PartialDiagnosis = {
      strengths: [],
      weaknesses: [],
      errorPatterns: analysis.errorTypes,
      confidence: analysis.confidence,
    };

    if (question.conceptsTested && question.conceptsTested.length > 0) {
      if (analysis.isCorrect) {
        diagnosis.strengths.push(...question.conceptsTested);
      } else {
        diagnosis.weaknesses.push(...question.conceptsTested);
      }
    }

    if (session.responses.length > 1) {
      this.aggregateDiagnosis(diagnosis, session);
    }

    return diagnosis;
  }

  private aggregateDiagnosis(
    diagnosis: PartialDiagnosis,
    session: DiagnosticSession
  ): void {
    const conceptScores = new Map<string, { correct: number; total: number }>();

    session.responses.forEach((response, index) => {
      const question = session.questionsAsked[index];
      if (!question) return;

      const isCorrect = this.checkCorrectness(response, question);

      if (question.conceptsTested && question.conceptsTested.length > 0) {
        question.conceptsTested.forEach(concept => {
          const score = conceptScores.get(concept.id) || { correct: 0, total: 0 };
          score.total += 1;
          if (isCorrect) score.correct += 1;
          conceptScores.set(concept.id, score);
        });
      }
    });

    diagnosis.strengths = [];
    diagnosis.weaknesses = [];

    const allConcepts = this.getAllUniqueConcepts(session.questionsAsked);

    conceptScores.forEach((score, conceptId) => {
      const concept = allConcepts.find(c => c.id === conceptId);
      if (!concept) return;

      const accuracy = score.correct / score.total;
      if (accuracy >= 0.7) {
        diagnosis.strengths.push(concept);
      } else if (accuracy <= 0.3) {
        diagnosis.weaknesses.push(concept);
      }
    });

    const totalConfidence = session.responses.reduce((sum, r, i) => {
      const q = session.questionsAsked[i];
      const analysis = this.analyzer.analyze(r, q);
      return sum + analysis.confidence;
    }, 0);
    diagnosis.confidence = totalConfidence / session.responses.length;
  }

  private checkCorrectness(response: StudentResponse, question: DiagnosticQuestion): boolean {
    if (!question.correctAnswer) return false;

    if (Array.isArray(question.correctAnswer)) {
      const userAnswers = Array.isArray(response.answer) ? response.answer : [response.answer];
      return question.correctAnswer.every(ans => userAnswers.includes(ans));
    }

    return response.answer === question.correctAnswer;
  }

  private getAllUniqueConcepts(questions: DiagnosticQuestion[]): Concept[] {
    const conceptMap = new Map();
    questions.forEach(q => {
      if (q.conceptsTested && q.conceptsTested.length > 0) {
        q.conceptsTested.forEach(c => {
          conceptMap.set(c.id, c);
        });
      }
    });
    return Array.from(conceptMap.values());
  }

  private updatePath(session: DiagnosticSession, branch: Branch): void {
    if (session.currentPath[session.currentPath.length - 1] !== branch) {
      session.currentPath.push(branch);
    }
  }
}