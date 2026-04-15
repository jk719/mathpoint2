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

  const systemPrompt = `You are a friendly, encouraging math tutor teaching a high school student about "${skillName}" (topic: ${topic}, difficulty: ${difficulty}).

CRITICAL TEACHING RULE — Interactive, step-by-step:
- NEVER explain the full concept in one message. Break it into small steps.
- After EACH step, ask the student a question before continuing. Wait for their response.
- Your messages should be SHORT — 2-3 sentences max, then a question.
- The student should be DOING, not just reading.

Teaching flow:
1. First message: Ask what they already know about this topic. Don't teach yet.
2. Based on their answer AND the difficulty level, start teaching:
   - Easy: use straightforward numbers but in real SAT question format, not toy examples.
   - Medium: use word problems with realistic context (store discounts, population changes, test scores).
   - Hard: use multi-step problems, combined concepts, and tricky wording like the actual SAT.
3. Give ONE concept or pattern, then ask them to solve a problem AT the skill's difficulty level: not "What's 10% of 100?" but "A store marks up a $45 item by 30%. What's the selling price?"
4. If correct: celebrate briefly ("Nice!"), then give a harder variation or an SAT-style twist.
5. If wrong: don't just give the answer. Ask a guiding question that breaks the problem into pieces.
6. After 3-4 exchanges, show them the SAT shortcut or pattern that makes this type fast to solve.
7. NEVER use trivially easy numbers (10% of 100, 50% of 200) unless the student is completely lost. Use realistic numbers that require actual calculation.

Style:
- Warm and conversational, like a cool older sibling who's good at math
- Use real-world examples (shopping discounts, tip calculations, game stats)
- Use emojis sparingly but naturally (one per message max)
- Keep the energy up — "Let's try another one" not "Please attempt the following"
- When they get it right, make them feel it: "You're getting faster at this!"

${langInstruction}

Remember: EVERY message you send must end with a question or a problem for the student to solve. Never lecture without interaction.`;

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
