const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for content to load

    // Try to find the header element and take a screenshot of it
    const headerElement = await page.locator('header, nav, [class*="header"], [class*="nav"]').first();

    if (await headerElement.count() > 0) {
      await headerElement.screenshot({
        path: 'mathpoint-header.png'
      });
      console.log('📸 Header screenshot saved as mathpoint-header.png');
    } else {
      // If no specific header found, capture the top portion of the page
      await page.screenshot({
        path: 'mathpoint-header.png',
        clip: { x: 0, y: 0, width: 1280, height: 200 }
      });
      console.log('📸 Top portion screenshot saved as mathpoint-header.png');
    }

    // Try to extract logo and navigation info
    const logo = await page.locator('img[alt*="logo"], img[alt*="Logo"], [class*="logo"]').first();
    const nav = await page.locator('nav, [class*="nav"]').first();

    if (await logo.count() > 0) {
      const logoAlt = await logo.getAttribute('alt');
      const logoSrc = await logo.getAttribute('src');
      console.log('Logo found:', { alt: logoAlt, src: logoSrc });
    } else {
      console.log('No explicit logo image found');
    }

    if (await nav.count() > 0) {
      const navText = await nav.textContent();
      console.log('Navigation text:', navText?.trim());
    } else {
      console.log('No navigation element found');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();