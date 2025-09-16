import { NextRequest } from 'next/server';
import { createHandler, ApiResponse } from '@/lib/api/createHandler';
import { startDiagnosticSchema } from '@/lib/validation/schemas';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';

export const POST = createHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const { userId } = startDiagnosticSchema.parse(body);

    // Mock user - no database needed
    const mockUser = {
      id: 'demo-user-123',
      email: userId,
      name: 'Demo User'
    };

    const engine = new DiagnosticEngine({ questions: questionBank });
    const session = engine.startSession(mockUser.id);

    // Mock session ID for demo
    const sessionId = `session_${Date.now()}_demo`;

    return ApiResponse.success({
      sessionId,
      currentQuestion: session.questionsAsked[0],
      progress: engine.getSessionProgress(session),
    });
  },
  { schema: startDiagnosticSchema }
);