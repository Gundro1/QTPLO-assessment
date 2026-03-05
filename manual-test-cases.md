# SauceDemo Manual Test Cases
**Application URL:** https://www.saucedemo.com/  
**Tester:** Ogundero Azeez  
**Status Key:** ✅ PASS | ❌ FAIL | ⏳ PENDING

## 1. LOGIN FEATURE

| ID | Title | Priority | Test Steps | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| **TC-LOG-001** | Valid Login | High | 1. Enter `standard_user`<br>2. Enter `secret_sauce`<br>3. Click Login | User redirected to `/inventory.html`. Products displayed. | ✅ PASS |
| **TC-LOG-002** | Locked User | High | 1. Enter `locked_out_user`<br>2. Enter `secret_sauce`<br>3. Click Login | Error: "Sorry, this user has been locked out." | ✅ PASS |
| **TC-LOG-003** | Empty Username | High | 1. Password only<br>2. Click Login | Error: "Username is required" | ✅ PASS |
| **TC-LOG-004** | Empty Password | High | 1. Username only<br>2. Click Login | Error: "Password is required" | ✅ PASS |
| **TC-LOG-005** | Both Empty | Medium | 1. Click Login | Error: "Username is required" | ✅ PASS |
| **TC-LOG-006** | Invalid Username | Medium | 1. Enter `invalid_user`<br>2. Click Login | Error: "Username and password do not match" | ✅ PASS |
| **TC-LOG-007** | Invalid Password | Medium | 1. Enter `wrong_pass`<br>2. Click Login | Error: "Username and password do not match" | ✅ PASS |
| **TC-LOG-008** | Security (XSS/SQLi) | Low | 1. Enter scripts/SQL in fields<br>2. Click Login | No execution. Standard error message shown. | ✅ PASS |
| **TC-LOG-009** | Dismiss Error | Low | 1. Trigger error<br>2. Click 'X' on error | Error message disappears. | ✅ PASS |
| **TC-LOG-010** | Problem User | Medium | 1. Enter `problem_user`<br>2. Login | Logged in (visual bugs may occur as expected). | ✅ PASS |

## 2. ADDING PRODUCT TO CART

| ID | Title | Priority | Test Steps | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| **TC-CART-001** | Add Single Item | High | 1. Click "Add to cart" on Backpack | Button changes to "Remove". Badge shows "1". | ✅ PASS |
| **TC-CART-002** | Add Multiple Items | High | 1. Click "Add to cart" for 3 items | Badge shows "3". Buttons change to "Remove". | ✅ PASS |
| **TC-CART-003** | Add from Details | High | 1. Open Product Page<br>2. Click "Add to cart" | Badge increments. Remove button appears. | ✅ PASS |
| **TC-CART-004** | Verify Cart Content | High | 1. Add item<br>2. Click cart icon | Item name, price ($29.99), and qty (1) are correct. | ✅ PASS |
| **TC-CART-005** | Add All Items | Medium | 1. Add all 6 products | Badge shows "6". | ✅ PASS |
| **TC-CART-006** | Badge Persistence | Medium | 1. Add item<br>2. Navigate away/back | Cart badge count remains "1". | ✅ PASS |

## 3. REMOVING PRODUCT FROM CART

| ID | Title | Priority | Test Steps | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| **TC-REM-001** | Remove from Inventory | High | 1. Click "Remove" on Inventory page | Badge disappears. Button reverts to "Add to cart". | ✅ PASS |
| **TC-REM-002** | Remove from Cart Page | High | 1. Go to Cart<br>2. Click "Remove" | Item disappears from list. Badge decrements. | ✅ PASS |
| **TC-REM-003** | Remove from Details | Medium | 1. Open Details<br>2. Click "Remove" | Button reverts. Badge decrements. | ✅ PASS |
| **TC-REM-004** | Clear Entire Cart | Medium | 1. Add 3 items<br>2. Remove all from Cart page | Cart is empty. Badge disappears. | ✅ PASS |
| **TC-REM-005** | Continue Shopping | Medium | 1. Go to Cart<br>2. Click "Continue Shopping" | Redirected back to inventory page. | ✅ PASS |

## 4. COMPLETING CHECKOUT PROCESS

| ID | Title | Priority | Test Steps | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| **TC-CHK-001** | Success Checkout | High | 1. Fill info<br>2. Continue<br>3. Finish | Header: "Thank you for your order!". Cart cleared. | ✅ PASS |
| **TC-CHK-002** | Missing First Name | High | 1. Leave FName empty<br>2. Continue | Error: "First Name is required" | ✅ PASS |
| **TC-CHK-003** | Missing Last Name | High | 1. Leave LName empty<br>2. Continue | Error: "Last Name is required" | ✅ PASS |
| **TC-CHK-004** | Missing Postal Code | High | 1. Leave Zip empty<br>2. Continue | Error: "Postal Code is required" | ✅ PASS |
| **TC-CHK-005** | All Info Empty | Medium | 1. Click Continue | Error: "First Name is required" | ✅ PASS |
| **TC-CHK-006** | Verify Overview Totals| High | 1. View Overview page | Subtotal + Tax = Total (calculated correctly). | ✅ PASS |
| **TC-CHK-007** | Cancel from Overview | Medium | 1. On Overview, click Cancel | Redirected to inventory. Items remain in cart. | ✅ PASS |
| **TC-CHK-008** | Cancel from Info Page | Medium | 1. On Info page, click Cancel | Redirected to Cart. Items remain. | ✅ PASS |
| **TC-CHK-009** | Back Home After Order | Medium | 1. Finish order<br>2. Click "Back Home" | Redirected to inventory. Cart empty. | ✅ PASS |
| **TC-CHK-010** | Bulk Checkout | High | 1. Checkout with 6 items | Total price matches sum of all items. | ✅ PASS |
| **TC-CHK-011** | Invalid Data Validation| Medium | 1. Enter random symbols/long text in FName/LName/Zip<br>2. Click Continue | (BUG) Should show error "Invalid format". Currently accepts anything. | ❌ FAIL |
| **TC-CHK-012** | Missing Billing Info | High | 1. Proceed to checkout | (BUG) No option to enter billing address or card details. | ❌ FAIL |
| **TC-CHK-013** | Missing Delivery Info | High | 1. Proceed to checkout | (BUG) No option to specify delivery address. | ❌ FAIL |
| **TC-CHK-014** | Redundant Info Entry | Medium | 1. Fill info<br>2. Go back from overview<br>3. Proceed again | (BUG) System asks for the same information again instead of persisting it. | ❌ FAIL |

## 5. ADDITIONAL / EDGE CASES

| ID | Title | Priority | Test Steps | Expected Result | Status |
|:---|:---|:---|:---|:---|:---|
| **TC-MISC-001**| Sort Price (Low-High)| Medium | 1. Select Price (L to H) | Products sorted $7.99 -> $49.99. | ✅ PASS |
| **TC-MISC-002**| Sort Price (High-Low)| Medium | 1. Select Price (H to L) | Products sorted $49.99 -> $7.99. | ✅ PASS |
| **TC-MISC-003**| Sort Name (Z-A) | Low | 1. Select Name (Z to A) | Products sorted alphabetically in reverse. | ✅ PASS |
| **TC-MISC-004**| Logout Function | High | 1. Open Menu -> Logout | User returned to Login page. Session cleared. | ✅ PASS |
| **TC-MISC-005**| Reset App State | Medium | 1. Add item<br>2. Click "Reset" | Cart cleared (Requires refresh to see badge update). | ✅ PASS |
| **TC-MISC-006**| Direct URL Access | High | 1. Visit `/inventory.html` logged out| Redirected to Login with Error message. | ✅ PASS |
| **TC-MISC-007**| Social Media Links | Low | 1. Click social icons in footer | Open SauceLabs social pages in new tabs. | ✅ PASS |
| **TC-MISC-008**| About Link | Low | 1. Open Menu -> About | Redirected to saucelabs.com. | ✅ PASS |
