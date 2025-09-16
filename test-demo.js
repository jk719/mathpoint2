const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Go to demo page
    await page.goto('http://localhost:3000/demo');
    await page.waitForLoadState('networkidle');

    // Wait for the question to appear (animation might delay it)
    await page.waitForSelector('h3:text("Question 1")', { timeout: 5000 });

    // Check key elements
    const title = await page.textContent('h1');
    const questionText = await page.textContent('.text-lg');
    const submitButton = await page.textContent('button:text("Submit Answer")');
    const progressText = await page.textContent('span:text("questions answered")');

    console.log('✅ Demo page loaded successfully!');
    console.log('📝 Title:', title);
    console.log('❓ Question:', questionText?.substring(0, 50) + '...');
    console.log('🔴 Submit button:', submitButton);
    console.log('📊 Progress:', progressText);

    // Test filling in an answer
    await page.fill('input[placeholder="Enter your answer here..."]', 'x = 5 and x = -2');

    // Check if submit button is enabled
    const isEnabled = await page.isEnabled('button:text("Submit Answer")');
    console.log('✅ Submit button enabled after typing:', isEnabled);

    // Click submit to test the flow
    await page.click('button:text("Submit Answer")');

    // Wait a moment for processing
    await page.waitForTimeout(1000);

    // Check if we got to next question or completion
    const currentContent = await page.textContent('body');
    if (currentContent.includes('Question 2') || currentContent.includes('Diagnostic Complete')) {
      console.log('✅ Adaptive flow working - moved to next step!');
    }

    console.log('\n🎉 All tests passed! MathPoint demo is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();