// @ts-check
const { test, expect } = require('@playwright/test');

// Helper: Login as standard_user before each test
async function loginAsStandardUser(page) {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
}

test.describe('Add to Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
    });

    test('TC-CART-001: Add single product to cart', async ({ page }) => {
        // Add Sauce Labs Backpack
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Verify button changes to "Remove"
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

        // Verify cart badge shows 1
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });

    test('TC-CART-002: Add multiple products to cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Verify cart badge shows 3
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('3');

        // Verify all buttons changed to "Remove"
        await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
        await expect(page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]')).toBeVisible();
    });

    test('TC-CART-003: Add product from product detail page', async ({ page }) => {
        // Click on product name to go to detail page
        await page.locator('[data-test="item-4-title-link"]').click();
        await expect(page).toHaveURL(/.*inventory-item.html/);

        // Add to cart from detail page
        await page.locator('[data-test="add-to-cart"]').click();

        // Verify button changes and cart badge
        await expect(page.locator('[data-test="remove"]')).toBeVisible();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('TC-CART-004: Verify cart contents after adding product', async ({ page }) => {
        // Add a product
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Go to cart
        await page.locator('.shopping_cart_link').click();
        await expect(page).toHaveURL(/.*cart.html/);

        // Verify cart contents
        const cartItem = page.locator('.cart_item');
        await expect(cartItem).toHaveCount(1);
        await expect(cartItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        await expect(cartItem.locator('.inventory_item_price')).toHaveText('$29.99');
        await expect(cartItem.locator('.cart_quantity')).toHaveText('1');

        // Verify buttons
        await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
        await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    });
});

test.describe('Remove from Cart Tests', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
    });

    test('TC-REM-001: Remove product from inventory page', async ({ page }) => {
        // Add then remove
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        // Verify button reverts
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        // Verify cart badge disappears
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('TC-REM-002: Remove product from cart page', async ({ page }) => {
        // Add product
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Go to cart
        await page.locator('.shopping_cart_link').click();

        // Remove from cart page
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        // Verify item is removed
        await expect(page.locator('.cart_item')).toHaveCount(0);
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('TC-REM-003: Remove all products from cart', async ({ page }) => {
        // Add 3 products
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // Go to cart and remove all
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();

        // Verify cart is empty
        await expect(page.locator('.cart_item')).toHaveCount(0);
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('TC-REM-004: Continue shopping from cart page', async ({ page }) => {
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="continue-shopping"]').click();

        await expect(page).toHaveURL(/.*inventory.html/);
    });
});

test.describe('Checkout Tests - Valid Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
    });

    test('TC-CHK-001: Complete full checkout successfully', async ({ page }) => {
        // Add product
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Go to cart and checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        // Fill checkout information
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        // Verify overview page
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.locator('.cart_item')).toHaveCount(1);
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

        // Verify summary details
        await expect(page.locator('.summary_subtotal_label')).toContainText('$29.99');
        await expect(page.locator('.summary_tax_label')).toBeVisible();
        await expect(page.locator('.summary_total_label')).toBeVisible();

        // Finish checkout
        await page.locator('[data-test="finish"]').click();

        // Verify confirmation
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    });

    test('TC-CHK-002: Checkout with multiple products', async ({ page }) => {
        // Add 3 products
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        // Checkout flow
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('Jane');
        await page.locator('[data-test="lastName"]').fill('Smith');
        await page.locator('[data-test="postalCode"]').fill('54321');
        await page.locator('[data-test="continue"]').click();

        // Verify all items on overview
        await expect(page.locator('.cart_item')).toHaveCount(3);
        await page.locator('[data-test="finish"]').click();

        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
});

test.describe('Checkout Tests - Negative Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
        // Add a product and go to checkout
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
    });

    test('TC-CHK-003: Checkout with missing first name', async ({ page }) => {
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('First Name is required');
    });

    test('TC-CHK-004: Checkout with missing last name', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Last Name is required');
    });

    test('TC-CHK-005: Checkout with missing zip code', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="continue"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Postal Code is required');
    });

    test('TC-CHK-006: Checkout with all fields empty', async ({ page }) => {
        await page.locator('[data-test="continue"]').click();

        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('First Name is required');
    });

    test('TC-CHK-007: Cancel from checkout information page', async ({ page }) => {
        await page.locator('[data-test="cancel"]').click();
        await expect(page).toHaveURL(/.*cart.html/);
    });

    test('TC-CHK-008: Cancel from checkout overview page', async ({ page }) => {
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        // On overview page, click cancel
        await page.locator('[data-test="cancel"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
});

test.describe('Miscellaneous & Edge Case Tests', () => {

    test.beforeEach(async ({ page }) => {
        await loginAsStandardUser(page);
    });

    test('TC-MISC-005: Reset App State clears cart', async ({ page }) => {
        // Add product
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        // Open menu and reset
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#reset_sidebar_link').click();

        // SauceDemo requires a refresh to visually update the cart badge after a reset
        await page.reload();

        // Verify cart is empty
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    });

    test('TC-CHK-009: Behavior check - Checkout with empty cart', async ({ page }) => {
        // Ensure cart is empty first
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#reset_sidebar_link').click();
        await page.reload();

        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        // Documenting that SauceDemo allows empty checkout
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });
});

