import { SATQuestion } from '@/types/sat';

/**
 * Percents — Demo Questions
 *
 * Made-up math questions for demo purposes. Not real SAT questions.
 * ~5-7 questions per skill across 18 skills.
 */
export const demoQuestions: SATQuestion[] = [
  // ── Finding a Percent — Easy ──
  { id: 'pq-e1', skillId: 'pct-find-pct-easy', questionText: 'What is 25% of 80?', choices: [{ label: 'A', text: '15' }, { label: 'B', text: '20' }, { label: 'C', text: '25' }, { label: 'D', text: '40' }], correctAnswer: 'B' },
  { id: 'pq-e2', skillId: 'pct-find-pct-easy', questionText: 'What is 10% of 350?', choices: [{ label: 'A', text: '3.5' }, { label: 'B', text: '35' }, { label: 'C', text: '70' }, { label: 'D', text: '350' }], correctAnswer: 'B' },
  { id: 'pq-e3', skillId: 'pct-find-pct-easy', questionText: 'What is 50% of 64?', choices: [{ label: 'A', text: '16' }, { label: 'B', text: '28' }, { label: 'C', text: '32' }, { label: 'D', text: '48' }], correctAnswer: 'C' },
  { id: 'pq-e4', skillId: 'pct-find-pct-easy', questionText: 'What is 75% of 200?', choices: [{ label: 'A', text: '100' }, { label: 'B', text: '125' }, { label: 'C', text: '150' }, { label: 'D', text: '175' }], correctAnswer: 'C' },
  { id: 'pq-e5', skillId: 'pct-find-pct-easy', questionText: 'What is 20% of 45?', choices: [{ label: 'A', text: '5' }, { label: 'B', text: '9' }, { label: 'C', text: '15' }, { label: 'D', text: '22.5' }], correctAnswer: 'B' },
  { id: 'pq-e6', skillId: 'pct-find-pct-easy', questionText: 'A class has 40 students. If 30% are absent, how many are absent?', choices: [{ label: 'A', text: '8' }, { label: 'B', text: '10' }, { label: 'C', text: '12' }, { label: 'D', text: '28' }], correctAnswer: 'C' },
  { id: 'pq-e7', skillId: 'pct-find-pct-easy', questionText: 'What is 5% of 600?', choices: [{ label: 'A', text: '3' }, { label: 'B', text: '12' }, { label: 'C', text: '30' }, { label: 'D', text: '120' }], correctAnswer: 'C' },

  // ── Conversions — Easy ──
  { id: 'pq-cf1', skillId: 'pct-convert-frac-easy', questionText: 'What is $\\frac{3}{4}$ expressed as a percent?', choices: [{ label: 'A', text: '34%' }, { label: 'B', text: '60%' }, { label: 'C', text: '75%' }, { label: 'D', text: '80%' }], correctAnswer: 'C' },
  { id: 'pq-cf2', skillId: 'pct-convert-frac-easy', questionText: 'What is $\\frac{1}{5}$ as a percent?', choices: [{ label: 'A', text: '5%' }, { label: 'B', text: '15%' }, { label: 'C', text: '20%' }, { label: 'D', text: '25%' }], correctAnswer: 'C' },
  { id: 'pq-cf3', skillId: 'pct-convert-frac-easy', questionText: 'What is $\\frac{2}{5}$ as a percent?', choices: [{ label: 'A', text: '20%' }, { label: 'B', text: '25%' }, { label: 'C', text: '40%' }, { label: 'D', text: '45%' }], correctAnswer: 'C' },
  { id: 'pq-cf4', skillId: 'pct-convert-frac-easy', questionText: 'Express $\\frac{1}{8}$ as a percent.', choices: [{ label: 'A', text: '8%' }, { label: 'B', text: '12.5%' }, { label: 'C', text: '15%' }, { label: 'D', text: '18%' }], correctAnswer: 'B' },
  { id: 'pq-cf5', skillId: 'pct-convert-frac-easy', questionText: 'What percent is equivalent to $\\frac{7}{10}$?', choices: [{ label: 'A', text: '17%' }, { label: 'B', text: '35%' }, { label: 'C', text: '70%' }, { label: 'D', text: '71%' }], correctAnswer: 'C' },
  { id: 'pq-cf6', skillId: 'pct-convert-frac-easy', questionText: 'What is $\\frac{1}{3}$ expressed as a percent, rounded to the nearest whole number?', choices: [{ label: 'A', text: '30%' }, { label: 'B', text: '33%' }, { label: 'C', text: '35%' }, { label: 'D', text: '37%' }], correctAnswer: 'B' },

  // ── Finding the Whole — Medium ──
  { id: 'pq-fw1', skillId: 'pct-find-whole-medium', questionText: '15 is 25% of what number?', choices: [{ label: 'A', text: '45' }, { label: 'B', text: '60' }, { label: 'C', text: '75' }, { label: 'D', text: '375' }], correctAnswer: 'B' },
  { id: 'pq-fw2', skillId: 'pct-find-whole-medium', questionText: '42 is 30% of what number?', choices: [{ label: 'A', text: '126' }, { label: 'B', text: '140' }, { label: 'C', text: '1260' }, { label: 'D', text: '14' }], correctAnswer: 'B' },
  { id: 'pq-fw3', skillId: 'pct-find-whole-medium', questionText: 'A student scored 36 points, which was 80% of the total. What was the total?', choices: [{ label: 'A', text: '40' }, { label: 'B', text: '45' }, { label: 'C', text: '48' }, { label: 'D', text: '50' }], correctAnswer: 'B' },
  { id: 'pq-fw4', skillId: 'pct-find-whole-medium', questionText: '18 is 15% of what number?', choices: [{ label: 'A', text: '2.7' }, { label: 'B', text: '27' }, { label: 'C', text: '120' }, { label: 'D', text: '270' }], correctAnswer: 'C' },
  { id: 'pq-fw5', skillId: 'pct-find-whole-medium', questionText: 'A store sold 56 items, which is 70% of its inventory. How many items were in stock?', choices: [{ label: 'A', text: '39' }, { label: 'B', text: '72' }, { label: 'C', text: '80' }, { label: 'D', text: '126' }], correctAnswer: 'C' },
  { id: 'pq-fw6', skillId: 'pct-find-whole-medium', questionText: '9 is 12.5% of what number?', choices: [{ label: 'A', text: '1.125' }, { label: 'B', text: '36' }, { label: 'C', text: '72' }, { label: 'D', text: '112.5' }], correctAnswer: 'C' },

  // ── Decimal-Percent Conversions — Medium ──
  { id: 'pq-dc1', skillId: 'pct-convert-dec-medium', questionText: 'A report states a growth rate of 0.045. What is this as a percent?', choices: [{ label: 'A', text: '0.45%' }, { label: 'B', text: '4.5%' }, { label: 'C', text: '45%' }, { label: 'D', text: '450%' }], correctAnswer: 'B' },
  { id: 'pq-dc2', skillId: 'pct-convert-dec-medium', questionText: 'Express 135% as a decimal.', choices: [{ label: 'A', text: '0.135' }, { label: 'B', text: '1.35' }, { label: 'C', text: '13.5' }, { label: 'D', text: '135.0' }], correctAnswer: 'B' },
  { id: 'pq-dc3', skillId: 'pct-convert-dec-medium', questionText: 'Which decimal is equivalent to $0.8\\%$?', choices: [{ label: 'A', text: '0.8' }, { label: 'B', text: '0.08' }, { label: 'C', text: '0.008' }, { label: 'D', text: '8.0' }], correctAnswer: 'C' },
  { id: 'pq-dc4', skillId: 'pct-convert-dec-medium', questionText: 'Express 2.5 as a percent.', choices: [{ label: 'A', text: '2.5%' }, { label: 'B', text: '25%' }, { label: 'C', text: '250%' }, { label: 'D', text: '0.25%' }], correctAnswer: 'C' },
  { id: 'pq-dc5', skillId: 'pct-convert-dec-medium', questionText: 'A probability is given as 0.003. What percent is this?', choices: [{ label: 'A', text: '0.003%' }, { label: 'B', text: '0.03%' }, { label: 'C', text: '0.3%' }, { label: 'D', text: '3%' }], correctAnswer: 'C' },
  { id: 'pq-dc6', skillId: 'pct-convert-dec-medium', questionText: 'Convert $\\frac{5}{8}$ to a percent.', choices: [{ label: 'A', text: '58%' }, { label: 'B', text: '62.5%' }, { label: 'C', text: '65%' }, { label: 'D', text: '80%' }], correctAnswer: 'B' },

  // ── Reverse Percent — Hard ──
  { id: 'pq-rp1', skillId: 'pct-reverse-pct-hard', questionText: 'What percent of 250 is 37.5?', choices: [{ label: 'A', text: '12%' }, { label: 'B', text: '15%' }, { label: 'C', text: '18%' }, { label: 'D', text: '20%' }], correctAnswer: 'B' },
  { id: 'pq-rp2', skillId: 'pct-reverse-pct-hard', questionText: 'In a school of 1,200 students, 78 play tennis. What percent play tennis?', choices: [{ label: 'A', text: '5.5%' }, { label: 'B', text: '6.0%' }, { label: 'C', text: '6.5%' }, { label: 'D', text: '7.8%' }], correctAnswer: 'C' },
  { id: 'pq-rp3', skillId: 'pct-reverse-pct-hard', questionText: 'A recipe uses 180g of flour out of 720g total. What percent is flour?', choices: [{ label: 'A', text: '18%' }, { label: 'B', text: '20%' }, { label: 'C', text: '25%' }, { label: 'D', text: '30%' }], correctAnswer: 'C' },
  { id: 'pq-rp4', skillId: 'pct-reverse-pct-hard', questionText: '54 out of 360 respondents chose option A. What percent chose A?', choices: [{ label: 'A', text: '12%' }, { label: 'B', text: '15%' }, { label: 'C', text: '18%' }, { label: 'D', text: '54%' }], correctAnswer: 'B' },
  { id: 'pq-rp5', skillId: 'pct-reverse-pct-hard', questionText: 'A student answered 57 out of 76 correctly. What is their score to the nearest percent?', choices: [{ label: 'A', text: '72%' }, { label: 'B', text: '75%' }, { label: 'C', text: '78%' }, { label: 'D', text: '80%' }], correctAnswer: 'B' },

  // ── Multi-Step Conversions — Hard ──
  { id: 'pq-mc1', skillId: 'pct-multi-convert-hard', questionText: 'Express $\\frac{7}{12}$ as a percent, rounded to the nearest tenth.', choices: [{ label: 'A', text: '56.3%' }, { label: 'B', text: '58.3%' }, { label: 'C', text: '60.0%' }, { label: 'D', text: '71.2%' }], correctAnswer: 'B' },
  { id: 'pq-mc2', skillId: 'pct-multi-convert-hard', questionText: 'If $\\frac{2}{3}$ of a number is 84, what is 45% of that number?', choices: [{ label: 'A', text: '37.8' }, { label: 'B', text: '50.4' }, { label: 'C', text: '56.7' }, { label: 'D', text: '63' }], correctAnswer: 'C' },
  { id: 'pq-mc3', skillId: 'pct-multi-convert-hard', questionText: 'Which is greater: $\\frac{5}{7}$ or 72%?', choices: [{ label: 'A', text: '$\\frac{5}{7}$ is greater' }, { label: 'B', text: '72% is greater' }, { label: 'C', text: 'They are equal' }, { label: 'D', text: 'Cannot be determined' }], correctAnswer: 'B' },
  { id: 'pq-mc4', skillId: 'pct-multi-convert-hard', questionText: 'Convert 0.0625 to a fraction in lowest terms, then express as a percent.', choices: [{ label: 'A', text: '$\\frac{1}{16}$ = 6.25%' }, { label: 'B', text: '$\\frac{1}{16}$ = 6.5%' }, { label: 'C', text: '$\\frac{1}{8}$ = 12.5%' }, { label: 'D', text: '$\\frac{5}{8}$ = 62.5%' }], correctAnswer: 'A' },
  { id: 'pq-mc5', skillId: 'pct-multi-convert-hard', questionText: 'Order from least to greatest: 0.38, $\\frac{3}{8}$, 37%.', choices: [{ label: 'A', text: '37%, 0.38, $\\frac{3}{8}$' }, { label: 'B', text: '37%, $\\frac{3}{8}$, 0.38' }, { label: 'C', text: '$\\frac{3}{8}$, 37%, 0.38' }, { label: 'D', text: '0.38, $\\frac{3}{8}$, 37%' }], correctAnswer: 'B' },

  // ── Percent Increase — Easy ──
  { id: 'pq-ie1', skillId: 'pct-increase-easy', questionText: 'A shirt costs $40. If the price increases by 10%, what is the new price?', choices: [{ label: 'A', text: '$4' }, { label: 'B', text: '$36' }, { label: 'C', text: '$44' }, { label: 'D', text: '$50' }], correctAnswer: 'C' },
  { id: 'pq-ie2', skillId: 'pct-increase-easy', questionText: 'A population of 500 grows by 20%. What is the new population?', choices: [{ label: 'A', text: '520' }, { label: 'B', text: '600' }, { label: 'C', text: '700' }, { label: 'D', text: '1000' }], correctAnswer: 'B' },
  { id: 'pq-ie3', skillId: 'pct-increase-easy', questionText: 'A $60 item increases in price by 5%. What is the new price?', choices: [{ label: 'A', text: '$61' }, { label: 'B', text: '$63' }, { label: 'C', text: '$65' }, { label: 'D', text: '$90' }], correctAnswer: 'B' },
  { id: 'pq-ie4', skillId: 'pct-increase-easy', questionText: 'A tank has 200 liters. After adding 25% more, how many liters are there?', choices: [{ label: 'A', text: '225' }, { label: 'B', text: '240' }, { label: 'C', text: '250' }, { label: 'D', text: '275' }], correctAnswer: 'C' },
  { id: 'pq-ie5', skillId: 'pct-increase-easy', questionText: 'A salary of $3,000 increases by 15%. What is the new salary?', choices: [{ label: 'A', text: '$3,150' }, { label: 'B', text: '$3,300' }, { label: 'C', text: '$3,450' }, { label: 'D', text: '$3,500' }], correctAnswer: 'C' },

  // ── Percent Decrease — Easy ──
  { id: 'pq-de1', skillId: 'pct-decrease-easy', questionText: 'A $50 jacket is on sale for 20% off. What is the sale price?', choices: [{ label: 'A', text: '$10' }, { label: 'B', text: '$30' }, { label: 'C', text: '$40' }, { label: 'D', text: '$45' }], correctAnswer: 'C' },
  { id: 'pq-de2', skillId: 'pct-decrease-easy', questionText: 'A town of 800 people loses 10% of its population. How many remain?', choices: [{ label: 'A', text: '700' }, { label: 'B', text: '720' }, { label: 'C', text: '780' }, { label: 'D', text: '790' }], correctAnswer: 'B' },
  { id: 'pq-de3', skillId: 'pct-decrease-easy', questionText: 'A $120 item is reduced by 25%. What is the new price?', choices: [{ label: 'A', text: '$30' }, { label: 'B', text: '$80' }, { label: 'C', text: '$90' }, { label: 'D', text: '$95' }], correctAnswer: 'C' },
  { id: 'pq-de4', skillId: 'pct-decrease-easy', questionText: 'A tank holds 400 gallons. If 15% leaks out, how much remains?', choices: [{ label: 'A', text: '340' }, { label: 'B', text: '360' }, { label: 'C', text: '380' }, { label: 'D', text: '385' }], correctAnswer: 'A' },
  { id: 'pq-de5', skillId: 'pct-decrease-easy', questionText: 'A $200 phone depreciates by 30%. What is it worth now?', choices: [{ label: 'A', text: '$60' }, { label: 'B', text: '$130' }, { label: 'C', text: '$140' }, { label: 'D', text: '$170' }], correctAnswer: 'C' },

  // ── Percent Increase Word Problems — Medium ──
  { id: 'pq-iw1', skillId: 'pct-increase-word-medium', questionText: 'A company had 240 employees last year. Headcount increased by 15%. How many now?', choices: [{ label: 'A', text: '255' }, { label: 'B', text: '264' }, { label: 'C', text: '276' }, { label: 'D', text: '360' }], correctAnswer: 'C' },
  { id: 'pq-iw2', skillId: 'pct-increase-word-medium', questionText: 'A stock price went from $80 to $92. What was the percent increase?', choices: [{ label: 'A', text: '12%' }, { label: 'B', text: '13%' }, { label: 'C', text: '15%' }, { label: 'D', text: '87%' }], correctAnswer: 'C' },
  { id: 'pq-iw3', skillId: 'pct-increase-word-medium', questionText: 'Rent was $1,200 and increased to $1,350. What is the percent increase?', choices: [{ label: 'A', text: '10%' }, { label: 'B', text: '11.1%' }, { label: 'C', text: '12.5%' }, { label: 'D', text: '15%' }], correctAnswer: 'C' },
  { id: 'pq-iw4', skillId: 'pct-increase-word-medium', questionText: 'A website had 5,000 visitors in Jan and 6,500 in Feb. What was the percent increase?', choices: [{ label: 'A', text: '15%' }, { label: 'B', text: '23%' }, { label: 'C', text: '30%' }, { label: 'D', text: '130%' }], correctAnswer: 'C' },
  { id: 'pq-iw5', skillId: 'pct-increase-word-medium', questionText: 'After a 40% increase, a quantity is now 280. What was the original?', choices: [{ label: 'A', text: '112' }, { label: 'B', text: '168' }, { label: 'C', text: '200' }, { label: 'D', text: '392' }], correctAnswer: 'C' },

  // ── Percent Decrease Word Problems — Medium ──
  { id: 'pq-dw1', skillId: 'pct-decrease-word-medium', questionText: 'A car worth $20,000 depreciates by 12% per year. What is it worth after one year?', choices: [{ label: 'A', text: '$2,400' }, { label: 'B', text: '$15,000' }, { label: 'C', text: '$17,600' }, { label: 'D', text: '$18,800' }], correctAnswer: 'C' },
  { id: 'pq-dw2', skillId: 'pct-decrease-word-medium', questionText: 'Sales dropped from 450 to 360 units. What was the percent decrease?', choices: [{ label: 'A', text: '10%' }, { label: 'B', text: '20%' }, { label: 'C', text: '25%' }, { label: 'D', text: '90%' }], correctAnswer: 'B' },
  { id: 'pq-dw3', skillId: 'pct-decrease-word-medium', questionText: 'A lake level dropped from 84 feet to 71.4 feet. What percent decrease?', choices: [{ label: 'A', text: '12%' }, { label: 'B', text: '13%' }, { label: 'C', text: '15%' }, { label: 'D', text: '18%' }], correctAnswer: 'C' },
  { id: 'pq-dw4', skillId: 'pct-decrease-word-medium', questionText: 'After a 35% decrease, a value is now 195. What was the original?', choices: [{ label: 'A', text: '263' }, { label: 'B', text: '300' }, { label: 'C', text: '330' }, { label: 'D', text: '557' }], correctAnswer: 'B' },
  { id: 'pq-dw5', skillId: 'pct-decrease-word-medium', questionText: 'Enrollment fell from 1,600 to 1,280. What was the percent decrease?', choices: [{ label: 'A', text: '15%' }, { label: 'B', text: '20%' }, { label: 'C', text: '25%' }, { label: 'D', text: '80%' }], correctAnswer: 'B' },

  // ── Successive Percent Changes — Hard ──
  { id: 'pq-sc1', skillId: 'pct-successive-change-hard', questionText: 'A price increases by 20%, then decreases by 20%. What is the net percent change?', choices: [{ label: 'A', text: '0%' }, { label: 'B', text: '-2%' }, { label: 'C', text: '-4%' }, { label: 'D', text: '+4%' }], correctAnswer: 'C' },
  { id: 'pq-sc2', skillId: 'pct-successive-change-hard', questionText: 'A stock rises 10% Monday and 10% Tuesday. Total percent increase from original?', choices: [{ label: 'A', text: '20%' }, { label: 'B', text: '21%' }, { label: 'C', text: '22%' }, { label: 'D', text: '110%' }], correctAnswer: 'B' },
  { id: 'pq-sc3', skillId: 'pct-successive-change-hard', questionText: 'A quantity decreases by 10%, then increases by 20%. What is the net change?', choices: [{ label: 'A', text: '+8%' }, { label: 'B', text: '+10%' }, { label: 'C', text: '+12%' }, { label: 'D', text: '+30%' }], correctAnswer: 'A' },
  { id: 'pq-sc4', skillId: 'pct-successive-change-hard', questionText: 'Population grows 50% per decade for two decades. Total percent growth?', choices: [{ label: 'A', text: '100%' }, { label: 'B', text: '115%' }, { label: 'C', text: '125%' }, { label: 'D', text: '150%' }], correctAnswer: 'C' },
  { id: 'pq-sc5', skillId: 'pct-successive-change-hard', questionText: 'A price increases 25%, then is discounted 40%. Net percent change?', choices: [{ label: 'A', text: '-15%' }, { label: 'B', text: '-20%' }, { label: 'C', text: '-25%' }, { label: 'D', text: '+15%' }], correctAnswer: 'C' },

  // ── Finding Original Value — Hard ──
  { id: 'pq-ov1', skillId: 'pct-original-value-hard', questionText: 'After a 20% discount, a laptop costs $680. What was the original price?', choices: [{ label: 'A', text: '$800' }, { label: 'B', text: '$816' }, { label: 'C', text: '$850' }, { label: 'D', text: '$880' }], correctAnswer: 'C' },
  { id: 'pq-ov2', skillId: 'pct-original-value-hard', questionText: 'After a 15% raise, Maria earns $4,600/month. What was her old salary?', choices: [{ label: 'A', text: '$3,910' }, { label: 'B', text: '$4,000' }, { label: 'C', text: '$4,100' }, { label: 'D', text: '$5,290' }], correctAnswer: 'B' },
  { id: 'pq-ov3', skillId: 'pct-original-value-hard', questionText: 'A car lost 35% of its value and is now worth $19,500. Original value?', choices: [{ label: 'A', text: '$26,325' }, { label: 'B', text: '$28,000' }, { label: 'C', text: '$30,000' }, { label: 'D', text: '$55,714' }], correctAnswer: 'C' },
  { id: 'pq-ov4', skillId: 'pct-original-value-hard', questionText: 'After 12% tax, the total is $112. What was the pre-tax amount?', choices: [{ label: 'A', text: '$98.56' }, { label: 'B', text: '$100' }, { label: 'C', text: '$99.12' }, { label: 'D', text: '$86.15' }], correctAnswer: 'B' },
  { id: 'pq-ov5', skillId: 'pct-original-value-hard', questionText: 'After growing by 60%, a company has 400 employees. How many did it start with?', choices: [{ label: 'A', text: '160' }, { label: 'B', text: '240' }, { label: 'C', text: '250' }, { label: 'D', text: '340' }], correctAnswer: 'C' },

  // ── Tax & Tip Basics — Easy ──
  { id: 'pq-tt1', skillId: 'pct-tip-tax-easy', questionText: 'A meal costs $25. You leave a 20% tip. How much is the tip?', choices: [{ label: 'A', text: '$3' }, { label: 'B', text: '$4' }, { label: 'C', text: '$5' }, { label: 'D', text: '$7.50' }], correctAnswer: 'C' },
  { id: 'pq-tt2', skillId: 'pct-tip-tax-easy', questionText: 'A $60 purchase has 8% sales tax. How much is the tax?', choices: [{ label: 'A', text: '$4.80' }, { label: 'B', text: '$6.00' }, { label: 'C', text: '$8.00' }, { label: 'D', text: '$48.00' }], correctAnswer: 'A' },
  { id: 'pq-tt3', skillId: 'pct-tip-tax-easy', questionText: 'A $15 lunch has a 15% tip. How much is the tip?', choices: [{ label: 'A', text: '$1.50' }, { label: 'B', text: '$2.25' }, { label: 'C', text: '$3.00' }, { label: 'D', text: '$15.15' }], correctAnswer: 'B' },
  { id: 'pq-tt4', skillId: 'pct-tip-tax-easy', questionText: 'An item costs $80 with 5% tax. What is the total?', choices: [{ label: 'A', text: '$80.05' }, { label: 'B', text: '$84' }, { label: 'C', text: '$85' }, { label: 'D', text: '$120' }], correctAnswer: 'B' },

  // ── Simple Discounts — Easy ──
  { id: 'pq-sd1', skillId: 'pct-discount-easy', questionText: 'A $90 pair of shoes is 30% off. What is the sale price?', choices: [{ label: 'A', text: '$27' }, { label: 'B', text: '$60' }, { label: 'C', text: '$63' }, { label: 'D', text: '$70' }], correctAnswer: 'C' },
  { id: 'pq-sd2', skillId: 'pct-discount-easy', questionText: 'A $45 book is 10% off. What do you pay?', choices: [{ label: 'A', text: '$4.50' }, { label: 'B', text: '$35' }, { label: 'C', text: '$40.50' }, { label: 'D', text: '$41' }], correctAnswer: 'C' },
  { id: 'pq-sd3', skillId: 'pct-discount-easy', questionText: 'A store offers 40% off a $150 jacket. How much do you save?', choices: [{ label: 'A', text: '$40' }, { label: 'B', text: '$50' }, { label: 'C', text: '$60' }, { label: 'D', text: '$110' }], correctAnswer: 'C' },
  { id: 'pq-sd4', skillId: 'pct-discount-easy', questionText: 'A $200 TV is marked 15% off. What is the sale price?', choices: [{ label: 'A', text: '$30' }, { label: 'B', text: '$170' }, { label: 'C', text: '$175' }, { label: 'D', text: '$185' }], correctAnswer: 'B' },

  // ── Total with Tax & Tip — Medium ──
  { id: 'pq-ttt1', skillId: 'pct-tip-tax-total-medium', questionText: 'A $75 dinner bill with 8% tax and 20% tip (pre-tax). What is the total?', choices: [{ label: 'A', text: '$93.00' }, { label: 'B', text: '$95.25' }, { label: 'C', text: '$96.00' }, { label: 'D', text: '$102.00' }], correctAnswer: 'C' },
  { id: 'pq-ttt2', skillId: 'pct-tip-tax-total-medium', questionText: 'A $120 purchase has 6.5% sales tax. What is the total?', choices: [{ label: 'A', text: '$126.50' }, { label: 'B', text: '$127.80' }, { label: 'C', text: '$128.00' }, { label: 'D', text: '$186.00' }], correctAnswer: 'B' },
  { id: 'pq-ttt3', skillId: 'pct-tip-tax-total-medium', questionText: 'A group splits $180 with 7% tax and 18% tip (pre-tax) among 4 people. Each pays?', choices: [{ label: 'A', text: '$45.00' }, { label: 'B', text: '$50.40' }, { label: 'C', text: '$56.25' }, { label: 'D', text: '$58.50' }], correctAnswer: 'C' },
  { id: 'pq-ttt4', skillId: 'pct-tip-tax-total-medium', questionText: 'A $50 meal with 9% tax and 15% tip (pre-tax). Total?', choices: [{ label: 'A', text: '$60.50' }, { label: 'B', text: '$62.00' }, { label: 'C', text: '$64.50' }, { label: 'D', text: '$68.70' }], correctAnswer: 'B' },

  // ── Stacked Discounts — Medium ──
  { id: 'pq-std1', skillId: 'pct-stacked-discount-medium', questionText: 'A $100 item is 20% off, then an additional 10% coupon on the sale price. What do you pay?', choices: [{ label: 'A', text: '$70' }, { label: 'B', text: '$72' }, { label: 'C', text: '$80' }, { label: 'D', text: '$90' }], correctAnswer: 'B' },
  { id: 'pq-std2', skillId: 'pct-stacked-discount-medium', questionText: '30% off then 20% off the reduced price. Is this the same as 50% off?', choices: [{ label: 'A', text: 'Yes, both give the same price' }, { label: 'B', text: 'No, stacked gives a lower price' }, { label: 'C', text: 'No, stacked gives a higher price' }, { label: 'D', text: 'It depends on the original price' }], correctAnswer: 'C' },
  { id: 'pq-std3', skillId: 'pct-stacked-discount-medium', questionText: 'A $250 item: 15% off, then additional 10% off. Final price?', choices: [{ label: 'A', text: '$187.50' }, { label: 'B', text: '$191.25' }, { label: 'C', text: '$200.00' }, { label: 'D', text: '$212.50' }], correctAnswer: 'B' },
  { id: 'pq-std4', skillId: 'pct-stacked-discount-medium', questionText: 'Two successive discounts: 25% then 20% on a $400 item. Final price?', choices: [{ label: 'A', text: '$200' }, { label: 'B', text: '$220' }, { label: 'C', text: '$240' }, { label: 'D', text: '$260' }], correctAnswer: 'C' },

  // ── Markup vs Margin — Hard ──
  { id: 'pq-mm1', skillId: 'pct-markup-margin-hard', questionText: 'A store buys for $60, sells for $90. What is the percent markup?', choices: [{ label: 'A', text: '30%' }, { label: 'B', text: '33.3%' }, { label: 'C', text: '50%' }, { label: 'D', text: '150%' }], correctAnswer: 'C' },
  { id: 'pq-mm2', skillId: 'pct-markup-margin-hard', questionText: 'A store buys for $60, sells for $90. What is the profit margin?', choices: [{ label: 'A', text: '30%' }, { label: 'B', text: '33.3%' }, { label: 'C', text: '50%' }, { label: 'D', text: '66.7%' }], correctAnswer: 'B' },
  { id: 'pq-mm3', skillId: 'pct-markup-margin-hard', questionText: 'An item has a 60% markup. If the cost is $75, what is the selling price?', choices: [{ label: 'A', text: '$105' }, { label: 'B', text: '$112.50' }, { label: 'C', text: '$120' }, { label: 'D', text: '$135' }], correctAnswer: 'C' },
  { id: 'pq-mm4', skillId: 'pct-markup-margin-hard', questionText: 'A product sells for $200 with a 40% margin. What is the cost?', choices: [{ label: 'A', text: '$80' }, { label: 'B', text: '$120' }, { label: 'C', text: '$140' }, { label: 'D', text: '$160' }], correctAnswer: 'B' },

  // ── Compound Discounts with Tax — Hard ──
  { id: 'pq-cd1', skillId: 'pct-compound-discount-hard', questionText: 'A $300 item is 25% off, then 8% tax on discounted price. Total?', choices: [{ label: 'A', text: '$225.00' }, { label: 'B', text: '$243.00' }, { label: 'C', text: '$249.00' }, { label: 'D', text: '$324.00' }], correctAnswer: 'B' },
  { id: 'pq-cd2', skillId: 'pct-compound-discount-hard', questionText: 'A $500 TV: 30% off + 7% tax. Competitor: $380 + 7% tax. Which is cheaper and by how much?', choices: [{ label: 'A', text: 'First store, by $32.10' }, { label: 'B', text: 'Second store, by $33.15' }, { label: 'C', text: 'Second store, by $31.50' }, { label: 'D', text: 'Same price' }], correctAnswer: 'A' },
  { id: 'pq-cd3', skillId: 'pct-compound-discount-hard', questionText: 'You have a 20% coupon and a $15-off coupon for a $120 item (6% tax after discounts). Lowest total?', choices: [{ label: 'A', text: '20% first, then $15 off' }, { label: 'B', text: '$15 off first, then 20%' }, { label: 'C', text: 'Both give the same total' }, { label: 'D', text: 'Only use the 20% coupon' }], correctAnswer: 'A' },
  { id: 'pq-cd4', skillId: 'pct-compound-discount-hard', questionText: 'A $180 item: 20% off, then 15% off, then 9% tax. Final price?', choices: [{ label: 'A', text: '$122.47' }, { label: 'B', text: '$133.43' }, { label: 'C', text: '$140.40' }, { label: 'D', text: '$144.00' }], correctAnswer: 'B' },
];
