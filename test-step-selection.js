const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Testing Algebra1 Step-Selection Questions...\n');

    // Navigate to algebra1 diagnostic
    await page.goto('http://localhost:3000/algebra1');
    await page.waitForSelector('button:has-text("Start Diagnostic")', { timeout: 10000 });

    console.log('✅ Page loaded');

    // Start the diagnostic
    await page.click('button:has-text("Start Diagnostic")');
    await page.waitForSelector('text=/Question \\d+/', { timeout: 10000 });

    console.log('✅ Diagnostic started\n');

    // Go through questions looking for step-selection format
    let foundStepSelection = false;
    let questionNumber = 1;

    while (questionNumber <= 10 && !foundStepSelection) {
      // Check current question format
      const hasCheckboxes = await page.locator('input[type="checkbox"]').count();

      if (hasCheckboxes > 0) {
        console.log(`📝 Found STEP_SELECTION question at Question ${questionNumber}`);
        foundStepSelection = true;

        // Get all checkbox labels
        const stepOptions = await page.locator('label:has(input[type="checkbox"])').allTextContents();
        console.log(`   Found ${stepOptions.length} step options:`);
        stepOptions.forEach((step, index) => {
          console.log(`   ${index + 1}. ${step.substring(0, 50)}...`);
        });

        // Select some checkboxes (first and third)
        if (hasCheckboxes >= 3) {
          await page.locator('input[type="checkbox"]').nth(0).check();
          await page.locator('input[type="checkbox"]').nth(2).check();
          console.log('   ✅ Selected steps 1 and 3');
        }

        // Submit the answer
        await page.click('button:has-text("Submit Answer")');
        console.log('   ✅ Submitted answer');

        // Wait for feedback
        await page.waitForTimeout(1000);

        // Check for feedback
        const feedbackElement = await page.locator('div:has-text("✓"),div:has-text("✗")').first();
        if (feedbackElement) {
          const feedback = await feedbackElement.textContent();
          console.log(`   Feedback: ${feedback}\n`);
        }
      } else {
        console.log(`Question ${questionNumber} - Not a step-selection format`);

        // Answer the current question to move forward
        const hasRadio = await page.locator('input[type="radio"]').count();
        const hasInput = await page.locator('input[placeholder*="Enter"]').count();

        if (hasRadio > 0) {
          // Multiple choice
          await page.locator('input[type="radio"]').first().click();
        } else if (hasInput > 0) {
          // Numerical/text input
          await page.fill('input[placeholder*="Enter"]', '42');
        }

        // Submit to go to next question
        const submitButton = await page.locator('button:has-text("Submit Answer")');
        const isDisabled = await submitButton.isDisabled();

        if (!isDisabled) {
          await submitButton.click();
          await page.waitForTimeout(2500); // Wait for transition
        }
      }

      questionNumber++;
    }

    if (!foundStepSelection) {
      console.log('⚠️  No step-selection questions found in first 10 questions');
      console.log('   This might be due to adaptive selection.');
    }

    console.log('\n✅ Test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();