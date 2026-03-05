# QTPLO - assesement - Automation & API Tests

## Project Structure
```
QTPLO-assessment/
├── manual-test-cases.md          # Manual test cases document (37 test cases)
├── package.json                  # Node.js project config
├── playwright.config.js          # Playwright configuration
├── README.md                     # This file
└── tests/
    ├── login.spec.js             # Login automation tests (9 tests)
    ├── cart-and-checkout.spec.js  # Cart & Checkout automation tests (17 tests)
    └── api.spec.js               # API automation tests (20 tests)
```

## Prerequisites
- Node.js v18+ installed
- npm installed

## Setup
```bash
npm install
npx playwright install chromium
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test suites
```bash
# Login tests only
npx playwright test tests/login.spec.js

# Cart & Checkout tests only
npx playwright test tests/cart-and-checkout.spec.js

# API tests only
npx playwright test tests/api.spec.js
```

### View HTML report
```bash
npx playwright show-report
```

## Test Coverage Summary

### Manual Test Cases (37 total)
| Category | Count |
|----------|-------|
| Login | 10 |
| Add to Cart | 6 |
| Remove from Cart | 5 |
| Checkout | 14 |
| Miscellaneous | 8 |

### Automation Tests (28 total)
| Category | Count |
|----------|-------|
| Login (valid + invalid) | 9 |
| Add to Cart | 4 |
| Remove from Cart | 4 |
| Checkout (valid) | 2 |
| Checkout (negative/edge) | 9 |

### API Tests (20 total)
| Category | Count |
|----------|-------|
| User Registration | 5 |
| Login | 4 |
| Change Password | 4 |
| Forgot Password | 4 |
| Logout | 3 |

## Technology Stack
- **Automation Tool:** Playwright
- **Language:** JavaScript
- **Test Runner:** Playwright Test
- **Target Applications:**
  - SauceDemo: https://www.saucedemo.com/
  - Toolshop API: https://api.practicesoftwaretesting.com/

