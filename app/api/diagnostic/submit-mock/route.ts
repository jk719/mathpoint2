import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { submitAnswerSchema } from '@/lib/validation/schemas';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';

// Mock session storage (in production this would be in database)
const sessions = new Map();

export const POST = createHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const { sessionId, response } = submitAnswerSchema.parse(body);

    // Get or create mock session
    let session = sessions.get(sessionId);
    if (!session) {
      const engine = new DiagnosticEngine({ questions: questionBank });
      session = engine.startSession('demo-user-123');
      session.id = sessionId;
      sessions.set(sessionId, session);
    }

    const engine = new DiagnosticEngine({ questions: questionBank });
    const result = await engine.processResponse(session, response);

    // Update mock session
    sessions.set(sessionId, session);

    return ApiResponse.success({
      nextQuestion: result.nextQuestion,
      diagnosis: result.diagnosis,
      isComplete: result.isComplete,
      progress: engine.getSessionProgress(session),
    });
  },
  { schema: submitAnswerSchema }
);