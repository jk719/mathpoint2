const { chromium } = require('playwright');

(async () => {
  console.log('Starting Algebra1 Diagnostic Test...');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down actions to see what's happening
  });

  const page = await browser.newPage();

  try {
    // Navigate to algebra1 page
    console.log('1. Navigating to algebra1 diagnostic page...');
    await page.goto('http://localhost:3000/algebra1');
    await page.waitForTimeout(2000);

    // Take screenshot of initial page
    await page.screenshot({ path: 'test-screenshots/algebra1-start.png' });
    console.log('   ✓ Reached algebra1 page');

    // Click Start Diagnostic button
    console.log('2. Starting diagnostic...');
    await page.click('button:has-text("Start Diagnostic")');
    await page.waitForTimeout(2000);

    // Check if first question loaded
    const questionElement = page.locator('.bg-white.rounded-lg.shadow-lg').first();
    const questionVisible = await questionElement.isVisible();
    if (questionVisible) {
      console.log('   ✓ First question loaded');
      await page.screenshot({ path: 'test-screenshots/algebra1-question1.png' });
    } else {
      console.log('   ✗ First question did not load');
    }

    // Try to answer the question
    console.log('3. Attempting to answer question...');

    // Check question format
    const mcqChoices = page.locator('input[type="radio"]');
    const mathInput = page.locator('input[type="text"]').first();

    if (await mcqChoices.count() > 0) {
      console.log('   - MCQ question detected, selecting first choice');
      await mcqChoices.first().click();
      await page.waitForTimeout(500);
    } else if (await mathInput.isVisible()) {
      console.log('   - Numeric/FR question detected, entering answer');
      await mathInput.click();
      await mathInput.fill('42');
      await page.waitForTimeout(500);
    } else {
      console.log('   - Could not detect question format');
    }

    // Set confidence
    console.log('4. Setting confidence...');
    const confidenceSlider = await page.locator('input[type="range"]');
    if (await confidenceSlider.isVisible()) {
      await confidenceSlider.fill('80');
      console.log('   ✓ Confidence set to 80%');
    }

    // Submit answer
    console.log('5. Submitting answer...');
    const submitButton = await page.locator('button:has-text("Submit Answer")');

    // Check if button is enabled
    const isDisabled = await submitButton.isDisabled();
    if (isDisabled) {
      console.log('   ✗ Submit button is disabled');

      // Try to debug why
      const hasAnswer = await page.evaluate(() => {
        const radioChecked = document.querySelector('input[type="radio"]:checked');
        const textInput = document.querySelector('input#answer');
        return radioChecked || (textInput && textInput.value);
      });

      console.log(`   Debug: Has answer selected/entered: ${hasAnswer}`);
    } else {
      await submitButton.click();
      console.log('   ✓ Answer submitted');

      // Wait for feedback
      await page.waitForTimeout(1000);

      // Check for feedback
      const feedback = await page.locator('.bg-green-100, .bg-yellow-100').first();
      if (await feedback.isVisible()) {
        const feedbackText = await feedback.textContent();
        console.log(`   ✓ Feedback received: ${feedbackText}`);
      }

      // Wait for next question
      await page.waitForTimeout(2500);

      // Check if next question loaded
      const nextQuestionVisible = await page.locator('.bg-white.rounded-lg.shadow-lg').first().isVisible();
      if (nextQuestionVisible) {
        console.log('   ✓ Next question loaded');
        await page.screenshot({ path: 'test-screenshots/algebra1-question2.png' });
      } else {
        // Check if diagnostic completed
        const reportVisible = await page.locator('h1:has-text("Diagnostic Complete")').isVisible();
        if (reportVisible) {
          console.log('   ✓ Diagnostic completed');
          await page.screenshot({ path: 'test-screenshots/algebra1-complete.png' });
        } else {
          console.log('   ✗ Next question did not load');
        }
      }
    }

    // Test keyboard visibility (for math input)
    console.log('6. Testing math keyboard...');
    const keyboardButton = await page.locator('button[title="Toggle keyboard"]').first();
    if (await keyboardButton.isVisible()) {
      await keyboardButton.click();
      await page.waitForTimeout(500);

      const keyboard = await page.locator('.fixed.bottom-0.z-\\[9999\\]').first();
      if (await keyboard.isVisible()) {
        console.log('   ✓ Math keyboard opened');

        // Close keyboard
        const closeButton = await page.locator('button[aria-label="Close keyboard"]');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          console.log('   ✓ Math keyboard closed');
        }
      } else {
        console.log('   ✗ Math keyboard did not open');
      }
    }

    console.log('\n✅ Test completed successfully');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    await page.screenshot({ path: 'test-screenshots/algebra1-error.png' });
  } finally {
    await browser.close();
    console.log('\nBrowser closed');
  }
})();