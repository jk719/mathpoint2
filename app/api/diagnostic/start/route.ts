import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { startDiagnosticSchema } from '@/lib/validation/schemas';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';
import { db } from '@/lib/database/queries';

export const POST = createHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const { userId } = startDiagnosticSchema.parse(body);

    const user = await db.user.findByEmail(userId);
    if (!user) {
      return ApiResponse.error('User not found', 404);
    }

    const engine = new DiagnosticEngine({ questions: questionBank });
    const session = engine.startSession(user.id);

    const dbSession = await db.diagnostic.createSession(
      user.id,
      session.questionsAsked[0]
    );

    await db.progress.incrementStreak(user.id);

    return ApiResponse.success({
      sessionId: dbSession.id,
      currentQuestion: session.questionsAsked[0],
      progress: engine.getSessionProgress(session),
    });
  },
  { schema: startDiagnosticSchema }
);