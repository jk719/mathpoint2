import { NextRequest, NextResponse } from 'next/server';
import { BayesianKT, SkillMastery } from '@/lib/adaptive/BayesianKT';
import { ItemSelector } from '@/lib/adaptive/ItemSelector';
import { grade6Skills } from '@/data/grade6-skills';
import { grade6Questions } from '@/data/grade6-questions';
import { sessionStore } from '@/lib/adaptive/SessionStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
          }
        });
      }
    }

    // Create new session
    const sessionId = `gr6_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    // Initialize session configuration
    const sessionConfig = {
      maxItems: config.maxItems || 10,
      minItems: config.minItems || 5,
      targetDomains: config.targetDomains || [],
      adaptiveMode: config.adaptiveMode !== false,
      allowHints: config.allowHints !== false,
      timeLimit: config.timeLimit,
      demo: config.demo || false
    };

    // Initialize Bayesian Knowledge Tracing
    const bkt = new BayesianKT();
    const masteryStates = new Map<string, SkillMastery>();

    // Initialize mastery for target skills or all skills
    const targetSkills = sessionConfig.targetDomains && sessionConfig.targetDomains.length > 0
      ? grade6Skills.filter(s => sessionConfig.targetDomains!.includes(s.domain))
      : grade6Skills.slice(0, 30); // Start with subset for efficiency

    for (const skill of targetSkills) {
      masteryStates.set(skill.code, bkt.initializeSkillMastery(skill.code));
    }

    // Use all Grade 6 questions
    const questionBank = grade6Questions;

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

    const firstQuestion = questionBank.find(q => q.id ===
      itemSelector.selectNextItem(
        candidates,
        masteryStates,
        { targetSkills: sessionConfig.targetDomains }
      )?.id
    ) || questionBank[0]; // Fallback to first question

    if (!firstQuestion) {
      return NextResponse.json(
        { success: false, error: 'No suitable questions found' },
        { status: 400 }
      );
    }

    // Create session
    const session = {
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

    const response = {
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
