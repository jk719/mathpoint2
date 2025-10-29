const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🎯 Testing Algebra 1 page CSS and colors...\n');

  // Navigate to the Algebra 1 page
  await page.goto('http://localhost:3000/algebra1');
  await page.waitForTimeout(2000);

  // Check start page styles
  console.log('📋 Start Page Analysis:');

  // Check background color
  const bgColor = await page.evaluate(() => {
    const body = document.body;
    return window.getComputedStyle(body).backgroundColor;
  });
  console.log(`  Background color: ${bgColor}`);

  // Check main container styles
  const containerStyles = await page.evaluate(() => {
    const container = document.querySelector('.bg-white');
    if (!container) return null;
    const styles = window.getComputedStyle(container);
    return {
      background: styles.backgroundColor,
      color: styles.color,
      shadow: styles.boxShadow,
      padding: styles.padding
    };
  });
  console.log('  Container styles:', containerStyles);

  // Check heading styles
  const headingStyles = await page.evaluate(() => {
    const heading = document.querySelector('h1');
    if (!heading) return null;
    const styles = window.getComputedStyle(heading);
    return {
      color: styles.color,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight
    };
  });
  console.log('  Heading styles:', headingStyles);

  // Check button styles
  const buttonStyles = await page.evaluate(() => {
    const button = document.querySelector('button');
    if (!button) return null;
    const styles = window.getComputedStyle(button);
    return {
      background: styles.backgroundColor,
      color: styles.color,
      border: styles.border,
      cursor: styles.cursor
    };
  });
  console.log('  Button styles:', buttonStyles);

  // Start the diagnostic
  console.log('\n📝 Starting diagnostic...');
  await page.click('button:has-text("Start Diagnostic")');
  await page.waitForTimeout(3000);

  // Check question page styles
  console.log('\n📋 Question Page Analysis:');

  // Check question text color
  const questionStyles = await page.evaluate(() => {
    const questionDiv = document.querySelector('.text-lg');
    if (!questionDiv) return null;
    const styles = window.getComputedStyle(questionDiv);
    return {
      color: styles.color,
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight
    };
  });
  console.log('  Question text styles:', questionStyles);

  // Check if MCQ options are visible
  const mcqStyles = await page.evaluate(() => {
    const labels = document.querySelectorAll('label');
    if (!labels.length) return null;

    return Array.from(labels).map(label => {
      const styles = window.getComputedStyle(label);
      const input = label.querySelector('input');
      const span = label.querySelector('span');
      const spanStyles = span ? window.getComputedStyle(span) : null;

      return {
        labelBackground: styles.backgroundColor,
        labelBorder: styles.border,
        labelColor: styles.color,
        spanColor: spanStyles?.color,
        cursor: styles.cursor
      };
    });
  });
  console.log('  MCQ option styles:', mcqStyles);

  // Check input field if present
  const inputStyles = await page.evaluate(() => {
    const input = document.querySelector('input[type="text"]');
    if (!input) return null;
    const styles = window.getComputedStyle(input);
    return {
      background: styles.backgroundColor,
      color: styles.color,
      border: styles.border,
      padding: styles.padding
    };
  });
  if (inputStyles) {
    console.log('  Input field styles:', inputStyles);
  }

  // Check confidence slider
  const sliderStyles = await page.evaluate(() => {
    const slider = document.querySelector('input[type="range"]');
    const label = document.querySelector('label:has(input[type="range"])');
    if (!slider) return null;
    const sliderStyle = window.getComputedStyle(slider);
    const labelStyle = label ? window.getComputedStyle(label) : null;
    return {
      sliderColor: sliderStyle.accentColor,
      labelColor: labelStyle?.color
    };
  });
  console.log('  Confidence slider styles:', sliderStyles);

  // Check submit button
  const submitButtonStyles = await page.evaluate(() => {
    const buttons = document.querySelectorAll('button');
    const submitButton = Array.from(buttons).find(b => b.textContent?.includes('Submit'));
    if (!submitButton) return null;
    const styles = window.getComputedStyle(submitButton);
    return {
      background: styles.backgroundColor,
      color: styles.color,
      opacity: styles.opacity,
      cursor: styles.cursor
    };
  });
  console.log('  Submit button styles:', submitButtonStyles);

  // Check for any text that might be white on white
  console.log('\n⚠️  Checking for visibility issues:');
  const invisibleElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const issues = [];

    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const bgColor = styles.backgroundColor;
      const textColor = styles.color;

      // Check if text is white or very light on white/light background
      if (textColor === 'rgb(255, 255, 255)' || textColor === 'white') {
        if (bgColor === 'rgb(255, 255, 255)' || bgColor === 'white' ||
            bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
          issues.push({
            tag: el.tagName,
            class: el.className,
            text: el.textContent?.substring(0, 50),
            color: textColor,
            background: bgColor
          });
        }
      }
    });

    return issues;
  });

  if (invisibleElements.length > 0) {
    console.log('  ❌ Found potential white-on-white text issues:');
    invisibleElements.forEach(issue => {
      console.log(`    - ${issue.tag}.${issue.class}: "${issue.text}"`);
      console.log(`      Color: ${issue.color}, BG: ${issue.background}`);
    });
  } else {
    console.log('  ✅ No white-on-white text issues found');
  }

  // Take screenshots
  await page.screenshot({ path: 'algebra1-question-page.png' });
  console.log('\n📸 Screenshot saved as algebra1-question-page.png');

  // Check computed styles for math content
  console.log('\n📐 Math content (KaTeX) styles:');
  const mathStyles = await page.evaluate(() => {
    const mathElements = document.querySelectorAll('.katex');
    if (!mathElements.length) return null;
    const first = mathElements[0];
    const styles = window.getComputedStyle(first);
    return {
      color: styles.color,
      fontSize: styles.fontSize,
      fontFamily: styles.fontFamily
    };
  });
  console.log('  KaTeX styles:', mathStyles);

  await browser.close();
  console.log('\n✅ CSS analysis complete!');
})();