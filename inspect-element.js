const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000/diagnostic');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Inspect the specific selector
    const elementSelector = 'body > main > div > div > div.space-y-6 > div > div:nth-child(2) > div';

    const elementExists = await page.locator(elementSelector).count();
    console.log('Element exists:', elementExists > 0);

    if (elementExists > 0) {
      const styles = await page.locator(elementSelector).evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          opacity: computed.opacity,
          visibility: computed.visibility,
          display: computed.display,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          textContent: el.textContent?.substring(0, 100)
        };
      });

      console.log('Element styles:', styles);

      // Check parent styles too
      const parentStyles = await page.locator(elementSelector).locator('..').evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          className: el.className
        };
      });

      console.log('Parent styles:', parentStyles);
    }

    // Also check the AnimatePresence div
    const animatePresenceDiv = await page.locator('.space-y-6 > div > div:nth-child(2)').evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        opacity: computed.opacity,
        transform: computed.transform,
        className: el.className,
        textContent: el.textContent?.substring(0, 100)
      };
    });

    console.log('AnimatePresence container:', animatePresenceDiv);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();