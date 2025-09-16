import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { submitAnswerSchema } from '@/lib/validation/schemas';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';
import { db } from '@/lib/database/queries';
import { POINTS } from '@/lib/utils/constants';

export const POST = createHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const { sessionId, response } = submitAnswerSchema.parse(body);

    const dbSession = await db.diagnostic.getSession(sessionId);
    if (!dbSession) {
      return ApiResponse.error('Session not found', 404);
    }

    if (dbSession.isComplete) {
      return ApiResponse.error('Session already completed', 400);
    }

    const engine = new DiagnosticEngine({ questions: questionBank });

    const session = {
      id: dbSession.id,
      userId: dbSession.userId,
      startTime: dbSession.startTime,
      endTime: dbSession.endTime,
      questionsAsked: dbSession.questionsAsked as any,
      responses: dbSession.responses as any,
      currentPath: dbSession.currentPath,
      isComplete: dbSession.isComplete,
      finalDiagnosis: dbSession.finalDiagnosis as any,
    };

    const result = await engine.processResponse(session, response);

    await db.diagnostic.updateSession(sessionId, {
      questionsAsked: session.questionsAsked,
      responses: session.responses,
      currentPath: session.currentPath,
      isComplete: result.isComplete,
      endTime: result.isComplete ? new Date() : undefined,
      finalDiagnosis: result.isComplete ? result.diagnosis as any : undefined,
    });

    if (result.isComplete) {
      await db.progress.addPoints(
        dbSession.userId,
        POINTS.DIAGNOSTIC_COMPLETE,
        'diagnostic-complete',
        'Completed diagnostic assessment'
      );

      const diagnosis = result.diagnosis as any;
      if (diagnosis.strengths) {
        for (const strength of diagnosis.strengths) {
          await db.progress.updateConceptMastery(
            dbSession.userId,
            strength.concept.id,
            {
              conceptName: strength.concept.name,
              conceptCategory: strength.concept.category,
              masteryLevel: strength.confidence,
              accuracy: strength.confidence,
            }
          );
        }
      }
    }

    return ApiResponse.success({
      nextQuestion: result.nextQuestion,
      diagnosis: result.diagnosis,
      isComplete: result.isComplete,
      progress: engine.getSessionProgress(session),
    });
  },
  { schema: submitAnswerSchema }
);