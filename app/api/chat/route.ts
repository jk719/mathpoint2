import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages, skillName, topic, difficulty, language } = await req.json();

  const langInstruction = language === 'zh'
    ? 'IMPORTANT: Respond entirely in Mandarin Chinese (简体中文). All your teaching, questions, and explanations must be in Chinese.'
    : '';

  const systemPrompt = `You are a friendly, encouraging math tutor. You are teaching a student about "${skillName}" (topic: ${topic}, difficulty: ${difficulty}).

Your teaching style:
- Be warm and conversational, like a patient mentor
- Teach step-by-step with clear explanations
- Ask the student questions to check understanding
- Give specific, practical tips and shortcuts they can use immediately
- Use real-world examples (shopping, finance, grades) to make concepts relatable
- Keep responses concise — 2-3 short paragraphs max
- When the student answers correctly, celebrate briefly and move on
- When they're wrong, gently correct and explain why
- Use simple numbers first, then build to harder examples

${langInstruction}

Start by introducing the skill and asking the student what they already know about it.`;

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
