// Comprehensive Grade 6 Math Skill Hierarchy
// Based on NYS Next Generation Math Standards for Grade 6

export interface Grade6Skill {
  code: string;
  name: string;
  description: string;
  domain: string;
  category: string;
  difficulty: number; // 1-5
  prerequisites?: string[]; // Skill codes that must be mastered first
}

export const grade6Skills: Grade6Skill[] = [
  // =====================================
  // 1. RATIOS AND PROPORTIONAL RELATIONSHIPS (6.RP)
  // =====================================

  // Ratio Concepts
  {
    code: "GR6.RP.RATIO_CONCEPT",
    name: "Ratio Concepts",
    description: "Understanding ratio as a comparison of two quantities",
    domain: "Ratios and Proportional Relationships",
    category: "Ratio Concepts",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.RP.RATIO_LANGUAGE",
    name: "Ratio Language",
    description: "Using ratio language to describe relationships (for every, for each, per)",
    domain: "Ratios and Proportional Relationships",
    category: "Ratio Concepts",
    difficulty: 1,
    prerequisites: ["GR6.RP.RATIO_CONCEPT"]
  },
  {
    code: "GR6.RP.EQUIV_RATIOS",
    name: "Equivalent Ratios",
    description: "Identifying and creating equivalent ratios",
    domain: "Ratios and Proportional Relationships",
    category: "Ratio Concepts",
    difficulty: 2,
    prerequisites: ["GR6.RP.RATIO_CONCEPT"]
  },
  {
    code: "GR6.RP.RATIO_TABLES",
    name: "Ratio Tables",
    description: "Using tables to organize and solve ratio problems",
    domain: "Ratios and Proportional Relationships",
    category: "Ratio Concepts",
    difficulty: 2,
    prerequisites: ["GR6.RP.EQUIV_RATIOS"]
  },

  // Unit Rates
  {
    code: "GR6.RP.UNIT_RATE",
    name: "Unit Rates",
    description: "Finding unit rates (e.g., miles per hour, price per item)",
    domain: "Ratios and Proportional Relationships",
    category: "Unit Rates",
    difficulty: 2,
    prerequisites: ["GR6.RP.RATIO_CONCEPT"]
  },
  {
    code: "GR6.RP.UNIT_PRICE",
    name: "Unit Price",
    description: "Calculating and comparing unit prices",
    domain: "Ratios and Proportional Relationships",
    category: "Unit Rates",
    difficulty: 2,
    prerequisites: ["GR6.RP.UNIT_RATE"]
  },
  {
    code: "GR6.RP.RATE_REASONING",
    name: "Rate Reasoning",
    description: "Using rate reasoning to solve problems",
    domain: "Ratios and Proportional Relationships",
    category: "Unit Rates",
    difficulty: 3,
    prerequisites: ["GR6.RP.UNIT_RATE"]
  },

  // Percent
  {
    code: "GR6.RP.PERCENT_CONCEPT",
    name: "Percent Concepts",
    description: "Understanding percent as a rate per 100",
    domain: "Ratios and Proportional Relationships",
    category: "Percent",
    difficulty: 2,
    prerequisites: ["GR6.RP.RATIO_CONCEPT"]
  },
  {
    code: "GR6.RP.PERCENT_PROBLEMS",
    name: "Percent Problems",
    description: "Solving percent problems (finding part, whole, or percent)",
    domain: "Ratios and Proportional Relationships",
    category: "Percent",
    difficulty: 3,
    prerequisites: ["GR6.RP.PERCENT_CONCEPT"]
  },
  {
    code: "GR6.RP.UNIT_CONVERT",
    name: "Unit Conversion",
    description: "Converting measurement units using ratios",
    domain: "Ratios and Proportional Relationships",
    category: "Unit Rates",
    difficulty: 2,
    prerequisites: ["GR6.RP.UNIT_RATE"]
  },

  // =====================================
  // 2. THE NUMBER SYSTEM (6.NS)
  // =====================================

  // Division
  {
    code: "GR6.NS.DIV_FRACTIONS",
    name: "Division of Fractions",
    description: "Dividing fractions by fractions",
    domain: "The Number System",
    category: "Division",
    difficulty: 3,
    prerequisites: []
  },
  {
    code: "GR6.NS.MULTI_DIGIT_DIV",
    name: "Multi-Digit Division",
    description: "Dividing multi-digit numbers using standard algorithm",
    domain: "The Number System",
    category: "Division",
    difficulty: 2,
    prerequisites: []
  },

  // Decimals
  {
    code: "GR6.NS.ADD_DECIMALS",
    name: "Adding Decimals",
    description: "Adding decimal numbers",
    domain: "The Number System",
    category: "Decimal Operations",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.NS.SUB_DECIMALS",
    name: "Subtracting Decimals",
    description: "Subtracting decimal numbers",
    domain: "The Number System",
    category: "Decimal Operations",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.NS.MULT_DECIMALS",
    name: "Multiplying Decimals",
    description: "Multiplying decimal numbers",
    domain: "The Number System",
    category: "Decimal Operations",
    difficulty: 2,
    prerequisites: ["GR6.NS.ADD_DECIMALS"]
  },
  {
    code: "GR6.NS.DIV_DECIMALS",
    name: "Dividing Decimals",
    description: "Dividing decimal numbers",
    domain: "The Number System",
    category: "Decimal Operations",
    difficulty: 3,
    prerequisites: ["GR6.NS.MULT_DECIMALS"]
  },

  // Factors and Multiples
  {
    code: "GR6.NS.FACTORS",
    name: "Factors",
    description: "Finding factors of whole numbers",
    domain: "The Number System",
    category: "Factors and Multiples",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.NS.MULTIPLES",
    name: "Multiples",
    description: "Finding multiples of whole numbers",
    domain: "The Number System",
    category: "Factors and Multiples",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.NS.GCF",
    name: "Greatest Common Factor",
    description: "Finding the GCF of two numbers",
    domain: "The Number System",
    category: "Factors and Multiples",
    difficulty: 2,
    prerequisites: ["GR6.NS.FACTORS"]
  },
  {
    code: "GR6.NS.LCM",
    name: "Least Common Multiple",
    description: "Finding the LCM of two numbers",
    domain: "The Number System",
    category: "Factors and Multiples",
    difficulty: 2,
    prerequisites: ["GR6.NS.MULTIPLES"]
  },

  // Integers and Rational Numbers
  {
    code: "GR6.NS.INTEGERS",
    name: "Integers",
    description: "Understanding positive and negative integers",
    domain: "The Number System",
    category: "Integers and Rational Numbers",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.NS.NUMBER_LINE",
    name: "Number Line",
    description: "Representing rational numbers on a number line",
    domain: "The Number System",
    category: "Integers and Rational Numbers",
    difficulty: 1,
    prerequisites: ["GR6.NS.INTEGERS"]
  },
  {
    code: "GR6.NS.ORDERING",
    name: "Ordering Rational Numbers",
    description: "Ordering and comparing rational numbers",
    domain: "The Number System",
    category: "Integers and Rational Numbers",
    difficulty: 2,
    prerequisites: ["GR6.NS.NUMBER_LINE"]
  },
  {
    code: "GR6.NS.ABSOLUTE_VALUE",
    name: "Absolute Value",
    description: "Understanding and finding absolute value",
    domain: "The Number System",
    category: "Integers and Rational Numbers",
    difficulty: 2,
    prerequisites: ["GR6.NS.INTEGERS"]
  },

  // Coordinate Plane
  {
    code: "GR6.NS.COORD_PLANE",
    name: "Coordinate Plane",
    description: "Plotting points on the coordinate plane",
    domain: "The Number System",
    category: "Coordinate Plane",
    difficulty: 2,
    prerequisites: ["GR6.NS.NUMBER_LINE"]
  },
  {
    code: "GR6.NS.QUADRANTS",
    name: "Quadrants",
    description: "Identifying quadrants and axes on coordinate plane",
    domain: "The Number System",
    category: "Coordinate Plane",
    difficulty: 1,
    prerequisites: ["GR6.NS.COORD_PLANE"]
  },
  {
    code: "GR6.NS.DISTANCE",
    name: "Distance on Coordinate Plane",
    description: "Finding distance between points with same x or y coordinate",
    domain: "The Number System",
    category: "Coordinate Plane",
    difficulty: 3,
    prerequisites: ["GR6.NS.COORD_PLANE", "GR6.NS.ABSOLUTE_VALUE"]
  },

  // =====================================
  // 3. EXPRESSIONS, EQUATIONS, AND INEQUALITIES (6.EE)
  // =====================================

  // Exponents
  {
    code: "GR6.EE.EXPONENTS",
    name: "Exponents",
    description: "Understanding and evaluating expressions with whole-number exponents",
    domain: "Expressions, Equations, and Inequalities",
    category: "Exponents",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.EE.ORDER_OF_OPS",
    name: "Order of Operations",
    description: "Using order of operations with exponents",
    domain: "Expressions, Equations, and Inequalities",
    category: "Exponents",
    difficulty: 2,
    prerequisites: ["GR6.EE.EXPONENTS"]
  },

  // Variable Expressions
  {
    code: "GR6.EE.VARIABLES",
    name: "Variables",
    description: "Understanding variables as unknown quantities",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.EE.WRITE_EXPR",
    name: "Writing Expressions",
    description: "Writing algebraic expressions from verbal descriptions",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 2,
    prerequisites: ["GR6.EE.VARIABLES"]
  },
  {
    code: "GR6.EE.EVALUATE",
    name: "Evaluate Expressions",
    description: "Evaluating expressions for given variable values",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 2,
    prerequisites: ["GR6.EE.VARIABLES"]
  },
  {
    code: "GR6.EE.EQUIV_EXPR",
    name: "Equivalent Expressions",
    description: "Identifying and generating equivalent expressions",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 3,
    prerequisites: ["GR6.EE.WRITE_EXPR"]
  },
  {
    code: "GR6.EE.COMBINE_TERMS",
    name: "Combining Like Terms",
    description: "Combining like terms in algebraic expressions",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 2,
    prerequisites: ["GR6.EE.VARIABLES"]
  },
  {
    code: "GR6.EE.DIST_PROP",
    name: "Distributive Property",
    description: "Applying distributive property to expand expressions",
    domain: "Expressions, Equations, and Inequalities",
    category: "Variable Expressions",
    difficulty: 3,
    prerequisites: ["GR6.EE.VARIABLES"]
  },

  // Equations
  {
    code: "GR6.EE.ONE_VAR_EQ",
    name: "One-Variable Equations",
    description: "Understanding equations as statements of equality",
    domain: "Expressions, Equations, and Inequalities",
    category: "Equations",
    difficulty: 2,
    prerequisites: ["GR6.EE.VARIABLES"]
  },
  {
    code: "GR6.EE.SOLVE_SIMPLE",
    name: "Solving Simple Equations",
    description: "Solving one-step equations (x + 3 = 7)",
    domain: "Expressions, Equations, and Inequalities",
    category: "Equations",
    difficulty: 2,
    prerequisites: ["GR6.EE.ONE_VAR_EQ"]
  },
  {
    code: "GR6.EE.WRITE_EQ",
    name: "Writing Equations",
    description: "Writing equations from word problems",
    domain: "Expressions, Equations, and Inequalities",
    category: "Equations",
    difficulty: 3,
    prerequisites: ["GR6.EE.ONE_VAR_EQ"]
  },

  // Inequalities
  {
    code: "GR6.EE.INEQUALITIES",
    name: "Inequalities",
    description: "Understanding inequality symbols and statements",
    domain: "Expressions, Equations, and Inequalities",
    category: "Inequalities",
    difficulty: 2,
    prerequisites: ["GR6.EE.ONE_VAR_EQ"]
  },
  {
    code: "GR6.EE.GRAPH_INEQ",
    name: "Graphing Inequalities",
    description: "Graphing inequalities on a number line",
    domain: "Expressions, Equations, and Inequalities",
    category: "Inequalities",
    difficulty: 2,
    prerequisites: ["GR6.EE.INEQUALITIES"]
  },
  {
    code: "GR6.EE.WRITE_INEQ",
    name: "Writing Inequalities",
    description: "Writing inequalities from word problems",
    domain: "Expressions, Equations, and Inequalities",
    category: "Inequalities",
    difficulty: 3,
    prerequisites: ["GR6.EE.INEQUALITIES"]
  },

  // Two Variables
  {
    code: "GR6.EE.TWO_VAR",
    name: "Two-Variable Relationships",
    description: "Understanding relationships between two variables",
    domain: "Expressions, Equations, and Inequalities",
    category: "Two Variables",
    difficulty: 3,
    prerequisites: ["GR6.EE.VARIABLES"]
  },
  {
    code: "GR6.EE.GRAPH_TWO_VAR",
    name: "Graphing Two Variables",
    description: "Graphing points that satisfy a two-variable equation",
    domain: "Expressions, Equations, and Inequalities",
    category: "Two Variables",
    difficulty: 3,
    prerequisites: ["GR6.EE.TWO_VAR", "GR6.NS.COORD_PLANE"]
  },

  // =====================================
  // 4. GEOMETRY (6.G)
  // =====================================

  // Area
  {
    code: "GR6.G.AREA_TRIANGLE",
    name: "Area of Triangles",
    description: "Finding area of triangles using formula A = 1/2 bh",
    domain: "Geometry",
    category: "Area",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.G.AREA_QUAD",
    name: "Area of Quadrilaterals",
    description: "Finding area of parallelograms, trapezoids, and other quadrilaterals",
    domain: "Geometry",
    category: "Area",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.G.AREA_COMPOSITE",
    name: "Area of Composite Figures",
    description: "Finding area of compound shapes by decomposing",
    domain: "Geometry",
    category: "Area",
    difficulty: 3,
    prerequisites: ["GR6.G.AREA_TRIANGLE", "GR6.G.AREA_QUAD"]
  },
  {
    code: "GR6.G.POLYGONS_COORD",
    name: "Polygons on Coordinate Plane",
    description: "Drawing and analyzing polygons on the coordinate plane",
    domain: "Geometry",
    category: "Area",
    difficulty: 3,
    prerequisites: ["GR6.NS.COORD_PLANE"]
  },

  // Volume and Surface Area
  {
    code: "GR6.G.VOLUME_RECT",
    name: "Volume of Rectangular Prisms",
    description: "Finding volume using V = lwh with fractional dimensions",
    domain: "Geometry",
    category: "Volume and Surface Area",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.G.NETS",
    name: "Nets of 3D Figures",
    description: "Understanding nets of three-dimensional figures",
    domain: "Geometry",
    category: "Volume and Surface Area",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.G.SURFACE_AREA",
    name: "Surface Area",
    description: "Finding surface area of rectangular prisms and other polyhedra",
    domain: "Geometry",
    category: "Volume and Surface Area",
    difficulty: 3,
    prerequisites: ["GR6.G.NETS"]
  },

  // =====================================
  // 5. STATISTICS AND PROBABILITY (6.SP)
  // =====================================

  // Statistical Questions
  {
    code: "GR6.SP.STAT_QUESTIONS",
    name: "Statistical Questions",
    description: "Recognizing and formulating statistical questions",
    domain: "Statistics and Probability",
    category: "Statistical Questions",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.SP.VARIABILITY",
    name: "Variability in Data",
    description: "Understanding variability and distribution in data",
    domain: "Statistics and Probability",
    category: "Statistical Questions",
    difficulty: 2,
    prerequisites: ["GR6.SP.STAT_QUESTIONS"]
  },

  // Data Displays
  {
    code: "GR6.SP.LINE_PLOTS",
    name: "Line Plots",
    description: "Creating and interpreting line plots",
    domain: "Statistics and Probability",
    category: "Data Displays",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.SP.HISTOGRAMS",
    name: "Histograms",
    description: "Creating and interpreting histograms",
    domain: "Statistics and Probability",
    category: "Data Displays",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.SP.BOX_PLOTS",
    name: "Box Plots",
    description: "Creating and interpreting box plots",
    domain: "Statistics and Probability",
    category: "Data Displays",
    difficulty: 3,
    prerequisites: ["GR6.SP.MEDIAN"]
  },

  // Measures of Center and Spread
  {
    code: "GR6.SP.MEAN",
    name: "Mean",
    description: "Calculating and interpreting the mean (average)",
    domain: "Statistics and Probability",
    category: "Measures of Center",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.SP.MEDIAN",
    name: "Median",
    description: "Finding and interpreting the median",
    domain: "Statistics and Probability",
    category: "Measures of Center",
    difficulty: 2,
    prerequisites: []
  },
  {
    code: "GR6.SP.MODE",
    name: "Mode",
    description: "Finding and interpreting the mode",
    domain: "Statistics and Probability",
    category: "Measures of Center",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.SP.RANGE",
    name: "Range",
    description: "Finding the range of a data set",
    domain: "Statistics and Probability",
    category: "Measures of Spread",
    difficulty: 1,
    prerequisites: []
  },
  {
    code: "GR6.SP.IQR",
    name: "Interquartile Range",
    description: "Finding and interpreting the IQR",
    domain: "Statistics and Probability",
    category: "Measures of Spread",
    difficulty: 3,
    prerequisites: ["GR6.SP.MEDIAN"]
  },
];

// Helper function to get skills by domain
export function getGrade6SkillsByDomain(domain: string): Grade6Skill[] {
  return grade6Skills.filter(skill => skill.domain === domain);
}

// Helper function to get all domains
export function getGrade6Domains(): string[] {
  return Array.from(new Set(grade6Skills.map(skill => skill.domain)));
}
