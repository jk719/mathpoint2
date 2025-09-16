import { NextRequest, NextResponse } from 'next/server';
import { startDiagnosticSchema } from '@/lib/validation/schemas';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = startDiagnosticSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: validation.error.issues },
        { status: 400 }
      );
    }

    const { userId } = validation.data;

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

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        currentQuestion: session.questionsAsked[0],
        progress: engine.getSessionProgress(session),
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}