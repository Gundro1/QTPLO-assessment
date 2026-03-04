// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // ==================== POSITIVE SCENARIOS ====================

    test('TC-LOG-001: Valid login with standard_user', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify redirect to inventory page
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
        // Verify products are displayed
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);
    });

    // ==================== NEGATIVE SCENARIOS ====================

    test('TC-LOG-002: Login with locked_out_user shows error', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // Verify error message
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Sorry, this user has been locked out');
        // Verify user stays on login page
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    test('TC-LOG-003: Login with empty username', async ({ page }) => {
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username is required');
    });

    test('TC-LOG-004: Login with empty password', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="login-button"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Password is required');
    });

    test('TC-LOG-005: Login with both fields empty', async ({ page }) => {
        await page.locator('[data-test="login-button"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username is required');
    });

    test('TC-LOG-006: Login with invalid username', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('invalid_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username and password do not match');
    });

    test('TC-LOG-007: Login with invalid password', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('wrong_password');
        await page.locator('[data-test="login-button"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username and password do not match');
    });

    test('TC-LOG-008: Login with special characters (security test)', async ({ page }) => {
        await page.locator('[data-test="username"]').fill('<script>alert("XSS")</script>');
        await page.locator('[data-test="password"]').fill("' OR '1'='1");
        await page.locator('[data-test="login-button"]').click();

        // Should show invalid credentials error, no script execution
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Username and password do not match');
        // Verify no alert dialogs appeared (implicit - test would fail if dialog blocked)
    });

    test('TC-LOG-009: Error message can be dismissed', async ({ page }) => {
        // Trigger an error
        await page.locator('[data-test="login-button"]').click();
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();

        // Dismiss the error
        await page.locator('.error-button').click();
        await expect(errorMsg).not.toBeVisible();
    });
});
