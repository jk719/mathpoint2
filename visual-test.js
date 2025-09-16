const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Set viewport size
    await page.setViewportSize({ width: 1280, height: 800 });

    // Go to demo page
    await page.goto('http://localhost:3000/demo');
    await page.waitForLoadState('networkidle');

    // Wait for any animations to complete
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({
      path: 'demo-screenshot.png',
      fullPage: true
    });

    console.log('📸 Screenshot saved as demo-screenshot.png');

    // Check element visibility and styles
    const questionCard = await page.locator('.rounded-lg.border.bg-card').first();
    const questionVisible = await questionCard.isVisible();

    const questionOpacity = await questionCard.evaluate(el => {
      return window.getComputedStyle(el).opacity;
    });

    const questionTransform = await questionCard.evaluate(el => {
      return window.getComputedStyle(el).transform;
    });

    console.log('\n🔍 Visual Analysis:');
    console.log('Question card visible:', questionVisible);
    console.log('Question card opacity:', questionOpacity);
    console.log('Question card transform:', questionTransform);

    // Check if the animation completed
    if (questionOpacity === '0' || questionTransform.includes('translateX')) {
      console.log('⚠️  Animation may not have completed - question might be hidden/animating');

      // Wait longer and check again
      await page.waitForTimeout(3000);

      const newOpacity = await questionCard.evaluate(el => {
        return window.getComputedStyle(el).opacity;
      });

      console.log('Opacity after waiting:', newOpacity);

      // Take another screenshot after waiting
      await page.screenshot({
        path: 'demo-screenshot-after-wait.png',
        fullPage: true
      });
      console.log('📸 Second screenshot saved as demo-screenshot-after-wait.png');
    }

    // Check other important elements
    const progressBar = await page.locator('.bg-gradient-to-r.from-blue-600').isVisible();
    const submitButton = await page.locator('button:text("Submit Answer")').isVisible();
    const header = await page.locator('header').isVisible();

    console.log('\n✅ Element Visibility Check:');
    console.log('Header:', header);
    console.log('Progress bar:', progressBar);
    console.log('Submit button:', submitButton);

    // Check for any console errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });

    if (logs.length > 0) {
      console.log('\n❌ Console Errors:');
      logs.forEach(log => console.log('  -', log));
    } else {
      console.log('\n✅ No console errors detected');
    }

  } catch (error) {
    console.error('❌ Visual test failed:', error.message);
  } finally {
    await browser.close();
  }
})();