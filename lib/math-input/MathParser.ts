// Smart Math Parser for flexible answer acceptance
// Handles various formats and common variations

import * as math from 'mathjs';

export interface ParseResult {
  isValid: boolean;
  normalized: string;
  latex?: string;
  value?: number | string;
  type: 'number' | 'expression' | 'equation' | 'fraction' | 'invalid';
  suggestions?: string[];
}

export class MathParser {
  /**
   * Parse and normalize a math answer, accepting various formats
   */
  static parse(input: string, expectedFormat?: string): ParseResult {
    if (!input || input.trim() === '') {
      return {
        isValid: false,
        normalized: '',
        type: 'invalid',
        suggestions: ['Enter an answer']
      };
    }

    const cleaned = this.cleanInput(input);

    // Try different parsing strategies
    const result = this.tryParsers(cleaned, expectedFormat);

    // Add smart suggestions if invalid
    if (!result.isValid && !result.suggestions) {
      result.suggestions = this.generateSuggestions(cleaned);
    }

    return result;
  }

  /**
   * Clean and standardize input
   */
  private static cleanInput(input: string): string {
    return input
      .trim()
      .replace(/\s+/g, ' ')           // Normalize spaces
      .replace(/×/g, '*')             // Replace multiplication symbols
      .replace(/÷/g, '/')             // Replace division symbols
      .replace(/²/g, '^2')            // Replace superscript 2
      .replace(/³/g, '^3')            // Replace superscript 3
      .replace(/√/g, 'sqrt')          // Replace square root symbol
      .replace(/π/g, 'pi')            // Replace pi symbol
      .replace(/∞/g, 'Infinity')      // Replace infinity symbol
      .replace(/±/g, '+/-')           // Replace plus-minus
      .replace(/≤/g, '<=')            // Replace less than or equal
      .replace(/≥/g, '>=')            // Replace greater than or equal
      .replace(/≠/g, '!=');           // Replace not equal
  }

  /**
   * Try different parsing strategies
   */
  private static tryParsers(input: string, expectedFormat?: string): ParseResult {
    // Try as number first
    const numberResult = this.parseAsNumber(input);
    if (numberResult.isValid) return numberResult;

    // Try as fraction
    const fractionResult = this.parseAsFraction(input);
    if (fractionResult.isValid) return fractionResult;

    // Try as equation (e.g., "x = 5")
    const equationResult = this.parseAsEquation(input);
    if (equationResult.isValid) return equationResult;

    // Try as expression
    const expressionResult = this.parseAsExpression(input);
    if (expressionResult.isValid) return expressionResult;

    // Return the most relevant failed result
    return expectedFormat === 'equation' ? equationResult : numberResult;
  }

  /**
   * Parse as a simple number
   */
  private static parseAsNumber(input: string): ParseResult {
    try {
      // Handle percentage
      if (input.endsWith('%')) {
        const value = parseFloat(input.slice(0, -1)) / 100;
        if (!isNaN(value)) {
          return {
            isValid: true,
            normalized: value.toString(),
            value,
            type: 'number',
            latex: value.toString()
          };
        }
      }

      // Handle decimal numbers
      const value = parseFloat(input);
      if (!isNaN(value)) {
        return {
          isValid: true,
          normalized: value.toString(),
          value,
          type: 'number',
          latex: value.toString()
        };
      }
    } catch (e) {
      // Continue to next parser
    }

    return {
      isValid: false,
      normalized: input,
      type: 'invalid'
    };
  }

  /**
   * Parse as a fraction
   */
  private static parseAsFraction(input: string): ParseResult {
    try {
      // Check for fraction pattern
      const fractionPattern = /^(-?\d+)\s*\/\s*(-?\d+)$/;
      const match = input.match(fractionPattern);

      if (match) {
        const numerator = parseInt(match[1]);
        const denominator = parseInt(match[2]);

        if (denominator !== 0) {
          const value = numerator / denominator;
          const simplified = this.simplifyFraction(numerator, denominator);

          return {
            isValid: true,
            normalized: `${simplified.num}/${simplified.den}`,
            value,
            type: 'fraction',
            latex: `\\frac{${simplified.num}}{${simplified.den}}`
          };
        }
      }

      // Try mixed numbers (e.g., "1 1/2")
      const mixedPattern = /^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/;
      const mixedMatch = input.match(mixedPattern);

      if (mixedMatch) {
        const whole = parseInt(mixedMatch[1]);
        const num = parseInt(mixedMatch[2]);
        const den = parseInt(mixedMatch[3]);

        if (den !== 0) {
          const totalNum = whole * den + (whole < 0 ? -num : num);
          const value = totalNum / den;

          return {
            isValid: true,
            normalized: `${totalNum}/${den}`,
            value,
            type: 'fraction',
            latex: `${whole}\\frac{${num}}{${den}}`
          };
        }
      }
    } catch (e) {
      // Continue
    }

    return {
      isValid: false,
      normalized: input,
      type: 'invalid'
    };
  }

  /**
   * Parse as an equation (e.g., "x = 5")
   */
  private static parseAsEquation(input: string): ParseResult {
    try {
      // Handle common equation patterns
      const patterns = [
        /^([a-zA-Z])\s*=\s*(.+)$/,           // x = 5
        /^([a-zA-Z])\s*:\s*(.+)$/,           // x: 5
        /^(.+)\s*=\s*([a-zA-Z])$/,           // 5 = x
      ];

      for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match) {
          const variable = match[1].length === 1 ? match[1] : match[2];
          const value = match[1].length === 1 ? match[2] : match[1];

          // Parse the value part
          const valueResult = this.parseAsNumber(value) || this.parseAsFraction(value);

          if (valueResult.isValid) {
            return {
              isValid: true,
              normalized: `${variable} = ${valueResult.normalized}`,
              value: valueResult.value,
              type: 'equation',
              latex: `${variable} = ${valueResult.latex || valueResult.normalized}`
            };
          }
        }
      }

      // Handle multiple solutions (e.g., "x = 2 or x = -3")
      const multiPattern = /([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)\s*(?:or|,|and)\s*\1\s*=\s*(-?\d+(?:\.\d+)?)/i;
      const multiMatch = input.match(multiPattern);

      if (multiMatch) {
        const variable = multiMatch[1];
        const val1 = multiMatch[2];
        const val2 = multiMatch[3];

        return {
          isValid: true,
          normalized: `${variable} = ${val1} or ${variable} = ${val2}`,
          value: `${val1}, ${val2}`,
          type: 'equation',
          latex: `${variable} = ${val1} \\text{ or } ${variable} = ${val2}`
        };
      }
    } catch (e) {
      // Continue
    }

    return {
      isValid: false,
      normalized: input,
      type: 'invalid',
      suggestions: ['Try format: x = 5']
    };
  }

  /**
   * Parse as a mathematical expression
   */
  private static parseAsExpression(input: string): ParseResult {
    try {
      // Use mathjs to evaluate expression
      const node = math.parse(input);
      const latex = node.toTex();

      // Try to evaluate if possible
      let value;
      try {
        value = math.evaluate(input);
      } catch (e) {
        // Expression is valid but can't be evaluated (has variables)
      }

      return {
        isValid: true,
        normalized: node.toString(),
        value,
        type: 'expression',
        latex
      };
    } catch (e) {
      return {
        isValid: false,
        normalized: input,
        type: 'invalid'
      };
    }
  }

  /**
   * Simplify a fraction
   */
  private static simplifyFraction(num: number, den: number): { num: number; den: number } {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(num), Math.abs(den));

    return {
      num: num / divisor,
      den: den / divisor
    };
  }

  /**
   * Generate helpful suggestions for invalid input
   */
  private static generateSuggestions(input: string): string[] {
    const suggestions: string[] = [];

    // Check for common mistakes
    if (input.includes('x') && !input.includes('=')) {
      suggestions.push('Did you mean: x = ' + input.replace(/x\s*/, ''));
    }

    if (input.match(/^\d+\s+\d+$/)) {
      const parts = input.split(/\s+/);
      suggestions.push(`Did you mean: ${parts[0]}/${parts[1]} (fraction)?`);
      suggestions.push(`Did you mean: ${parts[0]}.${parts[1]} (decimal)?`);
    }

    if (input.includes('sqrt') && !input.includes('(')) {
      suggestions.push('Use sqrt(number) for square root');
    }

    if (input.includes('^') && !input.match(/\^[\d()]/)) {
      suggestions.push('Use ^ for exponents (e.g., x^2)');
    }

    return suggestions.length > 0 ? suggestions : ['Check your answer format'];
  }

  /**
   * Compare two answers for equivalence
   */
  static areEquivalent(answer1: string, answer2: string): boolean {
    const parsed1 = this.parse(answer1);
    const parsed2 = this.parse(answer2);

    if (!parsed1.isValid || !parsed2.isValid) return false;

    // For numbers and fractions, compare values
    if (parsed1.value !== undefined && parsed2.value !== undefined) {
      if (typeof parsed1.value === 'number' && typeof parsed2.value === 'number') {
        return Math.abs(parsed1.value - parsed2.value) < 0.0001;
      }
      return parsed1.value === parsed2.value;
    }

    // For expressions, compare normalized forms
    return parsed1.normalized === parsed2.normalized;
  }

  /**
   * Format answer for display
   */
  static formatForDisplay(input: string): string {
    const parsed = this.parse(input);
    return parsed.latex || parsed.normalized || input;
  }
}