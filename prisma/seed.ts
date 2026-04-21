// Prisma Seed Script for mathpoint.io
// Populates the database with SAT Math sections, topics, patterns, skills, and questions

import { PrismaClient, SkillDifficulty } from '@prisma/client'

const prisma = new PrismaClient()

// =============================================================================
// SECTION DATA — The 4 SAT Math Sections
// =============================================================================

const sections = [
  {
    name: 'Algebra',
    slug: 'algebra',
    description: 'Linear equations, functions, systems, and inequalities',
    sortOrder: 1,
  },
  {
    name: 'Advanced Math',
    slug: 'advanced-math',
    description: 'Nonlinear functions, equations, and equivalent expressions',
    sortOrder: 2,
  },
  {
    name: 'Problem-Solving and Data Analysis',
    slug: 'problem-solving-data-analysis',
    description: 'Ratios, percentages, data analysis, probability, and statistics',
    sortOrder: 3,
  },
  {
    name: 'Geometry and Trigonometry',
    slug: 'geometry-trigonometry',
    description: 'Area, volume, lines, angles, triangles, and circles',
    sortOrder: 4,
  },
]

// =============================================================================
// TOPIC DATA — 19 SAT Math Topics mapped to Sections
// =============================================================================

const topicsBySection: Record<string, { name: string; slug: string; sortOrder: number }[]> = {
  'algebra': [
    { name: 'Linear Equations One Variable', slug: 'linear-equations-one-variable', sortOrder: 1 },
    { name: 'Linear Functions', slug: 'linear-functions', sortOrder: 2 },
    { name: 'Linear Equations Two Variables', slug: 'linear-equations-two-variables', sortOrder: 3 },
    { name: 'Systems of Two Linear Equations', slug: 'systems-two-linear-equations', sortOrder: 4 },
    { name: 'Linear Inequalities', slug: 'linear-inequalities', sortOrder: 5 },
  ],
  'advanced-math': [
    { name: 'Nonlinear Functions', slug: 'nonlinear-functions', sortOrder: 1 },
    { name: 'Nonlinear Equations and Systems', slug: 'nonlinear-equations-systems', sortOrder: 2 },
    { name: 'Equivalent Expressions', slug: 'equivalent-expressions', sortOrder: 3 },
  ],
  'problem-solving-data-analysis': [
    { name: 'Ratios Rates Proportions', slug: 'ratios-rates-proportions', sortOrder: 1 },
    { name: 'Percentages', slug: 'percentages', sortOrder: 2 },
    { name: 'One Variable Data', slug: 'one-variable-data', sortOrder: 3 },
    { name: 'Two Variable Data', slug: 'two-variable-data', sortOrder: 4 },
    { name: 'Probability', slug: 'probability', sortOrder: 5 },
    { name: 'Inference from Samples', slug: 'inference-from-samples', sortOrder: 6 },
    { name: 'Evaluating Statistical Claims', slug: 'evaluating-statistical-claims', sortOrder: 7 },
  ],
  'geometry-trigonometry': [
    { name: 'Area and Volume', slug: 'area-and-volume', sortOrder: 1 },
    { name: 'Lines Angles Triangles', slug: 'lines-angles-triangles', sortOrder: 2 },
    { name: 'Right Triangles and Trigonometry', slug: 'right-triangles-trigonometry', sortOrder: 3 },
    { name: 'Circles', slug: 'circles', sortOrder: 4 },
  ],
}

// =============================================================================
// SKILL DATA — From data/sat-skills.ts
// =============================================================================

interface SkillData {
  id: string
  topic: string
  pattern: string
  variant: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  displayName: string
}

const skills: SkillData[] = [
  // Linear Equations Two Variables - Easy
  { id: 'linear-eq-interp-coeff-easy', topic: 'Linear Equations Two Variables', pattern: 'Interpretation', variant: 'Coefficient meaning', difficulty: 'Easy', displayName: 'Interpreting Coefficients' },
  { id: 'linear-eq-perp-slope-easy', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'Find perpendicular slope', difficulty: 'Easy', displayName: 'Perpendicular Line Slope' },
  { id: 'linear-eq-table-verify-easy', topic: 'Linear Equations Two Variables', pattern: 'Table Verification', variant: 'Check table values', difficulty: 'Easy', displayName: 'Verify Table Values' },
  { id: 'linear-eq-model-setup-easy', topic: 'Linear Equations Two Variables', pattern: 'Model Setup', variant: 'Build equation from scenario', difficulty: 'Easy', displayName: 'Setting Up Linear Models' },
  { id: 'linear-eq-parallel-easy', topic: 'Linear Equations Two Variables', pattern: 'Parallel Lines', variant: 'Same slope', difficulty: 'Easy', displayName: 'Parallel Line Equations' },
  { id: 'linear-eq-slope-point-easy', topic: 'Linear Equations Two Variables', pattern: 'Slope & Point', variant: 'From slope-intercept form', difficulty: 'Easy', displayName: 'Line from Slope and Point' },
  { id: 'linear-eq-graph-read-easy', topic: 'Linear Equations Two Variables', pattern: 'Graph Reading', variant: 'Identify from graph', difficulty: 'Easy', displayName: 'Reading Linear Graphs' },
  { id: 'linear-eq-intercepts-easy', topic: 'Linear Equations Two Variables', pattern: 'Intercepts', variant: 'Find y-intercept', difficulty: 'Easy', displayName: 'Finding Intercepts' },
  { id: 'linear-eq-table-to-eq-easy', topic: 'Linear Equations Two Variables', pattern: 'Table to Equation', variant: 'Build equation from table', difficulty: 'Easy', displayName: 'Equation from Table' },
  { id: 'linear-eq-subst-solve-easy', topic: 'Linear Equations Two Variables', pattern: 'Substitution', variant: 'Substitute and solve', difficulty: 'Easy', displayName: 'Substitution in Linear Equations' },

  // Linear Equations Two Variables - Medium
  { id: 'linear-eq-slope-calc-medium', topic: 'Linear Equations Two Variables', pattern: 'Slope Calculation', variant: 'From two points or standard form', difficulty: 'Medium', displayName: 'Calculating Slope' },
  { id: 'linear-eq-perp-standard-medium', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'From standard form Ax + By = C', difficulty: 'Medium', displayName: 'Perpendicular from Standard Form' },
  { id: 'linear-eq-parallel-standard-medium', topic: 'Linear Equations Two Variables', pattern: 'Parallel Lines', variant: 'From standard form', difficulty: 'Medium', displayName: 'Parallel from Standard Form' },
  { id: 'linear-eq-interp-variable-medium', topic: 'Linear Equations Two Variables', pattern: 'Interpretation', variant: 'Variable or term meaning', difficulty: 'Medium', displayName: 'Interpreting Variables and Terms' },
  { id: 'linear-eq-equation-build-medium', topic: 'Linear Equations Two Variables', pattern: 'Equation Building', variant: 'From points or table', difficulty: 'Medium', displayName: 'Building Equations' },
  { id: 'linear-eq-subst-multi-medium', topic: 'Linear Equations Two Variables', pattern: 'Substitution', variant: 'Multi-step substitution', difficulty: 'Medium', displayName: 'Multi-step Substitution' },
  { id: 'linear-eq-table-to-eq-medium', topic: 'Linear Equations Two Variables', pattern: 'Table to Equation', variant: 'Build equation from table', difficulty: 'Medium', displayName: 'Table to Equation' },
  { id: 'linear-eq-graph-standard-medium', topic: 'Linear Equations Two Variables', pattern: 'Graph to Equation', variant: 'Write in standard form', difficulty: 'Medium', displayName: 'Graph to Standard Form' },
  { id: 'linear-eq-word-problem-medium', topic: 'Linear Equations Two Variables', pattern: 'Word Problem', variant: 'Setup and solve', difficulty: 'Medium', displayName: 'Word Problems' },

  // Linear Equations Two Variables - Hard
  { id: 'linear-eq-perp-nonstandard-hard', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'From non-standard form Ay + Bx = C', difficulty: 'Hard', displayName: 'Perpendicular Lines — Advanced' },
  { id: 'linear-eq-perp-graph-hard', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'From graph reading', difficulty: 'Hard', displayName: 'Perpendicular from Graphs' },
  { id: 'linear-eq-perp-vertical-hard', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'Vertical or horizontal lines', difficulty: 'Hard', displayName: 'Perpendicular — Special Cases' },
  { id: 'linear-eq-perp-abstract-hard', topic: 'Linear Equations Two Variables', pattern: 'Perpendicular Lines', variant: 'Abstract relationship', difficulty: 'Hard', displayName: 'Perpendicular — Abstract' },
  { id: 'linear-eq-param-single-hard', topic: 'Linear Equations Two Variables', pattern: 'Parameter Determination', variant: 'Single parameter from constraints', difficulty: 'Hard', displayName: 'Finding Parameters' },
  { id: 'linear-eq-param-dual-hard', topic: 'Linear Equations Two Variables', pattern: 'Parameter Determination', variant: 'Two parameters sequentially', difficulty: 'Hard', displayName: 'Finding Multiple Parameters' },
  { id: 'linear-eq-graph-param-hard', topic: 'Linear Equations Two Variables', pattern: 'Graph to Parameter', variant: 'Extract parameter from graph', difficulty: 'Hard', displayName: 'Parameters from Graphs' },
  { id: 'linear-eq-interp-diff-hard', topic: 'Linear Equations Two Variables', pattern: 'Interpretation', variant: 'Coefficient difference meaning', difficulty: 'Hard', displayName: 'Interpreting Differences' },
  { id: 'linear-eq-interp-product-hard', topic: 'Linear Equations Two Variables', pattern: 'Interpretation', variant: 'Product or term interpretation', difficulty: 'Hard', displayName: 'Interpreting Products' },
  { id: 'linear-eq-intercept-frac-hard', topic: 'Linear Equations Two Variables', pattern: 'Intercept Finding', variant: 'With fractional coefficients', difficulty: 'Hard', displayName: 'Intercepts — Advanced' },
  { id: 'linear-eq-intercept-ratio-hard', topic: 'Linear Equations Two Variables', pattern: 'Intercept Finding', variant: 'Intercept ratio shortcut', difficulty: 'Hard', displayName: 'Intercept Ratios' },
  { id: 'linear-eq-transform-translate-hard', topic: 'Linear Equations Two Variables', pattern: 'Transformation', variant: 'Translation up or down', difficulty: 'Hard', displayName: 'Translating Lines' },
  { id: 'linear-eq-transform-function-hard', topic: 'Linear Equations Two Variables', pattern: 'Transformation', variant: 'Function notation y = f(x) + k', difficulty: 'Hard', displayName: 'Function Transformations' },
  { id: 'linear-eq-table-chain-hard', topic: 'Linear Equations Two Variables', pattern: 'Table to Equation', variant: 'Table to equation to intercept', difficulty: 'Hard', displayName: 'Tables to Intercepts' },
  { id: 'linear-eq-parallel-constraint-hard', topic: 'Linear Equations Two Variables', pattern: 'Parallel Lines', variant: 'Parallel with additional constraint', difficulty: 'Hard', displayName: 'Parallel Lines — Advanced' },
  { id: 'linear-eq-mixture-hard', topic: 'Linear Equations Two Variables', pattern: 'Mixture Problem', variant: 'Weighted average with percentages', difficulty: 'Hard', displayName: 'Mixture Problems' },
  { id: 'linear-eq-param-constraint-hard', topic: 'Linear Equations Two Variables', pattern: 'Parameter Constraints', variant: 'Match constraints to graph', difficulty: 'Hard', displayName: 'Constraints to Graphs' },
]

// =============================================================================
// QUESTION DATA — From data/sat-questions.ts (inline to avoid import issues)
// =============================================================================

interface QuestionData {
  id: string
  skillId: string
  questionText: string
  choices: { label: string; text: string }[]
  correctAnswer: string
  collegeBoardId?: string
}

// Note: This imports questions programmatically from the data file
// For large datasets, consider using a JSON file instead
const questions: QuestionData[] = [
  // Sample questions - the full list would be imported from sat-questions.ts
  // For now, we'll seed questions in a separate step
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function mapDifficulty(diff: 'Easy' | 'Medium' | 'Hard'): SkillDifficulty {
  return diff as SkillDifficulty
}

// Map topic names from skills to topic slugs
function getTopicSlug(topicName: string): string {
  const mapping: Record<string, string> = {
    'Linear Equations Two Variables': 'linear-equations-two-variables',
    'Linear Equations One Variable': 'linear-equations-one-variable',
    'Linear Functions': 'linear-functions',
    'Systems of Two Linear Equations': 'systems-two-linear-equations',
    'Linear Inequalities': 'linear-inequalities',
    'Nonlinear Functions': 'nonlinear-functions',
    'Nonlinear Equations and Systems': 'nonlinear-equations-systems',
    'Equivalent Expressions': 'equivalent-expressions',
    'Ratios Rates Proportions': 'ratios-rates-proportions',
    'Percentages': 'percentages',
    'One Variable Data': 'one-variable-data',
    'Two Variable Data': 'two-variable-data',
    'Probability': 'probability',
    'Inference from Samples': 'inference-from-samples',
    'Evaluating Statistical Claims': 'evaluating-statistical-claims',
    'Area and Volume': 'area-and-volume',
    'Lines Angles Triangles': 'lines-angles-triangles',
    'Right Triangles and Trigonometry': 'right-triangles-trigonometry',
    'Circles': 'circles',
  }
  return mapping[topicName] || slugify(topicName)
}

// =============================================================================
// SEED FUNCTION
// =============================================================================

async function seed() {
  console.log('🌱 Starting seed...')

  // Clear existing data (in reverse order of dependencies)
  console.log('🗑️  Clearing existing data...')
  await prisma.questionResponse.deleteMany()
  await prisma.diagnosticQuestion.deleteMany()
  await prisma.practiceQuestion.deleteMany()
  await prisma.diagnosticSection.deleteMany()
  await prisma.diagnosticSession.deleteMany()
  await prisma.practiceSession.deleteMany()
  await prisma.masteryHistory.deleteMany()
  await prisma.skillMastery.deleteMany()
  await prisma.question.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.pattern.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.section.deleteMany()
  await prisma.userBadge.deleteMany()
  await prisma.badge.deleteMany()
  await prisma.user.deleteMany()

  // Create sections
  console.log('📚 Creating sections...')
  const sectionMap = new Map<string, string>() // slug -> id
  for (const section of sections) {
    const created = await prisma.section.create({
      data: section,
    })
    sectionMap.set(section.slug, created.id)
    console.log(`   ✓ ${section.name}`)
  }

  // Create topics
  console.log('📖 Creating topics...')
  const topicMap = new Map<string, string>() // slug -> id
  for (const [sectionSlug, topics] of Object.entries(topicsBySection)) {
    const sectionId = sectionMap.get(sectionSlug)
    if (!sectionId) {
      console.error(`   ✗ Section not found: ${sectionSlug}`)
      continue
    }
    for (const topic of topics) {
      const created = await prisma.topic.create({
        data: {
          ...topic,
          sectionId,
        },
      })
      topicMap.set(topic.slug, created.id)
      console.log(`   ✓ ${topic.name}`)
    }
  }

  // Extract unique patterns from skills and create them
  console.log('🔷 Creating patterns...')
  const patternMap = new Map<string, string>() // "topicSlug:patternSlug" -> id
  const seenPatterns = new Set<string>()

  for (const skill of skills) {
    const topicSlug = getTopicSlug(skill.topic)
    const patternSlug = slugify(skill.pattern)
    const key = `${topicSlug}:${patternSlug}`

    if (seenPatterns.has(key)) continue
    seenPatterns.add(key)

    const topicId = topicMap.get(topicSlug)
    if (!topicId) {
      console.error(`   ✗ Topic not found for pattern: ${skill.pattern} (topic: ${skill.topic})`)
      continue
    }

    const created = await prisma.pattern.create({
      data: {
        name: skill.pattern,
        slug: patternSlug,
        topicId,
        sortOrder: 0,
      },
    })
    patternMap.set(key, created.id)
    console.log(`   ✓ ${skill.pattern} (${skill.topic})`)
  }

  // Create skills
  console.log('🎯 Creating skills...')
  const skillMap = new Map<string, string>() // skill code -> id
  for (const skill of skills) {
    const topicSlug = getTopicSlug(skill.topic)
    const patternSlug = slugify(skill.pattern)
    const patternKey = `${topicSlug}:${patternSlug}`
    const patternId = patternMap.get(patternKey)

    if (!patternId) {
      console.error(`   ✗ Pattern not found for skill: ${skill.id}`)
      continue
    }

    const created = await prisma.skill.create({
      data: {
        code: skill.id,
        variant: skill.variant,
        difficulty: mapDifficulty(skill.difficulty),
        displayName: skill.displayName,
        patternId,
      },
    })
    skillMap.set(skill.id, created.id)
    console.log(`   ✓ ${skill.displayName} (${skill.difficulty})`)
  }

  // Create questions (if any in the inline array)
  if (questions.length > 0) {
    console.log('❓ Creating questions...')
    let questionsCreated = 0
    for (const q of questions) {
      const skillId = skillMap.get(q.skillId)
      if (!skillId) {
        console.error(`   ✗ Skill not found for question: ${q.id} (skill: ${q.skillId})`)
        continue
      }

      await prisma.question.create({
        data: {
          collegeBoardId: q.collegeBoardId,
          questionText: q.questionText,
          choices: q.choices,
          correctAnswer: q.correctAnswer,
          skillId,
        },
      })
      questionsCreated++
    }
    console.log(`   ✓ Created ${questionsCreated} questions`)
  }

  // Summary
  console.log('')
  console.log('✅ Seed complete!')
  console.log(`   Sections: ${sectionMap.size}`)
  console.log(`   Topics: ${topicMap.size}`)
  console.log(`   Patterns: ${patternMap.size}`)
  console.log(`   Skills: ${skillMap.size}`)
  if (questions.length > 0) {
    console.log(`   Questions: ${questions.length}`)
  }
  console.log('')
  console.log('📝 To seed questions, run: npx tsx prisma/seed-questions.ts')
}

// =============================================================================
// RUN
// =============================================================================

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
