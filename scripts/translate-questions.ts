/**
 * Translate demo questions from English to Mandarin Chinese via Claude API.
 *
 * Usage:
 *   npm run translate-questions
 *
 * Reads data/demo-questions.ts, writes data/demo-questions-zh.ts.
 * Idempotent: re-running re-translates everything. To preserve existing
 * translations, move or back up demo-questions-zh.ts first.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { demoQuestions } from '../data/demo-questions';

function loadEnv() {
  const path = resolve(process.cwd(), '.env');
  if (!existsSync(path)) return;
  const content = readFileSync(path, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnv();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY missing from .env');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const TRANSLATION_SYSTEM_PROMPT = `You translate SAT Math multiple-choice questions from English to Mandarin Chinese (简体中文) for Chinese high school students (ages 15-17).

STRICT RULES:
1. NEVER translate or modify anything inside LaTeX delimiters ($...$). Preserve them character-for-character, including backslashes (e.g. $\\frac{5}{7}$ stays exactly $\\frac{5}{7}$).
2. NEVER change the answer labels A, B, C, D.
3. Keep numeric-only choices unchanged ("15", "20", "$42.50", "75%"). Numbers are universal.
4. Translate ONLY natural language: question stems, words like "greater"/"cheaper"/"total"/"percent"/"find", scenario descriptions (store, dinner bill, population), units (only when natural in Chinese — e.g. "dollars" generally stays as "$").
5. Keep "$" for dollar amounts. Do NOT convert to ¥ or 元.
6. Preserve numbers exactly (including decimal points, commas like 1{,}000, percent signs).
7. Use natural conversational Mandarin suitable for a 15-17 year old — not stiff textbook prose. Match the warm tone of a peer explaining math.
8. Preserve sentence structure and punctuation where possible.

OUTPUT FORMAT: Return ONLY a valid JSON object, no prose, no code fences, no commentary:
{"questionText":"...","choices":[{"label":"A","text":"..."},{"label":"B","text":"..."},{"label":"C","text":"..."},{"label":"D","text":"..."}]}`;

interface Translated {
  questionText: string;
  choices: { label: string; text: string }[];
}

function extractJson(text: string): string {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first !== -1 && last > first) return text.slice(first, last + 1);
  return text.trim();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function translateQuestion(
  q: (typeof demoQuestions)[number],
  maxRetries = 5,
): Promise<Translated> {
  const input = JSON.stringify({ questionText: q.questionText, choices: q.choices });
  let attempt = 0;
  while (true) {
    try {
      const msg = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: TRANSLATION_SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [
          {
            role: 'user',
            content: `Translate this SAT Math question to Mandarin. Input:\n${input}`,
          },
          { role: 'assistant', content: '{' },
        ],
      });
      const block = msg.content[0];
      if (block.type !== 'text') throw new Error('no text block');
      const raw = '{' + block.text;
      const json = extractJson(raw);
      const parsed = JSON.parse(json);
      if (!parsed.questionText || !Array.isArray(parsed.choices) || parsed.choices.length !== 4) {
        throw new Error(`bad shape: ${json.slice(0, 200)}`);
      }
      return parsed;
    } catch (err) {
      const e = err as { status?: number; message?: string };
      const isRateLimit = e.status === 429 || /rate_limit|429/i.test(e.message ?? '');
      if (isRateLimit && attempt < maxRetries) {
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000);
        await sleep(delay);
        attempt++;
        continue;
      }
      throw err;
    }
  }
}

async function main() {
  const output: Record<string, Translated> = {};
  let succeeded = 0;
  const failed: { id: string; error: string }[] = [];
  const start = Date.now();
  const BATCH_SIZE = 2;
  const INTER_BATCH_MS = 2500;

  console.log(
    `Translating ${demoQuestions.length} questions in batches of ${BATCH_SIZE} (${INTER_BATCH_MS}ms between batches)...\n`,
  );

  for (let i = 0; i < demoQuestions.length; i += BATCH_SIZE) {
    const batch = demoQuestions.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(batch.map((q) => translateQuestion(q)));
    results.forEach((r, idx) => {
      const q = batch[idx];
      if (r.status === 'fulfilled') {
        output[q.id] = r.value;
        succeeded++;
        process.stdout.write(`✓ ${q.id} (${succeeded}/${demoQuestions.length})\n`);
      } else {
        const msg = r.reason instanceof Error ? r.reason.message : String(r.reason);
        failed.push({ id: q.id, error: msg });
        process.stdout.write(`✗ ${q.id}: ${msg}\n`);
      }
    });
    if (i + BATCH_SIZE < demoQuestions.length) await sleep(INTER_BATCH_MS);
  }

  const fileContent = `/**
 * Mandarin Chinese translations for demo questions.
 * Auto-generated by scripts/translate-questions.ts.
 * Regenerate: npm run translate-questions
 */
export const demoQuestionsZh: Record<string, { questionText: string; choices: { label: string; text: string }[] }> = ${JSON.stringify(
    output,
    null,
    2,
  )};
`;

  writeFileSync(resolve(process.cwd(), 'data/demo-questions-zh.ts'), fileContent);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s: ${succeeded} succeeded, ${failed.length} failed.`);
  if (failed.length) {
    console.log('\nFailures:');
    for (const f of failed) console.log(`  ${f.id}: ${f.error}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
