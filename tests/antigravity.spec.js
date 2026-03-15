const { test, expect } = require('@playwright/test');

test.describe('Antigravity Web App Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage and display correct IPREU Digital title', async ({ page }) => {
    // Checks that the tab title contains IPREU Digital
    await expect(page).toHaveTitle(/IPREU Digital/i);
  });

  test('should have a working navigation system', async ({ page }) => {
    // Verify a main heading exists
    const mainHeading = page.locator('h1');
    await expect(mainHeading).toBeVisible();

    // Test Navigation Scroll
    const appsLink = page.locator('nav >> text=Apps');
    await appsLink.click();
    await expect(page.locator('#apps')).toBeInViewport();

    const aboutLink = page.locator('nav >> text=About');
    await aboutLink.click();
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should open and close the OfferLens modal', async ({ page, isMobile }) => {
    // Trigger modal open
    const learnMore = page.locator('.app-card:has-text("OfferLens") >> .link-more');
    await learnMore.scrollIntoViewIfNeeded();
    await learnMore.click();

    const modal = page.locator('#modal-offerlens');
    await expect(modal).toHaveClass(/active/);
    await expect(modal.locator('h3')).toHaveText(/About OfferLens/i);

    // Close via button
    const closeBtn = modal.locator('.close-modal');
    await closeBtn.click();
    await expect(modal).not.toHaveClass(/active/);
  });

  test('should close modal on Escape key', async ({ page }) => {
    await page.locator('.app-card:has-text("PayWise") >> .link-more').click();
    const modal = page.locator('#modal-paywise');
    await expect(modal).toHaveClass(/active/);

    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/active/);
  });

  test('should have valid store links for primary apps', async ({ page }) => {
    const googlePlayLinks = [
      { name: 'OfferLens', href: /play\.google\.com.*offerlens/ },
      { name: 'PayWise', href: /play\.google\.com.*paywise/ },
      { name: 'SecurePassword', href: /play\.google\.com.*passwordvault/ }
    ];

    for (const link of googlePlayLinks) {
      const locator = page.locator(`.app-card:has-text("${link.name}") >> a[href*="play.google.com"]`);
      await expect(locator).toHaveAttribute('href', link.href);
    }
  });

  test('should display the SecurePassword vault link in the apps grid', async ({ page }) => {
    // Specific check for the SecurePassword link visibility
    const selector = '.apps-grid a[href*="passwordvault"]';
    await page.waitForSelector(selector, { state: 'attached' });
    const securePassLink = page.locator(selector);
    await securePassLink.scrollIntoViewIfNeeded();
    await expect(securePassLink).toBeVisible({ timeout: 10000 });
  });

});
