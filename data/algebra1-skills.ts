// Comprehensive Algebra 1 Skill Hierarchy
// Based on the 11 domains with all atomic skills

export interface AlgebraSkill {
  code: string;
  name: string;
  description: string;
  domain: string;
  category: string;
  difficulty: number; // 1-5
  prerequisites?: string[]; // Skill codes that must be mastered first
}

export const algebra1Skills: AlgebraSkill[] = [
  // =====================================
  // 1. FOUNDATIONS OF ALGEBRA
  // =====================================

  // Real Numbers & Properties
  {
    code: "ALG1.FOUND.NAT_NUM",
    name: "Natural Numbers",
    description: "Understanding and working with natural numbers (1, 2, 3, ...)",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.FOUND.WHOLE_NUM",
    name: "Whole Numbers",
    description: "Understanding whole numbers (0, 1, 2, 3, ...)",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: ["ALG1.FOUND.NAT_NUM"]
  },
  {
    code: "ALG1.FOUND.INTEGERS",
    name: "Integers",
    description: "Working with positive and negative integers",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: ["ALG1.FOUND.WHOLE_NUM"]
  },
  {
    code: "ALG1.FOUND.RATIONAL",
    name: "Rational Numbers",
    description: "Understanding fractions and decimals as rational numbers",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.INTEGERS"]
  },
  {
    code: "ALG1.FOUND.IRRATIONAL",
    name: "Irrational Numbers",
    description: "Understanding numbers like π and √2",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.RATIONAL"]
  },
  {
    code: "ALG1.FOUND.COMM_PROP",
    name: "Commutative Property",
    description: "Understanding a + b = b + a and ab = ba",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.FOUND.ASSOC_PROP",
    name: "Associative Property",
    description: "Understanding (a + b) + c = a + (b + c)",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.FOUND.DIST_PROP",
    name: "Distributive Property",
    description: "Understanding a(b + c) = ab + ac",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.COMM_PROP"]
  },
  {
    code: "ALG1.FOUND.IDENTITY",
    name: "Identity Property",
    description: "Understanding additive identity (0) and multiplicative identity (1)",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.FOUND.INVERSE",
    name: "Inverse Property",
    description: "Understanding additive and multiplicative inverses",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.IDENTITY"]
  },
  {
    code: "ALG1.FOUND.PEMDAS",
    name: "Order of Operations",
    description: "Applying PEMDAS with nested parentheses",
    domain: "Foundations of Algebra",
    category: "Real Numbers & Properties",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.INTEGERS"]
  },

  // Expressions
  {
    code: "ALG1.FOUND.LIKE_TERMS",
    name: "Combining Like Terms",
    description: "Simplifying expressions by combining like terms",
    domain: "Foundations of Algebra",
    category: "Expressions",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.DIST_PROP"]
  },
  {
    code: "ALG1.FOUND.DIST_EXPR",
    name: "Using Distributive Property",
    description: "Expanding expressions using distributive property",
    domain: "Foundations of Algebra",
    category: "Expressions",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.DIST_PROP"]
  },
  {
    code: "ALG1.FOUND.SUBSTITUTION",
    name: "Substitution into Expressions",
    description: "Evaluating expressions by substituting values",
    domain: "Foundations of Algebra",
    category: "Expressions",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.PEMDAS"]
  },
  {
    code: "ALG1.FOUND.ABS_SUB",
    name: "Substitution with Absolute Value",
    description: "Evaluating expressions with absolute value",
    domain: "Foundations of Algebra",
    category: "Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SUBSTITUTION"]
  },

  // Exponents
  {
    code: "ALG1.FOUND.PROD_POWERS",
    name: "Product of Powers",
    description: "Understanding x^a · x^b = x^(a+b)",
    domain: "Foundations of Algebra",
    category: "Exponents",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "ALG1.FOUND.QUOT_POWERS",
    name: "Quotient of Powers",
    description: "Understanding x^a / x^b = x^(a-b)",
    domain: "Foundations of Algebra",
    category: "Exponents",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.PROD_POWERS"]
  },
  {
    code: "ALG1.FOUND.POWER_POWER",
    name: "Power of a Power",
    description: "Understanding (x^a)^b = x^(ab)",
    domain: "Foundations of Algebra",
    category: "Exponents",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.PROD_POWERS"]
  },
  {
    code: "ALG1.FOUND.ZERO_EXP",
    name: "Zero Exponent",
    description: "Understanding x^0 = 1 for x ≠ 0",
    domain: "Foundations of Algebra",
    category: "Exponents",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.QUOT_POWERS"]
  },
  {
    code: "ALG1.FOUND.NEG_EXP",
    name: "Negative Exponent",
    description: "Understanding x^(-n) = 1/x^n",
    domain: "Foundations of Algebra",
    category: "Exponents",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.ZERO_EXP"]
  },

  // Radicals & Roots
  {
    code: "ALG1.FOUND.SQUARE_ROOT",
    name: "Square Roots",
    description: "Finding square roots of perfect and non-perfect squares",
    domain: "Foundations of Algebra",
    category: "Radicals & Roots",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.RATIONAL"]
  },
  {
    code: "ALG1.FOUND.CUBE_ROOT",
    name: "Cube Roots",
    description: "Finding cube roots of perfect cubes",
    domain: "Foundations of Algebra",
    category: "Radicals & Roots",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SQUARE_ROOT"]
  },
  {
    code: "ALG1.FOUND.SIMP_RAD",
    name: "Simplifying Radicals",
    description: "Simplifying radicals using prime factorization",
    domain: "Foundations of Algebra",
    category: "Radicals & Roots",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SQUARE_ROOT"]
  },
  {
    code: "ALG1.FOUND.ADD_RAD",
    name: "Adding/Subtracting Radicals",
    description: "Combining like radicals",
    domain: "Foundations of Algebra",
    category: "Radicals & Roots",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SIMP_RAD"]
  },
  {
    code: "ALG1.FOUND.MULT_RAD",
    name: "Multiplying/Dividing Radicals",
    description: "Operations with radicals",
    domain: "Foundations of Algebra",
    category: "Radicals & Roots",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SIMP_RAD"]
  },

  // =====================================
  // 2. EQUATIONS & INEQUALITIES
  // =====================================

  // Linear Equations
  {
    code: "ALG1.EQ.ONE_STEP",
    name: "One-Step Equations",
    description: "Solving equations with one operation",
    domain: "Equations & Inequalities",
    category: "Linear Equations",
    difficulty: 1,
    prerequisites: ["ALG1.FOUND.INVERSE"]
  },
  {
    code: "ALG1.EQ.TWO_STEP",
    name: "Two-Step Equations",
    description: "Solving equations with two operations",
    domain: "Equations & Inequalities",
    category: "Linear Equations",
    difficulty: 2,
    prerequisites: ["ALG1.EQ.ONE_STEP"]
  },
  {
    code: "ALG1.EQ.MULTI_STEP",
    name: "Multi-Step Equations",
    description: "Solving equations with variables on both sides",
    domain: "Equations & Inequalities",
    category: "Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.TWO_STEP", "ALG1.FOUND.LIKE_TERMS", "ALG1.FOUND.DIST_EXPR"]
  },
  {
    code: "ALG1.EQ.FRACTIONS",
    name: "Equations with Fractions",
    description: "Clearing denominators and solving",
    domain: "Equations & Inequalities",
    category: "Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.MULTI_STEP", "ALG1.FOUND.RATIONAL"]
  },
  {
    code: "ALG1.EQ.LITERAL",
    name: "Literal Equations",
    description: "Solving for a specific variable",
    domain: "Equations & Inequalities",
    category: "Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.MULTI_STEP"]
  },

  // Absolute Value Equations
  {
    code: "ALG1.EQ.ABS_DEF",
    name: "Definition of Absolute Value",
    description: "Understanding |x| as distance from zero",
    domain: "Equations & Inequalities",
    category: "Absolute Value Equations",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.INTEGERS"]
  },
  {
    code: "ALG1.EQ.ABS_SPLIT",
    name: "Splitting into Cases",
    description: "Solving |x| = a by splitting cases",
    domain: "Equations & Inequalities",
    category: "Absolute Value Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.ABS_DEF", "ALG1.EQ.TWO_STEP"]
  },
  {
    code: "ALG1.EQ.ABS_CHECK",
    name: "Checking Extraneous Solutions",
    description: "Verifying solutions in absolute value equations",
    domain: "Equations & Inequalities",
    category: "Absolute Value Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.ABS_SPLIT"]
  },

  // Inequalities
  {
    code: "ALG1.INEQ.ONE_STEP",
    name: "One-Step Inequalities",
    description: "Solving simple inequalities",
    domain: "Equations & Inequalities",
    category: "Inequalities",
    difficulty: 2,
    prerequisites: ["ALG1.EQ.ONE_STEP"]
  },
  {
    code: "ALG1.INEQ.MULTI_STEP",
    name: "Multi-Step Inequalities",
    description: "Solving complex inequalities",
    domain: "Equations & Inequalities",
    category: "Inequalities",
    difficulty: 3,
    prerequisites: ["ALG1.INEQ.ONE_STEP", "ALG1.EQ.MULTI_STEP"]
  },
  {
    code: "ALG1.INEQ.GRAPH",
    name: "Graphing on Number Line",
    description: "Representing inequality solutions graphically",
    domain: "Equations & Inequalities",
    category: "Inequalities",
    difficulty: 2,
    prerequisites: ["ALG1.INEQ.ONE_STEP"]
  },
  {
    code: "ALG1.INEQ.FLIP",
    name: "Flipping Inequality Sign",
    description: "Understanding when to reverse inequality",
    domain: "Equations & Inequalities",
    category: "Inequalities",
    difficulty: 3,
    prerequisites: ["ALG1.INEQ.ONE_STEP", "ALG1.FOUND.NEG_EXP"]
  },

  // Compound Inequalities
  {
    code: "ALG1.INEQ.AND",
    name: "AND Inequalities",
    description: "Solving and graphing intersection",
    domain: "Equations & Inequalities",
    category: "Compound Inequalities",
    difficulty: 3,
    prerequisites: ["ALG1.INEQ.GRAPH"]
  },
  {
    code: "ALG1.INEQ.OR",
    name: "OR Inequalities",
    description: "Solving and graphing union",
    domain: "Equations & Inequalities",
    category: "Compound Inequalities",
    difficulty: 3,
    prerequisites: ["ALG1.INEQ.GRAPH"]
  },
  {
    code: "ALG1.INEQ.COMPOUND_GRAPH",
    name: "Graphing Combined Sets",
    description: "Representing compound inequalities",
    domain: "Equations & Inequalities",
    category: "Compound Inequalities",
    difficulty: 3,
    prerequisites: ["ALG1.INEQ.AND", "ALG1.INEQ.OR"]
  },

  // Absolute Value Inequalities
  {
    code: "ALG1.INEQ.ABS_LESS",
    name: "Absolute Value < a",
    description: "Solving |x| < a as AND inequality",
    domain: "Equations & Inequalities",
    category: "Absolute Value Inequalities",
    difficulty: 4,
    prerequisites: ["ALG1.EQ.ABS_SPLIT", "ALG1.INEQ.AND"]
  },
  {
    code: "ALG1.INEQ.ABS_GREATER",
    name: "Absolute Value > a",
    description: "Solving |x| > a as OR inequality",
    domain: "Equations & Inequalities",
    category: "Absolute Value Inequalities",
    difficulty: 4,
    prerequisites: ["ALG1.EQ.ABS_SPLIT", "ALG1.INEQ.OR"]
  },

  // =====================================
  // 3. FUNCTIONS
  // =====================================

  {
    code: "ALG1.FUNC.DEFINITION",
    name: "Definition of Function",
    description: "Understanding functions as input-output relationships",
    domain: "Functions",
    category: "Basics",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "ALG1.FUNC.NOTATION",
    name: "Function Notation",
    description: "Understanding and using f(x) notation",
    domain: "Functions",
    category: "Basics",
    difficulty: 2,
    prerequisites: ["ALG1.FUNC.DEFINITION"]
  },
  {
    code: "ALG1.FUNC.DOMAIN",
    name: "Domain",
    description: "Finding the domain of functions",
    domain: "Functions",
    category: "Basics",
    difficulty: 3,
    prerequisites: ["ALG1.FUNC.DEFINITION"]
  },
  {
    code: "ALG1.FUNC.RANGE",
    name: "Range",
    description: "Finding the range of functions",
    domain: "Functions",
    category: "Basics",
    difficulty: 3,
    prerequisites: ["ALG1.FUNC.DEFINITION"]
  },
  {
    code: "ALG1.FUNC.EVALUATE",
    name: "Evaluating Functions",
    description: "Finding f(a) for given values",
    domain: "Functions",
    category: "Basics",
    difficulty: 2,
    prerequisites: ["ALG1.FUNC.NOTATION", "ALG1.FOUND.SUBSTITUTION"]
  },

  // =====================================
  // 4. LINEAR FUNCTIONS
  // =====================================

  // Graphing
  {
    code: "ALG1.LINEAR.SLOPE",
    name: "Slope",
    description: "Finding and interpreting slope",
    domain: "Linear Functions",
    category: "Graphing",
    difficulty: 2,
    prerequisites: ["ALG1.FUNC.DEFINITION"]
  },
  {
    code: "ALG1.LINEAR.INTERCEPTS",
    name: "Intercepts",
    description: "Finding x- and y-intercepts",
    domain: "Linear Functions",
    category: "Graphing",
    difficulty: 2,
    prerequisites: ["ALG1.EQ.TWO_STEP"]
  },
  {
    code: "ALG1.LINEAR.SLOPE_INT",
    name: "Slope-Intercept Form",
    description: "Graphing from y = mx + b",
    domain: "Linear Functions",
    category: "Graphing",
    difficulty: 2,
    prerequisites: ["ALG1.LINEAR.SLOPE", "ALG1.LINEAR.INTERCEPTS"]
  },
  {
    code: "ALG1.LINEAR.STANDARD",
    name: "Standard Form",
    description: "Graphing from Ax + By = C",
    domain: "Linear Functions",
    category: "Graphing",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.INTERCEPTS"]
  },
  {
    code: "ALG1.LINEAR.POINT_SLOPE",
    name: "Point-Slope Form",
    description: "Using y - y₁ = m(x - x₁)",
    domain: "Linear Functions",
    category: "Graphing",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.SLOPE"]
  },

  // Writing Equations
  {
    code: "ALG1.LINEAR.WRITE_SLOPE_INT",
    name: "From Slope & Intercept",
    description: "Writing equation given m and b",
    domain: "Linear Functions",
    category: "Writing Equations",
    difficulty: 2,
    prerequisites: ["ALG1.LINEAR.SLOPE_INT"]
  },
  {
    code: "ALG1.LINEAR.WRITE_SLOPE_POINT",
    name: "From Slope & Point",
    description: "Writing equation given m and (x₁, y₁)",
    domain: "Linear Functions",
    category: "Writing Equations",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.POINT_SLOPE"]
  },
  {
    code: "ALG1.LINEAR.WRITE_TWO_POINTS",
    name: "From Two Points",
    description: "Writing equation given two points",
    domain: "Linear Functions",
    category: "Writing Equations",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.SLOPE", "ALG1.LINEAR.WRITE_SLOPE_POINT"]
  },

  // Parallel & Perpendicular
  {
    code: "ALG1.LINEAR.PARALLEL",
    name: "Parallel Lines",
    description: "Understanding parallel slopes",
    domain: "Linear Functions",
    category: "Parallel & Perpendicular",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.SLOPE"]
  },
  {
    code: "ALG1.LINEAR.PERPENDICULAR",
    name: "Perpendicular Lines",
    description: "Understanding perpendicular slopes",
    domain: "Linear Functions",
    category: "Parallel & Perpendicular",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.SLOPE", "ALG1.FOUND.NEG_EXP"]
  },

  // =====================================
  // 5. SYSTEMS OF EQUATIONS & INEQUALITIES
  // =====================================

  {
    code: "ALG1.SYSTEMS.GRAPH",
    name: "Solving by Graphing",
    description: "Finding intersection of lines",
    domain: "Systems of Equations & Inequalities",
    category: "Systems of Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.LINEAR.SLOPE_INT"]
  },
  {
    code: "ALG1.SYSTEMS.SUBSTITUTION",
    name: "Solving by Substitution",
    description: "Using substitution method",
    domain: "Systems of Equations & Inequalities",
    category: "Systems of Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.MULTI_STEP", "ALG1.FOUND.SUBSTITUTION"]
  },
  {
    code: "ALG1.SYSTEMS.ELIMINATION",
    name: "Solving by Elimination",
    description: "Using elimination/addition method",
    domain: "Systems of Equations & Inequalities",
    category: "Systems of Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.EQ.MULTI_STEP"]
  },
  {
    code: "ALG1.SYSTEMS.SOLUTIONS",
    name: "Identifying Solutions",
    description: "One, none, or infinite solutions",
    domain: "Systems of Equations & Inequalities",
    category: "Systems of Linear Equations",
    difficulty: 3,
    prerequisites: ["ALG1.SYSTEMS.GRAPH"]
  },
  {
    code: "ALG1.SYSTEMS.INEQ_GRAPH",
    name: "Graphing System Inequalities",
    description: "Finding feasible regions",
    domain: "Systems of Equations & Inequalities",
    category: "Systems of Inequalities",
    difficulty: 4,
    prerequisites: ["ALG1.LINEAR.SLOPE_INT", "ALG1.INEQ.GRAPH"]
  },

  // =====================================
  // 6. POLYNOMIALS
  // =====================================

  // Operations
  {
    code: "ALG1.POLY.ADD",
    name: "Adding Polynomials",
    description: "Adding polynomial expressions",
    domain: "Polynomials",
    category: "Operations",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.LIKE_TERMS"]
  },
  {
    code: "ALG1.POLY.SUBTRACT",
    name: "Subtracting Polynomials",
    description: "Subtracting polynomial expressions",
    domain: "Polynomials",
    category: "Operations",
    difficulty: 2,
    prerequisites: ["ALG1.POLY.ADD"]
  },
  {
    code: "ALG1.POLY.MULTIPLY",
    name: "Multiplying Polynomials",
    description: "Using distributive property and FOIL",
    domain: "Polynomials",
    category: "Operations",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.DIST_EXPR"]
  },
  {
    code: "ALG1.POLY.SPECIAL",
    name: "Special Products",
    description: "(a+b)², (a-b)², a²-b²",
    domain: "Polynomials",
    category: "Operations",
    difficulty: 3,
    prerequisites: ["ALG1.POLY.MULTIPLY"]
  },

  // Factoring
  {
    code: "ALG1.POLY.GCF",
    name: "Greatest Common Factor",
    description: "Factoring out the GCF",
    domain: "Polynomials",
    category: "Factoring",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.INTEGERS"]
  },
  {
    code: "ALG1.POLY.FACTOR_TRINOMIAL",
    name: "Factoring Trinomials",
    description: "Factoring x² + bx + c",
    domain: "Polynomials",
    category: "Factoring",
    difficulty: 3,
    prerequisites: ["ALG1.POLY.MULTIPLY", "ALG1.POLY.GCF"]
  },
  {
    code: "ALG1.POLY.DIFF_SQUARES",
    name: "Difference of Squares",
    description: "Factoring a² - b²",
    domain: "Polynomials",
    category: "Factoring",
    difficulty: 3,
    prerequisites: ["ALG1.POLY.SPECIAL"]
  },
  {
    code: "ALG1.POLY.GROUPING",
    name: "Factoring by Grouping",
    description: "Factoring with four terms",
    domain: "Polynomials",
    category: "Factoring",
    difficulty: 4,
    prerequisites: ["ALG1.POLY.GCF"]
  },

  // =====================================
  // 7. QUADRATIC FUNCTIONS
  // =====================================

  // Graphing
  {
    code: "ALG1.QUAD.VERTEX",
    name: "Vertex",
    description: "Finding vertex of parabola",
    domain: "Quadratic Functions",
    category: "Graphing",
    difficulty: 3,
    prerequisites: ["ALG1.FUNC.DEFINITION"]
  },
  {
    code: "ALG1.QUAD.AXIS",
    name: "Axis of Symmetry",
    description: "Finding x = -b/2a",
    domain: "Quadratic Functions",
    category: "Graphing",
    difficulty: 3,
    prerequisites: ["ALG1.QUAD.VERTEX"]
  },
  {
    code: "ALG1.QUAD.DIRECTION",
    name: "Direction of Opening",
    description: "Up or down based on a",
    domain: "Quadratic Functions",
    category: "Graphing",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "ALG1.QUAD.STANDARD_GRAPH",
    name: "Graph from Standard Form",
    description: "Graphing y = ax² + bx + c",
    domain: "Quadratic Functions",
    category: "Graphing",
    difficulty: 3,
    prerequisites: ["ALG1.QUAD.VERTEX", "ALG1.QUAD.AXIS"]
  },
  {
    code: "ALG1.QUAD.VERTEX_FORM",
    name: "Vertex Form",
    description: "Working with y = a(x-h)² + k",
    domain: "Quadratic Functions",
    category: "Forms",
    difficulty: 4,
    prerequisites: ["ALG1.QUAD.VERTEX"]
  },

  // Solving
  {
    code: "ALG1.QUAD.ZERO_PRODUCT",
    name: "Zero Product Property",
    description: "If ab = 0, then a = 0 or b = 0",
    domain: "Quadratic Functions",
    category: "Solving",
    difficulty: 2,
    prerequisites: ["ALG1.POLY.FACTOR_TRINOMIAL"]
  },
  {
    code: "ALG1.QUAD.SOLVE_FACTOR",
    name: "Solving by Factoring",
    description: "Using factoring to find roots",
    domain: "Quadratic Functions",
    category: "Solving",
    difficulty: 3,
    prerequisites: ["ALG1.POLY.FACTOR_TRINOMIAL", "ALG1.QUAD.ZERO_PRODUCT"]
  },
  {
    code: "ALG1.QUAD.COMPLETE_SQUARE",
    name: "Completing the Square",
    description: "Converting to vertex form",
    domain: "Quadratic Functions",
    category: "Solving",
    difficulty: 4,
    prerequisites: ["ALG1.QUAD.VERTEX_FORM", "ALG1.POLY.SPECIAL"]
  },
  {
    code: "ALG1.QUAD.FORMULA",
    name: "Quadratic Formula",
    description: "Using x = (-b ± √(b²-4ac))/2a",
    domain: "Quadratic Functions",
    category: "Solving",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SQUARE_ROOT"]
  },
  {
    code: "ALG1.QUAD.DISCRIMINANT",
    name: "Discriminant",
    description: "Using b²-4ac to determine solutions",
    domain: "Quadratic Functions",
    category: "Solving",
    difficulty: 3,
    prerequisites: ["ALG1.QUAD.FORMULA"]
  },

  // =====================================
  // 8. RADICAL & RATIONAL EXPRESSIONS
  // =====================================

  // Radical Expressions
  {
    code: "ALG1.RAD.SIMPLIFY",
    name: "Simplifying Radicals",
    description: "Simplifying radical expressions",
    domain: "Radical & Rational Expressions",
    category: "Radical Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.SIMP_RAD"]
  },
  {
    code: "ALG1.RAD.OPERATIONS",
    name: "Radical Operations",
    description: "Adding, subtracting, multiplying radicals",
    domain: "Radical & Rational Expressions",
    category: "Radical Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.RAD.SIMPLIFY", "ALG1.FOUND.ADD_RAD", "ALG1.FOUND.MULT_RAD"]
  },
  {
    code: "ALG1.RAD.RATIONALIZE",
    name: "Rationalizing Denominators",
    description: "Removing radicals from denominators",
    domain: "Radical & Rational Expressions",
    category: "Radical Expressions",
    difficulty: 4,
    prerequisites: ["ALG1.RAD.OPERATIONS"]
  },

  // Rational Expressions
  {
    code: "ALG1.RAT.SIMPLIFY",
    name: "Simplifying Rational Expressions",
    description: "Reducing rational expressions",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.POLY.FACTOR_TRINOMIAL"]
  },
  {
    code: "ALG1.RAT.DOMAIN",
    name: "Domain Restrictions",
    description: "Finding values that make denominator zero",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.RAT.SIMPLIFY", "ALG1.FUNC.DOMAIN"]
  },
  {
    code: "ALG1.RAT.MULTIPLY_DIVIDE",
    name: "Multiplying/Dividing Rationals",
    description: "Operations with rational expressions",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 3,
    prerequisites: ["ALG1.RAT.SIMPLIFY"]
  },
  {
    code: "ALG1.RAT.ADD_SUBTRACT",
    name: "Adding/Subtracting Rationals",
    description: "Finding LCD and combining",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 4,
    prerequisites: ["ALG1.RAT.SIMPLIFY", "ALG1.POLY.FACTOR_TRINOMIAL"]
  },
  {
    code: "ALG1.RAT.COMPLEX",
    name: "Complex Fractions",
    description: "Simplifying fractions within fractions",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 4,
    prerequisites: ["ALG1.RAT.ADD_SUBTRACT"]
  },
  {
    code: "ALG1.RAT.SOLVE",
    name: "Solving Rational Equations",
    description: "Cross multiplication and LCD methods",
    domain: "Radical & Rational Expressions",
    category: "Rational Expressions",
    difficulty: 4,
    prerequisites: ["ALG1.RAT.ADD_SUBTRACT", "ALG1.EQ.FRACTIONS"]
  },

  // =====================================
  // 9. EXPONENTIAL FUNCTIONS
  // =====================================

  {
    code: "ALG1.EXP.LAWS",
    name: "Laws of Exponents",
    description: "All exponent rules",
    domain: "Exponential Functions",
    category: "Exponents Review",
    difficulty: 3,
    prerequisites: ["ALG1.FOUND.PROD_POWERS", "ALG1.FOUND.QUOT_POWERS", "ALG1.FOUND.POWER_POWER"]
  },
  {
    code: "ALG1.EXP.SCIENTIFIC",
    name: "Scientific Notation",
    description: "Writing and computing with scientific notation",
    domain: "Exponential Functions",
    category: "Exponents Review",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.NEG_EXP"]
  },
  {
    code: "ALG1.EXP.DEFINITION",
    name: "Exponential Functions",
    description: "Understanding f(x) = a·b^x",
    domain: "Exponential Functions",
    category: "Exponential Functions",
    difficulty: 3,
    prerequisites: ["ALG1.FUNC.DEFINITION", "ALG1.EXP.LAWS"]
  },
  {
    code: "ALG1.EXP.GROWTH",
    name: "Exponential Growth",
    description: "Modeling growth with b > 1",
    domain: "Exponential Functions",
    category: "Exponential Functions",
    difficulty: 3,
    prerequisites: ["ALG1.EXP.DEFINITION"]
  },
  {
    code: "ALG1.EXP.DECAY",
    name: "Exponential Decay",
    description: "Modeling decay with 0 < b < 1",
    domain: "Exponential Functions",
    category: "Exponential Functions",
    difficulty: 3,
    prerequisites: ["ALG1.EXP.DEFINITION"]
  },
  {
    code: "ALG1.EXP.GRAPHS",
    name: "Graphing Exponentials",
    description: "Graphing exponential functions",
    domain: "Exponential Functions",
    category: "Exponential Functions",
    difficulty: 3,
    prerequisites: ["ALG1.EXP.GROWTH", "ALG1.EXP.DECAY"]
  },

  // =====================================
  // 10. STATISTICS & PROBABILITY
  // =====================================

  // Data Analysis
  {
    code: "ALG1.STAT.MEAN",
    name: "Mean",
    description: "Calculating average",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 1,
    prerequisites: ["ALG1.FOUND.RATIONAL"]
  },
  {
    code: "ALG1.STAT.MEDIAN",
    name: "Median",
    description: "Finding middle value",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.STAT.MODE",
    name: "Mode",
    description: "Finding most frequent value",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.STAT.RANGE",
    name: "Range",
    description: "Finding max - min",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "ALG1.STAT.IQR",
    name: "Interquartile Range",
    description: "Finding Q3 - Q1",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 2,
    prerequisites: ["ALG1.STAT.MEDIAN"]
  },
  {
    code: "ALG1.STAT.STDEV",
    name: "Standard Deviation",
    description: "Intro to standard deviation",
    domain: "Statistics & Probability",
    category: "Data Analysis",
    difficulty: 3,
    prerequisites: ["ALG1.STAT.MEAN", "ALG1.FOUND.SQUARE_ROOT"]
  },

  // Representations
  {
    code: "ALG1.STAT.BOX_PLOT",
    name: "Box Plots",
    description: "Creating and interpreting box plots",
    domain: "Statistics & Probability",
    category: "Representations",
    difficulty: 2,
    prerequisites: ["ALG1.STAT.MEDIAN", "ALG1.STAT.IQR"]
  },
  {
    code: "ALG1.STAT.SCATTER",
    name: "Scatterplots",
    description: "Creating and interpreting scatterplots",
    domain: "Statistics & Probability",
    category: "Representations",
    difficulty: 2,
    prerequisites: []
  },

  // Relationships
  {
    code: "ALG1.STAT.CORRELATION",
    name: "Correlation",
    description: "Positive, negative, or no correlation",
    domain: "Statistics & Probability",
    category: "Relationships",
    difficulty: 2,
    prerequisites: ["ALG1.STAT.SCATTER"]
  },
  {
    code: "ALG1.STAT.BEST_FIT",
    name: "Line of Best Fit",
    description: "Estimating trend lines",
    domain: "Statistics & Probability",
    category: "Relationships",
    difficulty: 3,
    prerequisites: ["ALG1.STAT.CORRELATION", "ALG1.LINEAR.SLOPE_INT"]
  },

  // Probability
  {
    code: "ALG1.PROB.THEORETICAL",
    name: "Theoretical Probability",
    description: "P(E) = favorable/total",
    domain: "Statistics & Probability",
    category: "Probability",
    difficulty: 2,
    prerequisites: ["ALG1.FOUND.RATIONAL"]
  },
  {
    code: "ALG1.PROB.EXPERIMENTAL",
    name: "Experimental Probability",
    description: "Probability from experiments",
    domain: "Statistics & Probability",
    category: "Probability",
    difficulty: 2,
    prerequisites: ["ALG1.PROB.THEORETICAL"]
  },
  {
    code: "ALG1.PROB.COMPOUND",
    name: "Compound Events",
    description: "Independent and dependent events",
    domain: "Statistics & Probability",
    category: "Probability",
    difficulty: 3,
    prerequisites: ["ALG1.PROB.THEORETICAL"]
  },

  // =====================================
  // 11. SEQUENCES
  // =====================================

  // Arithmetic Sequences
  {
    code: "ALG1.SEQ.ARITH_DEF",
    name: "Arithmetic Sequences",
    description: "Understanding sequences with common difference",
    domain: "Sequences",
    category: "Arithmetic Sequences",
    difficulty: 2,
    prerequisites: ["ALG1.LINEAR.SLOPE"]
  },
  {
    code: "ALG1.SEQ.ARITH_DIFF",
    name: "Common Difference",
    description: "Finding d in arithmetic sequences",
    domain: "Sequences",
    category: "Arithmetic Sequences",
    difficulty: 2,
    prerequisites: ["ALG1.SEQ.ARITH_DEF"]
  },
  {
    code: "ALG1.SEQ.ARITH_TERMS",
    name: "Finding Terms",
    description: "Finding nth term in arithmetic sequence",
    domain: "Sequences",
    category: "Arithmetic Sequences",
    difficulty: 2,
    prerequisites: ["ALG1.SEQ.ARITH_DIFF"]
  },
  {
    code: "ALG1.SEQ.ARITH_RECURSIVE",
    name: "Recursive Formula",
    description: "Writing a_n = a_(n-1) + d",
    domain: "Sequences",
    category: "Arithmetic Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.SEQ.ARITH_TERMS"]
  },
  {
    code: "ALG1.SEQ.ARITH_EXPLICIT",
    name: "Explicit Formula",
    description: "Writing a_n = a_1 + (n-1)d",
    domain: "Sequences",
    category: "Arithmetic Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.SEQ.ARITH_TERMS", "ALG1.LINEAR.SLOPE_INT"]
  },

  // Geometric Sequences
  {
    code: "ALG1.SEQ.GEOM_DEF",
    name: "Geometric Sequences",
    description: "Understanding sequences with common ratio",
    domain: "Sequences",
    category: "Geometric Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.EXP.DEFINITION"]
  },
  {
    code: "ALG1.SEQ.GEOM_RATIO",
    name: "Common Ratio",
    description: "Finding r in geometric sequences",
    domain: "Sequences",
    category: "Geometric Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.SEQ.GEOM_DEF"]
  },
  {
    code: "ALG1.SEQ.GEOM_TERMS",
    name: "Finding Terms",
    description: "Finding nth term in geometric sequence",
    domain: "Sequences",
    category: "Geometric Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.SEQ.GEOM_RATIO"]
  },
  {
    code: "ALG1.SEQ.GEOM_RECURSIVE",
    name: "Recursive Formula",
    description: "Writing a_n = a_(n-1) · r",
    domain: "Sequences",
    category: "Geometric Sequences",
    difficulty: 3,
    prerequisites: ["ALG1.SEQ.GEOM_TERMS"]
  },
  {
    code: "ALG1.SEQ.GEOM_EXPLICIT",
    name: "Explicit Formula",
    description: "Writing a_n = a_1 · r^(n-1)",
    domain: "Sequences",
    category: "Geometric Sequences",
    difficulty: 4,
    prerequisites: ["ALG1.SEQ.GEOM_TERMS", "ALG1.EXP.LAWS"]
  }
];

// Helper function to get skills by domain
export function getSkillsByDomain(domain: string): AlgebraSkill[] {
  return algebra1Skills.filter(skill => skill.domain === domain);
}

// Helper function to get prerequisite skills
export function getPrerequisites(skillCode: string): AlgebraSkill[] {
  const skill = algebra1Skills.find(s => s.code === skillCode);
  if (!skill || !skill.prerequisites) return [];

  return skill.prerequisites
    .map(code => algebra1Skills.find(s => s.code === code))
    .filter(Boolean) as AlgebraSkill[];
}

// Helper function to get dependent skills
export function getDependentSkills(skillCode: string): AlgebraSkill[] {
  return algebra1Skills.filter(skill =>
    skill.prerequisites && skill.prerequisites.includes(skillCode)
  );
}

// Get all domains
export function getAllDomains(): string[] {
  return [...new Set(algebra1Skills.map(skill => skill.domain))];
}

// Get all categories in a domain
export function getCategoriesByDomain(domain: string): string[] {
  return [...new Set(
    algebra1Skills
      .filter(skill => skill.domain === domain)
      .map(skill => skill.category)
  )];
}