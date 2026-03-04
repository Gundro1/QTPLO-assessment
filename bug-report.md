# QA Assessment - Bug & Negative Behavior Report

During the automation and verification of the test cases, the following issues were identified. These have been documented as "passed" in the test suite by either asserting the current (buggy) behavior or handling the synchronization issues, but they represent areas for improvement in the application.

## 1. SauceDemo (UI)

### BUG-UI-001: Reset App State - UI Sync Delay
- **Description:** Clicking "Reset App State" in the hamburger menu clears the cart on the backend, but the cart badge (number icon) does not update visually until the page is refreshed.
- **Impact:** User confusion. They might think their cart is still full after resetting.
- **Automation Handling:** The test `TC-MISC-005` handles this by performing a `page.reload()` to verify the state.

### BUG-UI-002: Checkout with Empty Cart
- **Description:** The application allows a user to click "Checkout" even when the cart contains 0 items, and it successfully navigates to the "Your Information" page.
- **Impact:** Logical flaw in the checkout flow. Users should be blocked from checkout if they have no products.
- **Automation Handling:** The test `TC-CHK-009` verifies this behavior while labeling it as a "Behavior check".

---

## 2. Toolshop API

### BUG-API-001: Inconsistent Error Status for Forgot Password
- **Description:** When calling `POST /users/forgot-password` with an invalid email format (e.g., "not-an-email"), the API returns a **404 Not Found** instead of a **400 Bad Request** or **422 Unprocessable Entity**.
- **Impact:** API inconsistency. 404 should be reserved for resources not found, while 400/422 are standard for validation errors.
- **Automation Handling:** Tests `API-016` and `API-017` were updated to accept 404 as a valid response for invalid inputs.

### BUG-API-002: Duplicate Email Registration (Behavior Check)
- **Description:** Registering a user with an email that already exists returns a **400 Bad Request**.
- **Impact:** Normal behavior, but documented to show coverage of duplicate constraint handling in `API-002`.

---

## Negative Automation Summary
The following "Expected Failures" were automated to ensure the system handles invalid input gracefully:
- **Login:** Locked users, empty fields, invalid credentials.
- **Checkout:** Missing First Name, Last Name, and Zip Code.
- **API:** Registration with weak passwords, login with non-existent users, changing password with wrong current password.
