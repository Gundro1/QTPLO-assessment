# QA Assessment - Bug & Negative Behavior Report

This document highlights critical findings and logical flaws identified during the testing of **SauceDemo** (UI) and **Toolshop API** (Backend).

---

## 🛑 PART A: SauceDemo (UI Bugs)

### [BUG-UI-001] Reset App State - UI Sync Delay
- **Description:** Selecting "Reset App State" from the menu clears the cart in the database, but the **Cart Badge count** (number icon) does not disappear until a page refresh.
- **Severity:** Medium (UI/UX Inconsistency)
- **Status in Automation:** Handled in `TC-MISC-005` using `page.reload()`.

### [BUG-UI-002] Checkout Allowed with Empty Cart
- **Description:** The system allows users to proceed to the "Your Information" checkout page even when the cart contains **0 items**.
- **Severity:** High (Business Logic Flaw)
- **Status in Automation:** Verified as current (buggy) behavior in `TC-CHK-009`.

---

## 🛑 PART B: Toolshop API (Backend Bugs)

### [BUG-API-001] Inconsistent Error Status (Forgot Password)
- **Description:** `POST /users/forgot-password` returns a **404 Not Found** when an invalid email pattern is sent. Standard REST practice suggests **400 Bad Request** or **422 Unprocessable Entity**.
- **Severity:** Low (Convention Deviation)
- **Status in Automation:** Handled in `API-016` by accepting 404 as an expected error code.

### [BUG-API-002] Duplicate Email Handling (Behavior Verification)
- **Description:** Re-registering an existing email correctly returns a **422/400** error. 
- **Severity:** Informational (Verified Security Constraint).
- **Status in Automation:** Covered in `API-002`.

---

## 🛠️ Negative Automation Coverage Summary
The automation suite explicitly tests for the following "Expected Failures":
- **UI:** Login with locked users, empty inputs, and security injections; Checkout with missing fields.
- **API:** Registration with weak passwords, login with non-existent accounts, and unauthorized access to protected endpoints.

