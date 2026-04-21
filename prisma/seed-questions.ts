// Seed Questions Script for mathpoint.io
// Seeds questions from data/sat-questions.ts into the database
// Run after seed.ts: npx tsx prisma/seed-questions.ts

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface QuestionData {
  id: string
  skillId: string
  questionText: string
  choices: { label: string; text: string }[]
  correctAnswer: string
  collegeBoardId?: string
}

// Parse questions from the data file
function parseQuestionsFromFile(): QuestionData[] {
  const filePath = path.join(__dirname, '../data/sat-questions.ts')
  const content = fs.readFileSync(filePath, 'utf-8')

  // Extract the array content between the first [ and the last ]
  const match = content.match(/export const satQuestions: SATQuestion\[\] = \[([\s\S]*)\];/)
  if (!match) {
    throw new Error('Could not parse questions from file')
  }

  // Parse the array content - this is a simple parser for the specific format
  const arrayContent = match[1]
  const questions: QuestionData[] = []

  // Match each question object
  const questionRegex = /\{\s*id:\s*'([^']+)',\s*skillId:\s*'([^']+)',\s*questionText:\s*'((?:[^'\\]|\\.)*)'\s*,\s*choices:\s*\[([\s\S]*?)\],\s*correctAnswer:\s*'([^']+)'(?:,\s*collegeBoardId:\s*'([^']+)')?\s*,?\s*\}/g

  let qMatch
  while ((qMatch = questionRegex.exec(arrayContent)) !== null) {
    const [, id, skillId, questionText, choicesStr, correctAnswer, collegeBoardId] = qMatch

    // Parse choices
    const choiceRegex = /\{\s*label:\s*'([^']+)',\s*text:\s*'((?:[^'\\]|\\.)*)'\s*\}/g
    const choices: { label: string; text: string }[] = []
    let cMatch
    while ((cMatch = choiceRegex.exec(choicesStr)) !== null) {
      choices.push({
        label: cMatch[1],
        text: cMatch[2].replace(/\\'/g, "'"),
      })
    }

    questions.push({
      id,
      skillId,
      questionText: questionText.replace(/\\'/g, "'").replace(/\\n/g, '\n'),
      choices,
      correctAnswer,
      collegeBoardId: collegeBoardId || undefined,
    })
  }

  return questions
}

async function seedQuestions() {
  console.log('❓ Seeding questions from data/sat-questions.ts...')

  // Get all skills with their codes
  const skills = await prisma.skill.findMany({
    select: { id: true, code: true },
  })
  const skillMap = new Map(skills.map(s => [s.code, s.id]))
  console.log(`   Found ${skills.length} skills in database`)

  // Delete existing questions
  console.log('🗑️  Clearing existing questions...')
  await prisma.question.deleteMany()

  // Parse questions from file
  let questions: QuestionData[]
  try {
    questions = parseQuestionsFromFile()
    console.log(`   Parsed ${questions.length} questions from file`)
  } catch (e) {
    console.error('   ✗ Failed to parse questions file:', e)
    return
  }

  // Create questions
  let created = 0
  let skipped = 0
  const missingSkills = new Set<string>()

  for (const q of questions) {
    const skillId = skillMap.get(q.skillId)
    if (!skillId) {
      missingSkills.add(q.skillId)
      skipped++
      continue
    }

    try {
      await prisma.question.create({
        data: {
          collegeBoardId: q.collegeBoardId,
          questionText: q.questionText,
          choices: q.choices,
          correctAnswer: q.correctAnswer,
          skillId,
        },
      })
      created++
    } catch (e) {
      console.error(`   ✗ Failed to create question ${q.id}:`, e)
      skipped++
    }
  }

  console.log('')
  console.log('✅ Question seeding complete!')
  console.log(`   Created: ${created}`)
  console.log(`   Skipped: ${skipped}`)

  if (missingSkills.size > 0) {
    console.log('')
    console.log('⚠️  Missing skills (questions skipped):')
    for (const skillId of missingSkills) {
      console.log(`   - ${skillId}`)
    }
  }
}

seedQuestions()
  .catch((e) => {
    console.error('❌ Question seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
