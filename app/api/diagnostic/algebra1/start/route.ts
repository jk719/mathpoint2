import { NextRequest, NextResponse } from 'next/server';
import { BayesianKT, SkillMastery } from '@/lib/adaptive/BayesianKT';
import { ItemSelector } from '@/lib/adaptive/ItemSelector';
import { algebra1Skills } from '@/data/algebra1-skills';
import { algebra1QuestionBank } from '@/data/algebra1-questions';
import { getMvpQuestions, shouldUseMvpMode } from '@/data/algebra1-mvp-questions';
import {
  StartDiagnosticRequest,
  StartDiagnosticResponse,
  AdaptiveDiagnosticSession,
  SessionConfig
} from '@/types/algebra1-diagnostic';
import { sessionStore } from '@/lib/adaptive/SessionStore';

export async function POST(req: NextRequest) {
  try {
    const body: StartDiagnosticRequest = await req.json();
    const { studentId, config = {}, resumeSessionId } = body;

    // Check if resuming session
    if (resumeSessionId) {
      const existingSession = sessionStore.get(resumeSessionId);
      if (existingSession && existingSession.status === 'PAUSED') {
        existingSession.status = 'ACTIVE';

        const currentItem = existingSession.itemsPresented[existingSession.currentItemIndex];

        return NextResponse.json({
          success: true,
          data: {
            sessionId: resumeSessionId,
            firstItem: currentItem,
            estimatedDuration: 20,
            totalSkillsToTest: existingSession.masteryStates.size
          } as StartDiagnosticResponse
        });
      }
    }

    // Create new session
    const sessionId = `alg1_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Check if MVP mode is requested
    const useMvpMode = shouldUseMvpMode(config);

    // Initialize session configuration
    const sessionConfig: SessionConfig = {
      maxItems: config.maxItems || (useMvpMode ? 15 : 10),
      minItems: config.minItems || (useMvpMode ? 10 : 8),
      targetDomains: config.targetDomains || [],
      adaptiveMode: config.adaptiveMode !== false,
      allowHints: config.allowHints !== false,
      timeLimit: config.timeLimit,
      mvp: config.mvp || false,
      demo: config.demo || false
    };

    // Initialize Bayesian Knowledge Tracing
    const bkt = new BayesianKT();
    const masteryStates = new Map<string, SkillMastery>();

    // Initialize mastery for target skills or all skills
    const targetSkills = sessionConfig.targetDomains && sessionConfig.targetDomains.length > 0
      ? algebra1Skills.filter(s => sessionConfig.targetDomains!.includes(s.domain))
      : algebra1Skills.slice(0, 30); // Start with subset for efficiency

    for (const skill of targetSkills) {
      masteryStates.set(skill.code, bkt.initializeSkillMastery(skill.code));
    }

    // Select appropriate question bank (MVP or full)
    const questionBank = useMvpMode
      ? getMvpQuestions(algebra1QuestionBank)
      : algebra1QuestionBank;

    // Select first item using adaptive algorithm
    const itemSelector = new ItemSelector(bkt);

    // Convert questions to ItemCandidate format
    const candidates = questionBank.map(q => ({
      id: q.id,
      code: q.code,
      skillCodes: q.skillCodes,
      difficulty: q.difficulty,
      format: q.format,
      irtA: q.irtA,
      irtB: q.irtB,
      irtC: q.irtC,
      avgTimeMs: q.avgTimeMs,
      presentedCount: 0
    }));

    // For testing: prioritize hybrid questions
    const hybridQuestion = questionBank.find(q => q.format === 'HYBRID_VERIFY');
    const firstQuestion = hybridQuestion || questionBank.find(q => q.id ===
      itemSelector.selectNextItem(
        candidates,
        masteryStates,
        { targetSkills: sessionConfig.targetDomains }
      )?.id
    );

    if (!firstQuestion) {
      return NextResponse.json(
        { success: false, error: 'No suitable questions found' },
        { status: 400 }
      );
    }

    // Create session
    const session: AdaptiveDiagnosticSession = {
      id: sessionId,
      studentId,
      config: sessionConfig,
      startTime: new Date(),
      status: 'ACTIVE',
      itemsPresented: [firstQuestion],
      attempts: [],
      currentItemIndex: 0,
      masteryStates,
      masteryUpdates: [],
      misconceptionsDetected: []
    };

    // Store session
    sessionStore.set(sessionId, session);

    // Calculate estimated duration
    const estimatedDuration = Math.round(
      (sessionConfig.maxItems + sessionConfig.minItems) / 2 * 1.5
    );

    const response: StartDiagnosticResponse = {
      sessionId,
      firstItem: firstQuestion,
      estimatedDuration,
      totalSkillsToTest: masteryStates.size
    };

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Start diagnostic error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

