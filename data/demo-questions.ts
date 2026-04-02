import { SATQuestion } from '@/types/sat';

/**
 * Sushi Roll Making Questions — Demo Data
 *
 * ~45 questions across 18 skills (2-3 per skill).
 * Difficulty progression mirrors SAT insight:
 *   Easy = knowledge recall
 *   Medium = diagnosis & application
 *   Hard = pattern recognition & judgment
 */
export const demoQuestions: SATQuestion[] = [
  // ============================================
  // MAKI ROLLS — Easy
  // ============================================

  // Rice Spreading Basics (maki-rice-spread-easy)
  {
    id: 'demo-q01',
    skillId: 'maki-rice-spread-easy',
    questionText: 'When spreading sushi rice on nori for a maki roll, how thick should the rice layer be?',
    choices: [
      { label: 'A', text: 'As thick as possible so the roll is filling' },
      { label: 'B', text: 'A thin, even layer about 1/4 inch thick' },
      { label: 'C', text: 'Only on the edges, leaving the center empty' },
      { label: 'D', text: 'It doesn\'t matter — the bamboo mat shapes it' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q02',
    skillId: 'maki-rice-spread-easy',
    questionText: 'What should you do to your hands before spreading sushi rice to prevent sticking?',
    choices: [
      { label: 'A', text: 'Coat them in vegetable oil' },
      { label: 'B', text: 'Dust them with flour' },
      { label: 'C', text: 'Dip them in water mixed with rice vinegar' },
      { label: 'D', text: 'Wear latex gloves' },
    ],
    correctAnswer: 'C',
  },

  // Nori Orientation (maki-nori-orient-easy)
  {
    id: 'demo-q03',
    skillId: 'maki-nori-orient-easy',
    questionText: 'When placing nori on the bamboo mat for a maki roll, which side should face up?',
    choices: [
      { label: 'A', text: 'The shiny side' },
      { label: 'B', text: 'The rough side' },
      { label: 'C', text: 'Either side — it doesn\'t matter' },
      { label: 'D', text: 'The side with visible lines' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q04',
    skillId: 'maki-nori-orient-easy',
    questionText: 'How should a full sheet of nori be oriented on the bamboo mat for a standard maki roll?',
    choices: [
      { label: 'A', text: 'With the longer edge parallel to the slats of the mat' },
      { label: 'B', text: 'At a 45-degree angle to the mat' },
      { label: 'C', text: 'With the shorter edge parallel to the slats' },
      { label: 'D', text: 'Folded in half first, then placed on the mat' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 'demo-q05',
    skillId: 'maki-nori-orient-easy',
    questionText: 'When making a hosomaki (thin roll), what do you do with the nori sheet?',
    choices: [
      { label: 'A', text: 'Use the full sheet' },
      { label: 'B', text: 'Cut it in half' },
      { label: 'C', text: 'Cut it into quarters' },
      { label: 'D', text: 'Fold it in thirds' },
    ],
    correctAnswer: 'B',
  },

  // ============================================
  // MAKI ROLLS — Medium
  // ============================================

  // Filling Placement (maki-filling-place-medium)
  {
    id: 'demo-q06',
    skillId: 'maki-filling-place-medium',
    questionText: 'You\'re making a maki roll with three fillings: cucumber, avocado, and cream cheese. How should you arrange them?',
    choices: [
      { label: 'A', text: 'Stack all three on top of each other in the center' },
      { label: 'B', text: 'Spread them evenly across the entire rice surface' },
      { label: 'C', text: 'Place them in a line across the center, side by side' },
      { label: 'D', text: 'Put the heaviest ingredient on the outside edge' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 'demo-q07',
    skillId: 'maki-filling-place-medium',
    questionText: 'When adding fillings to a maki roll, you should leave a strip of bare nori at which edge?',
    choices: [
      { label: 'A', text: 'The edge closest to you' },
      { label: 'B', text: 'The edge farthest from you' },
      { label: 'C', text: 'Both edges equally' },
      { label: 'D', text: 'No bare strip is needed' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q08',
    skillId: 'maki-filling-place-medium',
    questionText: 'Your maki fillings keep shifting to one side when you roll. What\'s the most likely positioning error?',
    choices: [
      { label: 'A', text: 'The fillings are placed too close to the near edge' },
      { label: 'B', text: 'The fillings are not placed in a straight line' },
      { label: 'C', text: 'There\'s too much rice on the nori' },
      { label: 'D', text: 'The nori is oriented wrong' },
    ],
    correctAnswer: 'B',
  },

  // Rolling Technique (maki-rolling-tech-medium)
  {
    id: 'demo-q09',
    skillId: 'maki-rolling-tech-medium',
    questionText: 'When rolling a maki roll with the bamboo mat, what is the correct first motion?',
    choices: [
      { label: 'A', text: 'Roll the entire mat over in one motion' },
      { label: 'B', text: 'Lift the near edge of the mat and fold it over the fillings, tucking the nori edge against the far side of the fillings' },
      { label: 'C', text: 'Press straight down on the mat to compact everything' },
      { label: 'D', text: 'Slide the mat forward while pressing down' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q10',
    skillId: 'maki-rolling-tech-medium',
    questionText: 'After the first tuck of a maki roll, you notice an air pocket in the center. What should you do?',
    choices: [
      { label: 'A', text: 'Unroll and start over' },
      { label: 'B', text: 'Press the top of the roll firmly to pop it' },
      { label: 'C', text: 'Gently squeeze and reshape with the mat before completing the roll' },
      { label: 'D', text: 'Ignore it — cutting will remove the air' },
    ],
    correctAnswer: 'C',
  },

  // ============================================
  // MAKI ROLLS — Hard
  // ============================================

  // Precision Cutting (maki-cutting-hard)
  {
    id: 'demo-q11',
    skillId: 'maki-cutting-hard',
    questionText: 'Your maki pieces are getting crushed when you cut them. The rice is sticking to the knife and pulling apart. Which combination of fixes addresses the root cause?',
    choices: [
      { label: 'A', text: 'Use a serrated knife and cut slowly' },
      { label: 'B', text: 'Wet the knife with water before each cut and use a single pulling motion rather than pressing down' },
      { label: 'C', text: 'Freeze the roll for 5 minutes and cut with a dry knife' },
      { label: 'D', text: 'Press the roll flatter with the mat first, then cut with any sharp knife' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q12',
    skillId: 'maki-cutting-hard',
    questionText: 'A standard maki roll should be cut into how many pieces, and what\'s the technique for even sizing?',
    choices: [
      { label: 'A', text: '6 pieces — cut in half, then each half into thirds' },
      { label: 'B', text: '8 pieces — cut in half, then each half in half, then each quarter in half' },
      { label: 'C', text: '6 or 8 pieces — cut in half first, then line up the halves and cut them together for uniformity' },
      { label: 'D', text: '10 pieces — mark equal distances with the knife tip first, then cut' },
    ],
    correctAnswer: 'C',
  },

  // Roll Troubleshooting (maki-troubleshoot-hard)
  {
    id: 'demo-q13',
    skillId: 'maki-troubleshoot-hard',
    questionText: 'Your maki roll tears open along the seam after cutting. The rice and fillings look fine. What\'s the most likely root cause?',
    choices: [
      { label: 'A', text: 'The nori was stale or had absorbed too much moisture from the rice' },
      { label: 'B', text: 'There wasn\'t enough bare nori at the far edge to seal the roll' },
      { label: 'C', text: 'The fillings were too heavy' },
      { label: 'D', text: 'The knife was too dull' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q14',
    skillId: 'maki-troubleshoot-hard',
    questionText: 'You\'re making maki rolls in a humid kitchen. The nori keeps going limp before you finish rolling. Which adaptation best addresses this without changing ingredients?',
    choices: [
      { label: 'A', text: 'Work faster — prep all fillings first, then assemble each roll in under 60 seconds' },
      { label: 'B', text: 'Toast the nori over a flame right before use and keep unused sheets in a sealed bag with a desiccant' },
      { label: 'C', text: 'Use two sheets of nori layered together' },
      { label: 'D', text: 'Refrigerate the nori before use' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q15',
    skillId: 'maki-troubleshoot-hard',
    questionText: 'A student is making maki and reports: "My roll looks fine before cutting, but falls apart into a mess when I slice it." Rice texture is correct and nori is fresh. What should you investigate first?',
    choices: [
      { label: 'A', text: 'Whether they\'re using enough filling' },
      { label: 'B', text: 'Their rolling pressure — likely too loose, creating gaps between layers' },
      { label: 'C', text: 'The type of bamboo mat they\'re using' },
      { label: 'D', text: 'Whether they\'re waiting long enough before cutting' },
    ],
    correctAnswer: 'B',
  },

  // ============================================
  // URAMAKI (INSIDE-OUT) — Easy
  // ============================================

  // Rice-Outside Basics (ura-rice-outside-easy)
  {
    id: 'demo-q16',
    skillId: 'ura-rice-outside-easy',
    questionText: 'What makes an uramaki roll different from a regular maki roll?',
    choices: [
      { label: 'A', text: 'It uses brown rice instead of white rice' },
      { label: 'B', text: 'The rice is on the outside and the nori is on the inside' },
      { label: 'C', text: 'It doesn\'t use nori at all' },
      { label: 'D', text: 'It\'s always served with sauce on top' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q17',
    skillId: 'ura-rice-outside-easy',
    questionText: 'When making uramaki, after spreading rice on the nori, what do you do next?',
    choices: [
      { label: 'A', text: 'Add fillings on top of the rice' },
      { label: 'B', text: 'Flip the nori over so the rice faces down' },
      { label: 'C', text: 'Roll it immediately' },
      { label: 'D', text: 'Add another sheet of nori on top' },
    ],
    correctAnswer: 'B',
  },

  // Plastic Wrap Setup (ura-wrap-easy)
  {
    id: 'demo-q18',
    skillId: 'ura-wrap-easy',
    questionText: 'Why do you cover the bamboo mat with plastic wrap when making uramaki?',
    choices: [
      { label: 'A', text: 'To keep the mat clean for reuse' },
      { label: 'B', text: 'To prevent the rice (now on the outside) from sticking to the bamboo mat' },
      { label: 'C', text: 'To add extra compression for tighter rolls' },
      { label: 'D', text: 'Plastic wrap is optional and only used by beginners' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q19',
    skillId: 'ura-wrap-easy',
    questionText: 'How should the plastic wrap be applied to the bamboo mat for uramaki?',
    choices: [
      { label: 'A', text: 'Loosely draped over the top' },
      { label: 'B', text: 'Wrapped tightly around the entire mat with no wrinkles' },
      { label: 'C', text: 'Only covering the center third of the mat' },
      { label: 'D', text: 'Placed under the mat, not on top' },
    ],
    correctAnswer: 'B',
  },

  // ============================================
  // URAMAKI — Medium
  // ============================================

  // Topping Application (ura-topping-medium)
  {
    id: 'demo-q20',
    skillId: 'ura-topping-medium',
    questionText: 'You\'re applying sesame seeds to the outside of an uramaki roll. When is the best time to add them?',
    choices: [
      { label: 'A', text: 'After the roll is fully rolled and cut' },
      { label: 'B', text: 'Before rolling — sprinkle on the rice while it\'s still flat on the mat' },
      { label: 'C', text: 'During rolling — sprinkle as you go' },
      { label: 'D', text: 'Soak the seeds in water first, then press them in after cutting' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q21',
    skillId: 'ura-topping-medium',
    questionText: 'Tobiko (fish roe) keeps falling off your uramaki after cutting. What technique would fix this?',
    choices: [
      { label: 'A', text: 'Use more rice so the tobiko has a stickier surface' },
      { label: 'B', text: 'Gently press the tobiko into the rice with the bamboo mat after rolling, before cutting' },
      { label: 'C', text: 'Mix the tobiko into the rice before spreading' },
      { label: 'D', text: 'Apply a thin layer of mayo as glue before adding tobiko' },
    ],
    correctAnswer: 'B',
  },

  // Filling Balance (ura-filling-balance-medium)
  {
    id: 'demo-q22',
    skillId: 'ura-filling-balance-medium',
    questionText: 'You\'re designing a new uramaki roll. Which filling combination creates the best textural contrast?',
    choices: [
      { label: 'A', text: 'Cream cheese, avocado, and mango' },
      { label: 'B', text: 'Tempura shrimp, cucumber, and avocado' },
      { label: 'C', text: 'Three types of raw fish' },
      { label: 'D', text: 'Rice, tofu, and avocado' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q23',
    skillId: 'ura-filling-balance-medium',
    questionText: 'When pairing fillings for uramaki, why is it important to include something crunchy (like cucumber or tempura)?',
    choices: [
      { label: 'A', text: 'Crunchy ingredients absorb excess moisture' },
      { label: 'B', text: 'They provide structural support so the roll holds its shape' },
      { label: 'C', text: 'Textural contrast makes each bite more interesting and is a key principle of sushi composition' },
      { label: 'D', text: 'It\'s a traditional rule that must always be followed' },
    ],
    correctAnswer: 'C',
  },

  // ============================================
  // URAMAKI — Hard
  // ============================================

  // Structural Engineering (ura-structure-hard)
  {
    id: 'demo-q24',
    skillId: 'ura-structure-hard',
    questionText: 'You\'re making an uramaki roll with spicy tuna (wet), cream cheese (soft), and mango (juicy). All fillings are moisture-heavy. What\'s the best structural strategy?',
    choices: [
      { label: 'A', text: 'Use extra rice to absorb the moisture' },
      { label: 'B', text: 'Add a thin cucumber strip as a moisture barrier between wet fillings and the nori, and use slightly less rice so the roll stays tight' },
      { label: 'C', text: 'Refrigerate all fillings until very cold before assembling' },
      { label: 'D', text: 'Double the nori by using two sheets' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q25',
    skillId: 'ura-structure-hard',
    questionText: 'An uramaki roll keeps losing its round shape and flattening into an oval. The rice amount is correct. What\'s the technique fix?',
    choices: [
      { label: 'A', text: 'Roll it tighter by pulling the mat toward you as you roll' },
      { label: 'B', text: 'After rolling, reshape by gently pressing the mat on top and both sides to form a square, then round it' },
      { label: 'C', text: 'Use a thicker layer of plastic wrap for more padding' },
      { label: 'D', text: 'Let the roll rest seam-side down for 5 minutes before handling' },
    ],
    correctAnswer: 'B',
  },

  // Advanced Presentation (ura-presentation-hard)
  {
    id: 'demo-q26',
    skillId: 'ura-presentation-hard',
    questionText: 'You\'re plating 8 pieces of a dragon roll (uramaki topped with avocado slices). Which arrangement maximizes visual impact for a customer?',
    choices: [
      { label: 'A', text: 'Single straight line across the plate' },
      { label: 'B', text: 'Two rows of 4 pieces' },
      { label: 'C', text: 'Arrange pieces in a slight S-curve to mimic a dragon\'s body, with the end pieces angled to suggest head and tail' },
      { label: 'D', text: 'Stack them in a pyramid' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 'demo-q27',
    skillId: 'ura-presentation-hard',
    questionText: 'When adding sauce drizzle to a plated uramaki, which technique shows professional-level presentation?',
    choices: [
      { label: 'A', text: 'Pour sauce over the top of all pieces evenly' },
      { label: 'B', text: 'Serve sauce in a separate dish on the side' },
      { label: 'C', text: 'Use a squeeze bottle to create thin diagonal lines across the pieces and plate, alternating two complementary sauces' },
      { label: 'D', text: 'Dip each piece in sauce before plating' },
    ],
    correctAnswer: 'C',
  },

  // ============================================
  // TEMAKI (HAND ROLLS) — Easy
  // ============================================

  // Cone Shaping Basics (temaki-cone-easy)
  {
    id: 'demo-q28',
    skillId: 'temaki-cone-easy',
    questionText: 'What shape should a properly made temaki hand roll have?',
    choices: [
      { label: 'A', text: 'A cylinder, like a maki roll' },
      { label: 'B', text: 'A cone shape, like an ice cream cone' },
      { label: 'C', text: 'A flat wrap, like a burrito' },
      { label: 'D', text: 'A square pouch' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q29',
    skillId: 'temaki-cone-easy',
    questionText: 'When forming a temaki cone, which hand holds the nori?',
    choices: [
      { label: 'A', text: 'Your dominant hand' },
      { label: 'B', text: 'Your non-dominant hand — it cradles the nori while your dominant hand adds fillings and shapes the cone' },
      { label: 'C', text: 'Both hands equally' },
      { label: 'D', text: 'You don\'t hold it — it stays on the cutting board' },
    ],
    correctAnswer: 'B',
  },

  // Nori Preparation (temaki-nori-easy)
  {
    id: 'demo-q30',
    skillId: 'temaki-nori-easy',
    questionText: 'What nori size is typically used for a single temaki hand roll?',
    choices: [
      { label: 'A', text: 'A full sheet' },
      { label: 'B', text: 'A half sheet' },
      { label: 'C', text: 'A quarter sheet' },
      { label: 'D', text: 'A thin strip' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q31',
    skillId: 'temaki-nori-easy',
    questionText: 'Why is nori freshness especially important for temaki compared to maki rolls?',
    choices: [
      { label: 'A', text: 'Temaki uses more nori' },
      { label: 'B', text: 'Temaki is eaten by hand and stale nori is too chewy to bite through cleanly' },
      { label: 'C', text: 'The flavor is more noticeable in temaki' },
      { label: 'D', text: 'It\'s not — freshness matters equally for all types' },
    ],
    correctAnswer: 'B',
  },

  // ============================================
  // TEMAKI — Medium
  // ============================================

  // Filling Proportions (temaki-filling-medium)
  {
    id: 'demo-q32',
    skillId: 'temaki-filling-medium',
    questionText: 'Your temaki hand rolls keep overflowing and the cone won\'t close. What\'s the most likely issue?',
    choices: [
      { label: 'A', text: 'The nori sheet is too small' },
      { label: 'B', text: 'You\'re adding too much rice — temaki needs only a small smear, about 2 tablespoons' },
      { label: 'C', text: 'The fillings need to be cut smaller' },
      { label: 'D', text: 'You need to roll tighter' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q33',
    skillId: 'temaki-filling-medium',
    questionText: 'In a well-proportioned temaki, where should the fillings extend to?',
    choices: [
      { label: 'A', text: 'Flush with the top of the cone' },
      { label: 'B', text: 'Slightly above the nori cone, fanning out attractively' },
      { label: 'C', text: 'Below the rim so nothing is visible from outside' },
      { label: 'D', text: 'Overflowing dramatically for visual impact' },
    ],
    correctAnswer: 'B',
  },

  // Sealing Technique (temaki-seal-medium)
  {
    id: 'demo-q34',
    skillId: 'temaki-seal-medium',
    questionText: 'How do you seal the bottom point of a temaki cone to prevent fillings from falling out?',
    choices: [
      { label: 'A', text: 'Use a small dab of water on the nori to stick it closed' },
      { label: 'B', text: 'Place a single grain of rice at the bottom corner before rolling — the starch acts as natural glue' },
      { label: 'C', text: 'Fold the bottom up like a burrito' },
      { label: 'D', text: 'The cone shape naturally seals itself' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q35',
    skillId: 'temaki-seal-medium',
    questionText: 'The outer flap of your temaki keeps unrolling after you shape it. What\'s the fix?',
    choices: [
      { label: 'A', text: 'Hold it closed for 30 seconds until the nori stiffens' },
      { label: 'B', text: 'Apply a thin line of rice along the outer edge of the nori before completing the roll — the starch bonds the flap' },
      { label: 'C', text: 'Use a toothpick to hold it closed' },
      { label: 'D', text: 'Wrap it in plastic wrap to hold the shape' },
    ],
    correctAnswer: 'B',
  },

  // ============================================
  // TEMAKI — Hard
  // ============================================

  // Timing & Freshness (temaki-timing-hard)
  {
    id: 'demo-q36',
    skillId: 'temaki-timing-hard',
    questionText: 'You\'re serving temaki at a dinner party for 8 guests. Each person gets 3 hand rolls. What\'s the optimal serving strategy to maintain nori crispness?',
    choices: [
      { label: 'A', text: 'Make all 24 rolls in advance and serve them together on a platter' },
      { label: 'B', text: 'Set up a hand-roll station where guests assemble their own, keeping nori sealed until the moment of use' },
      { label: 'C', text: 'Make them in batches of 8, one round at a time' },
      { label: 'D', text: 'Wrap each finished roll in plastic wrap to preserve freshness' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q37',
    skillId: 'temaki-timing-hard',
    questionText: 'A temaki hand roll should ideally be eaten within what time window after assembly, and why?',
    choices: [
      { label: 'A', text: '30 minutes — the fish starts to turn' },
      { label: 'B', text: '2-3 minutes — after that, moisture from the rice makes the nori soggy and impossible to bite through cleanly' },
      { label: 'C', text: '10 minutes — standard restaurant serving window' },
      { label: 'D', text: 'There\'s no time limit if the ingredients are fresh' },
    ],
    correctAnswer: 'B',
  },

  // Creative Adaptation (temaki-adapt-hard)
  {
    id: 'demo-q38',
    skillId: 'temaki-adapt-hard',
    questionText: 'A guest is gluten-free and can\'t eat soy sauce. You\'re making temaki for them. Which adaptation maintains the umami flavor profile without gluten?',
    choices: [
      { label: 'A', text: 'Skip the dipping sauce entirely' },
      { label: 'B', text: 'Use coconut aminos or tamari (verified gluten-free) as the dipping sauce, and add a thin slice of shiso leaf inside the roll for extra flavor complexity' },
      { label: 'C', text: 'Substitute teriyaki sauce' },
      { label: 'D', text: 'Add extra wasabi to compensate' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q39',
    skillId: 'temaki-adapt-hard',
    questionText: 'You want to make temaki but have no nori. Which substitute would create the most structurally sound and flavorful hand roll?',
    choices: [
      { label: 'A', text: 'Iceberg lettuce leaves — flexible but bland and watery' },
      { label: 'B', text: 'Soy paper (mamenori) — specifically designed as a nori alternative, holds shape well, comes in multiple flavors' },
      { label: 'C', text: 'Rice paper wrappers — need to be soaked first' },
      { label: 'D', text: 'Thinly sliced cucumber sheets — attractive but too fragile for a cone' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 'demo-q40',
    skillId: 'temaki-adapt-hard',
    questionText: 'You\'re teaching a sushi class and a student wants to make a dessert temaki. Which combination best applies hand roll technique principles to sweet ingredients?',
    choices: [
      { label: 'A', text: 'Fill a nori cone with chocolate mousse and strawberries' },
      { label: 'B', text: 'Use a thin crepe as the wrapper, sweetened rice as the base, and fill with mango, red bean paste, and a mint leaf — mirroring the rice-base, filling-variety, fresh-accent structure of savory temaki' },
      { label: 'C', text: 'Roll ice cream in crushed cookies' },
      { label: 'D', text: 'Use fruit leather as a nori substitute with regular sushi rice' },
    ],
    correctAnswer: 'B',
  },
];
