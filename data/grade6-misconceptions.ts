// Comprehensive Grade 6 Math Misconception Library
// Organized by domain with detailed remediation strategies

export interface Grade6Misconception {
  code: string;
  name: string;
  description: string;
  category: string;
  domain: string;
  affectedSkills: string[]; // Skill codes from grade6-skills.ts
  indicators: string[]; // Common error patterns that indicate this misconception
  remediation: string;
  examples: {
    incorrect: string;
    correct: string;
    explanation: string;
  }[];
}

export const grade6Misconceptions: Grade6Misconception[] = [
  // =====================================
  // RATIOS AND PROPORTIONAL RELATIONSHIPS
  // =====================================

  {
    code: "GR6-RATIO-REVERSE",
    name: "Reversing Ratio Order",
    description: "Student reverses the order of quantities in a ratio",
    category: "Ratio Concepts",
    domain: "Ratios and Proportional Relationships",
    affectedSkills: ["GR6.RP.RATIO_CONCEPT", "GR6.RP.RATIO_LANGUAGE"],
    indicators: [
      "For '3 boys to 5 girls', writing 5:3",
      "For 'miles per hour', treating as hours per mile",
      "Mixing up part-to-part vs part-to-whole ratios"
    ],
    remediation: "Emphasize the importance of order in ratios. Use labels (3 boys : 5 girls) and connect to real-world context.",
    examples: [{
      incorrect: "The ratio of boys to girls is 3:5, so there are 5 boys to 3 girls",
      correct: "The ratio of boys to girls is 3:5 means 3 boys for every 5 girls",
      explanation: "The first number corresponds to the first quantity mentioned (boys), second to the second (girls)"
    }]
  },

  {
    code: "GR6-PERCENT-OVER-100",
    name: "Percent Greater Than 100",
    description: "Student believes percent can never exceed 100%",
    category: "Percent",
    domain: "Ratios and Proportional Relationships",
    affectedSkills: ["GR6.RP.PERCENT_CONCEPT", "GR6.RP.PERCENT_PROBLEMS"],
    indicators: [
      "Refusing to accept 150% as valid",
      "Thinking 200% means 'all of it'",
      "Confusion when final amount exceeds original"
    ],
    remediation: "Explain that percent is 'per 100', and 150% means '150 per 100' or 1.5 times. Use visual models showing quantities beyond the original whole.",
    examples: [{
      incorrect: "A population grew to 200% of its original size means it stayed the same",
      correct: "200% of original size means it doubled (2 times the original)",
      explanation: "200% = 200/100 = 2, so the new size is twice the original"
    }]
  },

  {
    code: "GR6-UNIT-RATE-MULTIPLY",
    name: "Multiplying Instead of Dividing for Unit Rate",
    description: "Student multiplies quantities instead of dividing to find unit rate",
    category: "Unit Rates",
    domain: "Ratios and Proportional Relationships",
    affectedSkills: ["GR6.RP.UNIT_RATE", "GR6.RP.UNIT_PRICE"],
    indicators: [
      "For '$6 for 3 apples', calculating 6 × 3 = 18",
      "Finding '60 miles in 2 hours' as 60 × 2 = 120",
      "Confusion about which quantity to divide"
    ],
    remediation: "Emphasize that unit rate means 'per 1 unit'. To find price per 1 apple, divide total price by number of apples.",
    examples: [{
      incorrect: "$6 for 3 apples: $6 × 3 = $18 per apple",
      correct: "$6 for 3 apples: $6 ÷ 3 = $2 per apple",
      explanation: "To find the price for ONE apple, divide the total price by the number of apples"
    }]
  },

  // =====================================
  // THE NUMBER SYSTEM
  // =====================================

  {
    code: "GR6-DIV-FRAC-FLIP-BOTH",
    name: "Flipping Both Fractions When Dividing",
    description: "Student flips both fractions instead of just the divisor",
    category: "Division",
    domain: "The Number System",
    affectedSkills: ["GR6.NS.DIV_FRACTIONS"],
    indicators: [
      "3/4 ÷ 2/5 = 4/3 × 5/2",
      "1/2 ÷ 3/4 = 2/1 × 4/3",
      "Flipping both fractions before multiplying"
    ],
    remediation: "Keep, Change, Flip: Keep the first fraction, Change division to multiplication, Flip only the second fraction.",
    examples: [{
      incorrect: "3/4 ÷ 2/5 = 4/3 × 5/2 = 20/6",
      correct: "3/4 ÷ 2/5 = 3/4 × 5/2 = 15/8",
      explanation: "Only flip (take the reciprocal of) the divisor (the second fraction)"
    }]
  },

  {
    code: "GR6-ABS-VAL-NEGATIVE",
    name: "Absolute Value Makes Negatives Positive",
    description: "Student thinks |-5| = -5 or misunderstands absolute value concept",
    category: "Integers and Rational Numbers",
    domain: "The Number System",
    affectedSkills: ["GR6.NS.ABSOLUTE_VALUE"],
    indicators: [
      "|-5| = -5",
      "Confusion about 'distance from zero'",
      "Thinking absolute value only works on negatives"
    ],
    remediation: "Absolute value is the distance from zero, which is always positive or zero. |-5| means '5 units from zero', which is 5.",
    examples: [{
      incorrect: "|-5| = -5",
      correct: "|-5| = 5",
      explanation: "Absolute value represents distance from zero on a number line, which is always non-negative"
    }]
  },

  {
    code: "GR6-DECIMAL-MORE-DIGITS",
    name: "More Decimal Digits Means Larger Number",
    description: "Student thinks 0.25 > 0.9 because 25 > 9",
    category: "Decimal Operations",
    domain: "The Number System",
    affectedSkills: ["GR6.NS.ORDERING"],
    indicators: [
      "0.25 > 0.9",
      "0.125 > 0.5",
      "Comparing decimal digits as whole numbers"
    ],
    remediation: "Line up decimal points and compare place values. 0.9 = 0.90, so compare 90 hundredths vs 25 hundredths.",
    examples: [{
      incorrect: "0.25 > 0.9 because 25 > 9",
      correct: "0.9 > 0.25 because 0.90 (90 hundredths) > 0.25 (25 hundredths)",
      explanation: "Compare decimals by place value, not by the number of digits"
    }]
  },

  {
    code: "GR6-COORD-PLANE-ORDER",
    name: "Reversing Coordinate Order",
    description: "Student writes (y, x) instead of (x, y) for coordinates",
    category: "Coordinate Plane",
    domain: "The Number System",
    affectedSkills: ["GR6.NS.COORD_PLANE"],
    indicators: [
      "For point 3 right, 5 up, writing (5, 3)",
      "Confusing x and y coordinates",
      "Plotting (3, 5) at x=5, y=3"
    ],
    remediation: "Remember 'alphabetical order': x comes before y. Also 'walk before you fly': go left/right (x) before up/down (y).",
    examples: [{
      incorrect: "Point is 3 units right and 5 units up: (5, 3)",
      correct: "Point is 3 units right and 5 units up: (3, 5)",
      explanation: "Coordinates are always written as (x, y), where x is horizontal and y is vertical"
    }]
  },

  // =====================================
  // EXPRESSIONS, EQUATIONS, AND INEQUALITIES
  // =====================================

  {
    code: "GR6-EXPONENT-MULTIPLY",
    name: "Treating Exponent as Multiplication",
    description: "Student thinks 3² = 3 × 2 instead of 3 × 3",
    category: "Exponents",
    domain: "Expressions, Equations, and Inequalities",
    affectedSkills: ["GR6.EE.EXPONENTS"],
    indicators: [
      "3² = 6",
      "5² = 10",
      "2³ = 6"
    ],
    remediation: "Exponent shows how many times to multiply the base by itself. 3² means 3 × 3, not 3 × 2.",
    examples: [{
      incorrect: "5² = 5 × 2 = 10",
      correct: "5² = 5 × 5 = 25",
      explanation: "The exponent 2 means 'multiply 5 by itself 2 times'"
    }]
  },

  {
    code: "GR6-COMBINE-UNLIKE",
    name: "Combining Unlike Terms",
    description: "Student adds variables and constants or different variables",
    category: "Variable Expressions",
    domain: "Expressions, Equations, and Inequalities",
    affectedSkills: ["GR6.EE.COMBINE_TERMS", "GR6.EE.EQUIV_EXPR"],
    indicators: [
      "3x + 5 = 8x",
      "2x + 3y = 5xy",
      "x + 5 = 5x"
    ],
    remediation: "Only combine 'like terms' - terms with exactly the same variable part. 3x and 5 are not like terms.",
    examples: [{
      incorrect: "3x + 5 = 8x",
      correct: "3x + 5 stays as 3x + 5 (cannot be simplified)",
      explanation: "3x (has variable x) and 5 (constant) are unlike terms and cannot be combined"
    }]
  },

  {
    code: "GR6-DIST-PROP-ADD-ONLY",
    name: "Distributing Only to First Term",
    description: "Student distributes to only one term inside parentheses",
    category: "Variable Expressions",
    domain: "Expressions, Equations, and Inequalities",
    affectedSkills: ["GR6.EE.DIST_PROP"],
    indicators: [
      "2(x + 3) = 2x + 3",
      "5(2x - 4) = 10x - 4",
      "3(x + y) = 3x + y"
    ],
    remediation: "Distribute (multiply) the outside number with EVERY term inside the parentheses.",
    examples: [{
      incorrect: "2(x + 3) = 2x + 3",
      correct: "2(x + 3) = 2x + 6",
      explanation: "Multiply 2 by both x and 3: 2(x) + 2(3) = 2x + 6"
    }]
  },

  {
    code: "GR6-INEQUALITY-FLIP",
    name: "Not Understanding Inequality Symbols",
    description: "Student confuses < and > symbols or their meanings",
    category: "Inequalities",
    domain: "Expressions, Equations, and Inequalities",
    affectedSkills: ["GR6.EE.INEQUALITIES"],
    indicators: [
      "Writing x > 5 for 'x is less than 5'",
      "Thinking 3 < x means 'x is less than 3'",
      "Reading inequality symbols backwards"
    ],
    remediation: "The inequality symbol 'points to' the smaller number. Also remember: the 'mouth' opens toward the larger number.",
    examples: [{
      incorrect: "x > 5 means x is less than 5",
      correct: "x > 5 means x is greater than 5",
      explanation: "The symbol > points left to smaller values, opens right to larger values. x > 5 means x is on the larger side"
    }]
  },

  // =====================================
  // GEOMETRY
  // =====================================

  {
    code: "GR6-AREA-PERIMETER",
    name: "Confusing Area and Perimeter",
    description: "Student confuses area formulas with perimeter or vice versa",
    category: "Area",
    domain: "Geometry",
    affectedSkills: ["GR6.G.AREA_TRIANGLE", "GR6.G.AREA_QUAD"],
    indicators: [
      "Using A = 2l + 2w for area of rectangle",
      "Adding base and height for area of triangle",
      "Multiplying dimensions for perimeter"
    ],
    remediation: "Area measures the space inside (square units), perimeter measures the distance around (linear units).",
    examples: [{
      incorrect: "Area of rectangle with length 5 and width 3: A = 5 + 3 + 5 + 3 = 16",
      correct: "Area of rectangle: A = length × width = 5 × 3 = 15 square units",
      explanation: "Area is found by multiplying dimensions (space inside). The calculation 5+3+5+3 gives perimeter (distance around)"
    }]
  },

  {
    code: "GR6-TRIANGLE-AREA-BASE-HEIGHT",
    name: "Using Any Two Sides for Triangle Area",
    description: "Student uses any two sides instead of base and perpendicular height",
    category: "Area",
    domain: "Geometry",
    affectedSkills: ["GR6.G.AREA_TRIANGLE"],
    indicators: [
      "Using slant height instead of perpendicular height",
      "Multiplying any two sides and dividing by 2",
      "Not recognizing which measurement is the height"
    ],
    remediation: "Triangle area requires base and the perpendicular (90°) height to that base. Height must form a right angle with the base.",
    examples: [{
      incorrect: "Triangle with sides 5, 8, 10: A = (1/2) × 8 × 10 = 40",
      correct: "Need the perpendicular height, not just any side. If base is 8 and perpendicular height is 6: A = (1/2) × 8 × 6 = 24",
      explanation: "The height must be perpendicular (at 90°) to the base"
    }]
  },

  // =====================================
  // STATISTICS AND PROBABILITY
  // =====================================

  {
    code: "GR6-MEAN-MODE",
    name: "Confusing Mean and Mode",
    description: "Student confuses mean (average) with mode (most frequent)",
    category: "Measures of Center",
    domain: "Statistics and Probability",
    affectedSkills: ["GR6.SP.MEAN", "GR6.SP.MODE"],
    indicators: [
      "Reporting most frequent value as the mean",
      "Adding all values for the mode",
      "Mixing up definitions of mean, median, mode"
    ],
    remediation: "Mean is the average (add all values, divide by count). Mode is the most frequent value. Median is the middle value when ordered.",
    examples: [{
      incorrect: "Data: 2, 3, 3, 4, 5. Mean = 3 because 3 appears most",
      correct: "Data: 2, 3, 3, 4, 5. Mean = (2+3+3+4+5)/5 = 3.4. Mode = 3 (most frequent)",
      explanation: "Mean requires calculating the average of all values, not finding the most common one"
    }]
  },
];

// Helper function to get misconceptions by domain
export function getGrade6MisconceptionsByDomain(domain: string): Grade6Misconception[] {
  return grade6Misconceptions.filter(m => m.domain === domain);
}

// Helper function to get all categories
export function getGrade6MisconceptionCategories(): string[] {
  return Array.from(new Set(grade6Misconceptions.map(m => m.category)));
}
