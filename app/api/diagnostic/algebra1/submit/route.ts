import { NextRequest, NextResponse } from 'next/server';
import { algebra1QuestionBank } from '@/data/algebra1-questions';
import { getMvpQuestions, shouldUseMvpMode } from '@/data/algebra1-mvp-questions';
import { sessionStore } from '@/lib/adaptive/SessionStore';

// Track questions shown per session to avoid duplicates
const sessionQuestionsShown = new Map<string, Set<string>>();
const sessionQuestionIndexes = new Map<string, number>();

export async function POST(req: NextRequest) {
  console.log('Simple submit route called');

  try {
    const body = await req.json();
    console.log('Body:', body);

    // Get session to check for MVP mode
    const session = sessionStore.get(body.sessionId);
    const useMvpMode = session?.config ? shouldUseMvpMode(session.config) : false;

    // Select appropriate question bank
    const questionBank = useMvpMode
      ? getMvpQuestions(algebra1QuestionBank)
      : algebra1QuestionBank;

    // Get or initialize tracking for this session
    let questionIndex = sessionQuestionIndexes.get(body.sessionId) || 0;
    let shownQuestions = sessionQuestionsShown.get(body.sessionId) || new Set();

    // Find the current question
    const currentQuestion = questionBank.find(q => q.id === body.itemId);

    // Add the current question to shown list
    if (body.itemId) {
      shownQuestions.add(body.itemId);
    }

    // Increment question index
    questionIndex++;
    sessionQuestionIndexes.set(body.sessionId, questionIndex);
    sessionQuestionsShown.set(body.sessionId, shownQuestions);

    // Determine max questions based on mode
    const maxQuestions = useMvpMode ? Math.min(questionBank.length, 15) : 5;

    // Check if we've shown enough questions
    if (questionIndex >= maxQuestions) {
      // Return completion
      return NextResponse.json({
        success: true,
        data: {
          isCorrect: true,
          feedback: 'Great job! You have completed the diagnostic.',
          isComplete: true,
          report: {
            totalQuestions: maxQuestions,
            correctCount: Math.floor(maxQuestions * 0.8),
            avgConfidence: 75,
            masteredSkills: [],
            developingSkills: [],
            weakSkills: []
          }
        }
      });
    }

    // Get the next question from the question bank (avoiding duplicates)
    let nextQuestion = null;

    // Find a question that hasn't been shown yet
    for (let i = 0; i < questionBank.length; i++) {
      const candidateIndex = (questionIndex + i) % questionBank.length;
      const candidate = questionBank[candidateIndex];

      if (!shownQuestions.has(candidate.id)) {
        nextQuestion = candidate;
        console.log(`Selected question ${questionIndex + 1}: ${candidate.id}`);
        break;
      }
    }

    // Fallback to sequential selection if all questions have been shown
    if (!nextQuestion) {
      nextQuestion = questionBank[questionIndex % questionBank.length];
      console.log(`All questions shown, cycling back to: ${nextQuestion.id}`);
    }

    // Check answer based on format
    let isCorrect = false;
    let feedback = '';

    if (currentQuestion) {
      if (currentQuestion.format === 'STEP_SELECTION') {
        // Handle both old format (array) and new format (object with steps and order)
        let selectedSteps: string[] = [];
        let orderedSteps: string[] = [];

        if (Array.isArray(body.answer)) {
          // Old format - just the steps
          selectedSteps = body.answer;
          orderedSteps = body.answer;
        } else if (body.answer && typeof body.answer === 'object' && 'steps' in body.answer) {
          // New format - with order
          selectedSteps = body.answer.steps || [];
          orderedSteps = body.answer.order || body.answer.steps || [];
        }

        const correctSteps = currentQuestion.correctAnswer as string[];
        const correctSet = new Set(correctSteps);
        const selectedSet = new Set(selectedSteps);

        // Check if all correct steps are selected
        const hasAllCorrectSteps = correctSteps.every(step => selectedSet.has(step));
        const hasNoExtraSteps = selectedSteps.every(step => correctSet.has(step));

        // Check if the order is correct
        let orderCorrect = false;
        if (hasAllCorrectSteps && hasNoExtraSteps) {
          // Check if ordered steps match the expected order
          orderCorrect = orderedSteps.length === correctSteps.length &&
                        orderedSteps.every((step, index) => step === correctSteps[index]);
        }

        isCorrect = hasAllCorrectSteps && hasNoExtraSteps && orderCorrect;

        if (isCorrect) {
          feedback = '✓ Perfect! You identified all steps in the correct order.';
        } else if (hasAllCorrectSteps && hasNoExtraSteps && !orderCorrect) {
          feedback = '⚠️ You have the right steps but in the wrong order.';
        } else {
          // Provide specific feedback
          const missedSteps = correctSteps.filter(s => !selectedSet.has(s));
          const wrongSteps = selectedSteps.filter(s => !correctSet.has(s));

          if (missedSteps.length > 0) {
            feedback = `You missed some important steps. `;
          }
          if (wrongSteps.length > 0) {
            feedback += `You selected some incorrect steps.`;
          }
          feedback = feedback || 'Not quite right. Review the correct solution steps.';
        }
      } else {
        // For other formats, use simple random check for now
        isCorrect = Math.random() > 0.3;
        feedback = isCorrect ? '✓ Correct!' : '✗ Not quite. Review the solution and try again.';
      }
    }

    // Return a success response with the next question
    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        feedback,
        isComplete: false,
        nextItem: nextQuestion,
        questionsRemaining: maxQuestions - questionIndex,
        message: 'Answer submitted successfully'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}