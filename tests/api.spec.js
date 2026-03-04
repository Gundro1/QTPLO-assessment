// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://api.practicesoftwaretesting.com';

// Generate unique email for each test run to avoid conflicts
const timestamp = Date.now();
const TEST_USER = {
    first_name: 'John',
    last_name: 'Doe',
    address: {
        street: '123 Test Street',
        city: 'Testville',
        state: 'TX',
        country: 'US',
        postal_code: '12345'
    },
    phone: '0987654321',
    dob: '1990-05-15',
    email: `testuser_${timestamp}@test.example`,
    password: 'Test@User1234!'
};

test.describe('API Tests - User Registration & Authentication Flow', () => {
    let accessToken = '';

    test.describe.configure({ mode: 'serial' });

    // ==================== 1. REGISTER NEW USER ====================

    test('API-001: Register a new user successfully', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            data: TEST_USER
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toHaveProperty('first_name', TEST_USER.first_name);
        expect(body).toHaveProperty('last_name', TEST_USER.last_name);
        expect(body).toHaveProperty('email', TEST_USER.email);
        expect(body).toHaveProperty('id');
    });

    test('API-002: Register with duplicate email should fail', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            data: TEST_USER
        });

        // Duplicate registration should fail with 422 or 400
        expect([400, 422]).toContain(response.status());
    });

    test('API-003: Register with missing required fields', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                first_name: 'Test'
                // Missing: last_name, email, password
            }
        });

        expect([400, 422]).toContain(response.status());
    });

    test('API-004: Register with invalid email format', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...TEST_USER,
                email: 'not-an-email'
            }
        });

        expect([400, 422]).toContain(response.status());
    });

    test('API-005: Register with weak password', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/register`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                ...TEST_USER,
                email: `weakpass_${timestamp}@test.example`,
                password: '123' // Too short
            }
        });

        expect([400, 422]).toContain(response.status());
    });

    // ==================== 2. LOGIN ====================

    test('API-006: Login with valid credentials', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: TEST_USER.email,
                password: TEST_USER.password
            }
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('access_token');
        expect(body.access_token).toBeTruthy();

        // Store token for subsequent tests
        accessToken = body.access_token;
    });

    test('API-007: Login with invalid password', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: TEST_USER.email,
                password: 'WrongPassword@123!'
            }
        });

        expect(response.status()).toBe(401);
    });

    test('API-008: Login with non-existent email', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: 'nonexistent@test.example',
                password: 'SomePass@123!'
            }
        });

        expect(response.status()).toBe(401);
    });

    test('API-009: Login with empty credentials', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: '',
                password: ''
            }
        });

        expect([400, 401, 422]).toContain(response.status());
    });

    // ==================== 3. CHANGE PASSWORD ====================

    test('API-010: Change password with valid auth token', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/change-password`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                current_password: TEST_USER.password,
                new_password: 'NewTestPass@5678!',
                new_password_confirmation: 'NewTestPass@5678!'
            }
        });

        expect(response.status()).toBe(200);
    });

    test('API-011: Change password without auth token', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/change-password`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                current_password: TEST_USER.password,
                new_password: 'AnotherPass@789!',
                new_password_confirmation: 'AnotherPass@789!'
            }
        });

        expect(response.status()).toBe(401);
    });

    test('API-012: Change password with wrong current password', async ({ request }) => {
        // Current password is now 'NewTestPass@5678!' from API-010
        const currentPassword = 'NewTestPass@5678!';

        const response = await request.post(`${BASE_URL}/users/change-password`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                current_password: 'CompletelyWrong@123!',
                new_password: 'SomethingElse@789!',
                new_password_confirmation: 'SomethingElse@789!'
            }
        });

        expect([400, 401, 422]).toContain(response.status());
    });

    test('API-013: Change password - confirmation mismatch', async ({ request }) => {
        // Current password is 'NewTestPass@5678!'
        const response = await request.post(`${BASE_URL}/users/change-password`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                current_password: 'NewTestPass@5678!',
                new_password: 'Mismatch@111!',
                new_password_confirmation: 'Mismatch@222!'
            }
        });

        expect([400, 422]).toContain(response.status());
    });

    // ==================== 4. FORGOT PASSWORD ====================

    test('API-014: Forgot password with valid email', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/forgot-password`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: TEST_USER.email
            }
        });

        expect(response.status()).toBe(200);
    });

    test('API-015: Forgot password with non-existent email', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/forgot-password`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: 'doesnotexist@nowhere.example'
            }
        });

        expect([200, 400, 404, 422]).toContain(response.status());
    });

    test('API-016: Forgot password with invalid email format', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/forgot-password`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: 'not-a-valid-email'
            }
        });

        expect([400, 404, 422]).toContain(response.status());
    });

    test('API-017: Forgot password with empty email', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/users/forgot-password`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: ''
            }
        });

        expect([400, 404, 422]).toContain(response.status());
    });

    // ==================== 5. LOGOUT ====================

    test('API-018: Logout with valid token', async ({ request }) => {
        // Login first (password was reset by forgot-password to 'welcome02')
        const loginResponse = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: TEST_USER.email,
                password: 'welcome02'
            }
        });
        const loginBody = await loginResponse.json();
        const token = loginBody.access_token;

        const response = await request.get(`${BASE_URL}/users/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(200);
    });

    test('API-019: Logout without auth token', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/logout`);

        expect(response.status()).toBe(401);
    });

    test('API-020: Access protected endpoint after logout (token invalidation)', async ({ request }) => {
        // Login
        const loginResponse = await request.post(`${BASE_URL}/users/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: TEST_USER.email,
                password: 'welcome02'
            }
        });
        const loginBody = await loginResponse.json();
        const token = loginBody.access_token;

        // Logout
        await request.get(`${BASE_URL}/users/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Try to access protected endpoint with the same (now invalidated) token
        const response = await request.get(`${BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(401);
    });
});
