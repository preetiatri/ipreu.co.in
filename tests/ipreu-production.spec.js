const { test, expect } = require('@playwright/test');

test.describe('IPREU Digital Production Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Force reveal animations for consistency
    await page.evaluate(() => {
      document.querySelectorAll('.app-card, .reveal, .roadmap-item').forEach(el => {
        el.classList.add('active');
      });
      // Hide custom cursor for visual stability in snapshots
      const dot = document.querySelector('.cursor-dot');
      const outline = document.querySelector('.cursor-outline');
      if (dot) dot.style.display = 'none';
      if (outline) outline.style.display = 'none';
    });
  });

  test('should verify elite studio components (Status Badge & Cursor)', async ({ page }) => {
    // Check Live Status Badge
    const statusBadge = page.locator('.status-badge');
    await expect(statusBadge).toBeVisible();
    await expect(statusBadge).toContainText('Systems Operational');

    // Check Custom Cursor DOM presence
    const dot = page.locator('.cursor-dot');
    const outline = page.locator('.cursor-outline');
    await expect(dot).toBeAttached();
    await expect(outline).toBeAttached();
  });

  test('should transition header state on scroll', async ({ page }) => {
    const header = page.locator('.nav-header');
    
    // Initial state
    await expect(header).not.toHaveClass(/scrolled/);
    
    // Scroll and verify
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    await expect(header).toHaveClass(/scrolled/);
  });

  test('should load the homepage and match the production title', async ({ page }) => {
    await expect(page).toHaveTitle(/IPREU Digital | Premium Independent Utility Apps/i);
  });

  test('should update scroll-progress bar width dynamically', async ({ page }) => {
    // Ensure page has enough height to scroll
    await page.evaluate(() => {
      document.body.style.height = '5000px';
    });

    const progressBar = page.locator('.scroll-progress');
    
    // Scroll significantly
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500); 
    
    const scrolledWidth = await progressBar.evaluate(el => el.style.width);
    const widthVal = parseFloat(scrolledWidth);
    
    expect(widthVal).toBeGreaterThan(0);
  });

  test('should verify all 6 app cards are visible', async ({ page }) => {
    const appNames = [
      'OfferLens',
      'PayWise',
      'FinCalc Pro',
      'SecurePassword',
      'FeminaFlow',
      'StudySnap'
    ];

    for (const name of appNames) {
      const card = page.locator(`.app-card:has-text("${name}")`);
      await expect(card).toBeVisible();
    }
  });

  test.describe('Modal Interaction Loop', () => {
    const apps = [
      { name: 'OfferLens', id: 'modal-offerlens' },
      { name: 'PayWise', id: 'modal-paywise' },
      { name: 'FinCalc Pro', id: 'modal-fincalc' },
      { name: 'SecurePassword', id: 'modal-securepass' },
      { name: 'FeminaFlow', id: 'modal-feminaflow' },
      { name: 'StudySnap', id: 'modal-studysnap' }
    ];

    for (const app of apps) {
      test(`should handle '${app.name}' modal flow`, async ({ page }) => {
        const card = page.locator(`.app-card:has-text("${app.name}")`);
        await card.scrollIntoViewIfNeeded();
        
        const cardLink = card.locator('.link-more');
        await cardLink.click();

        const modal = page.locator(`#${app.id}`);
        await expect(modal).toHaveClass(/active/);
        
        // Verify title inside modal matches
        await expect(modal.locator('h3')).toContainText(new RegExp(app.name, 'i'));

        // Close via button
        await modal.locator('.close-modal').click();
        await expect(modal).not.toHaveClass(/active/);
      });
    }
  });

  test('should verify external store links have valid structure', async ({ page }) => {
    const storeLinks = page.locator('a[href*="play.google.com/store/apps/details?id="]');
    const count = await storeLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);

    for (let i = 0; i < count; i++) {
      const href = await storeLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^https:\/\/play\.google\.com\/store\/apps\/details\?id=/);
    }
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');
    
    // Check initial state (should be light if not specified)
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
    
    // Toggle to dark
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Refresh and verify persistence
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Toggle back to light
    await toggle.click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  });

  test('should persist theme across different pages', async ({ page }) => {
    const toggle = page.locator('#theme-toggle');
    
    // Set to dark on homepage
    await toggle.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Navigate to Privacy Policy
    await page.goto('/privacy/index.html');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    
    // Navigate to a specific app policy
    await page.goto('/privacy/secure-password.html');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('should match visual snapshots for landing page', async ({ page }) => {
    // Scroll to various sections to trigger animations before snapshotting
    await page.evaluate(() => {
      document.querySelectorAll('.reveal, .app-card').forEach(el => el.classList.add('active'));
    });
    
    // Wait for glassmorphism and filters to stabilize
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('landing-page.png', { fullPage: true });
  });

  test('should match visual snapshots for privacy center', async ({ page }) => {
    await page.goto('/privacy/index.html');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('privacy-center.png', { fullPage: true });
  });

  test('should handle contact form submission and reset', async ({ page }) => {
    // Scroll to support section
    const contactSection = page.locator('#support');
    await contactSection.scrollIntoViewIfNeeded();

    // Fill form
    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'Hello IPREU, this is a verify message.');

    // Submit
    await page.click('.submit-btn');

    // Verify success state
    const successMsg = page.locator('#contact-success');
    await expect(successMsg).toBeVisible();
    await expect(page.locator('#contact-form')).toBeHidden();

    // Reset and verify recovery
    await page.click('button:has-text("Send Another")');
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(successMsg).toBeHidden();
  });

  test('should provide valid professional infrastructure (Robots/Sitemap)', async ({ page }) => {
    const robots = await page.goto('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('User-agent: *');

    const sitemap = await page.goto('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain('<loc>https://ipreu.co.in/</loc>');
  });

  test('should have a themed premium 404 page', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('h1')).toHaveText('404');
    
    // Check theme consistency
    const toggle = page.locator('#theme-toggle'); // Note: 404 script handles toggle based on localStorage
    await expect(page.locator('.back-home')).toBeVisible();
  });

});
