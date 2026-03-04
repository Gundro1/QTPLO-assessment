# SauceDemo Manual Test Cases
**Application URL:** https://www.saucedemo.com/  
**Date:** 2026-03-04  
**Tester:** QA Engineer  

---

## 1. LOGIN FEATURE

### TC-LOG-001: Valid Login with standard_user
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `standard_user`<br>2. Enter password: `secret_sauce`<br>3. Click the **Login** button |
| **Expected Result** | User is redirected to the inventory/products page (`/inventory.html`). Page title shows "Swag Labs". Products are displayed. |
| **Status** | — |

### TC-LOG-002: Login with locked_out_user
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `locked_out_user`<br>2. Enter password: `secret_sauce`<br>3. Click the **Login** button |
| **Expected Result** | An error message is displayed: **"Epic sadface: Sorry, this user has been locked out."** User remains on the login page. |
| **Status** | — |

### TC-LOG-003: Login with Empty Username
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Leave the Username field empty<br>2. Enter password: `secret_sauce`<br>3. Click the **Login** button |
| **Expected Result** | Error message: **"Epic sadface: Username is required"** |
| **Status** | — |

### TC-LOG-004: Login with Empty Password
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `standard_user`<br>2. Leave the Password field empty<br>3. Click the **Login** button |
| **Expected Result** | Error message: **"Epic sadface: Password is required"** |
| **Status** | — |

### TC-LOG-005: Login with Both Fields Empty
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Leave both Username and Password fields empty<br>2. Click the **Login** button |
| **Expected Result** | Error message: **"Epic sadface: Username is required"** |
| **Status** | — |

### TC-LOG-006: Login with Invalid Username
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `invalid_user`<br>2. Enter password: `secret_sauce`<br>3. Click the **Login** button |
| **Expected Result** | Error message: **"Epic sadface: Username and password do not match any user in this service"** |
| **Status** | — |

### TC-LOG-007: Login with Invalid Password
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `standard_user`<br>2. Enter password: `wrong_password`<br>3. Click the **Login** button |
| **Expected Result** | Error message: **"Epic sadface: Username and password do not match any user in this service"** |
| **Status** | — |

### TC-LOG-008: Login with Special Characters
| Field | Details |
|-------|---------|
| **Priority** | Low |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `<script>alert('XSS')</script>`<br>2. Enter password: `' OR '1'='1`<br>3. Click the **Login** button |
| **Expected Result** | No script execution or SQL injection. Error message for invalid credentials displayed. Application remains secure. |
| **Status** | — |

### TC-LOG-009: Login Error Message Can Be Dismissed
| Field | Details |
|-------|---------|
| **Priority** | Low |
| **Precondition** | An error message is visible on the login page |
| **Test Steps** | 1. Trigger any login error<br>2. Click the **X** button on the error message |
| **Expected Result** | Error message disappears. Error icons on input fields are removed. |
| **Status** | — |

### TC-LOG-010: Login with problem_user
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the SauceDemo login page |
| **Test Steps** | 1. Enter username: `problem_user`<br>2. Enter password: `secret_sauce`<br>3. Click the **Login** button |
| **Expected Result** | User is logged in and redirected to inventory page. (Note: This user may exhibit buggy behavior — product images may be incorrect or broken.) |
| **Status** | — |

---

## 2. ADDING PRODUCT TO CART

### TC-CART-001: Add Single Product to Cart from Inventory Page
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is logged in as `standard_user` and on the inventory page |
| **Test Steps** | 1. Click the **"Add to cart"** button next to any product (e.g., Sauce Labs Backpack)<br>2. Observe the button and cart icon |
| **Expected Result** | - Button text changes to **"Remove"**<br>- Cart badge icon appears showing **"1"** |
| **Status** | — |

### TC-CART-002: Add Multiple Products to Cart
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is logged in as `standard_user` and on the inventory page |
| **Test Steps** | 1. Click **"Add to cart"** for 3 different products<br>2. Observe the cart badge |
| **Expected Result** | - All three **"Add to cart"** buttons change to **"Remove"**<br>- Cart badge shows **"3"** |
| **Status** | — |

### TC-CART-003: Add Product from Product Detail Page
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is logged in as `standard_user` and on the inventory page |
| **Test Steps** | 1. Click on a product name/image to go to the product detail page<br>2. Click **"Add to cart"** on the detail page<br>3. Observe the button and cart badge |
| **Expected Result** | - Button changes to **"Remove"**<br>- Cart badge shows **"1"**<br>- Product detail page shows product name, description, and price |
| **Status** | — |

### TC-CART-004: Verify Cart Contents After Adding Product
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has added a product (e.g., Sauce Labs Backpack at $29.99) to cart |
| **Test Steps** | 1. Click the cart icon in the top-right corner<br>2. Observe the cart page contents |
| **Expected Result** | Cart page displays:<br>- Product name: **Sauce Labs Backpack**<br>- Product description<br>- Product price: **$29.99**<br>- Quantity: **1**<br>- **"Continue Shopping"** and **"Checkout"** buttons are visible |
| **Status** | — |

### TC-CART-005: Add All Available Products to Cart
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is logged in as `standard_user` and on the inventory page |
| **Test Steps** | 1. Click **"Add to cart"** for all 6 products on the inventory page<br>2. Observe the cart badge |
| **Expected Result** | - All 6 products' buttons show **"Remove"**<br>- Cart badge shows **"6"** |
| **Status** | — |

### TC-CART-006: Cart Badge Persists After Navigation
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User has added items to cart |
| **Test Steps** | 1. Add a product to cart<br>2. Click on another product's detail page<br>3. Navigate back to inventory |
| **Expected Result** | Cart badge number persists throughout navigation |
| **Status** | — |

---

## 3. REMOVING PRODUCT FROM CART

### TC-REM-001: Remove Product from Inventory Page
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has added a product to cart and is on the inventory page |
| **Test Steps** | 1. Click the **"Remove"** button on the previously added product<br>2. Observe the button and cart badge |
| **Expected Result** | - Button changes back to **"Add to cart"**<br>- Cart badge decrements by 1 (or disappears if cart is empty) |
| **Status** | — |

### TC-REM-002: Remove Product from Cart Page
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has added a product to cart |
| **Test Steps** | 1. Click the cart icon<br>2. Click the **"Remove"** button next to the product on the cart page |
| **Expected Result** | - Product is removed from the cart list<br>- Cart badge decrements by 1 (or disappears if cart is empty) |
| **Status** | — |

### TC-REM-003: Remove Product from Product Detail Page
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User has added a product to cart |
| **Test Steps** | 1. Click on the product name to go to the detail page<br>2. Click the **"Remove"** button |
| **Expected Result** | - Button changes back to **"Add to cart"**<br>- Cart badge decrements |
| **Status** | — |

### TC-REM-004: Remove All Products from Cart
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User has added 3 products to cart |
| **Test Steps** | 1. Go to the cart page<br>2. Click **"Remove"** on each product one by one |
| **Expected Result** | - All products removed from the cart<br>- Cart badge disappears completely<br>- Cart page shows no items |
| **Status** | — |

### TC-REM-005: Continue Shopping After Removing Item
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the cart page |
| **Test Steps** | 1. Click the **"Continue Shopping"** button on the cart page |
| **Expected Result** | User is redirected back to the inventory page (`/inventory.html`) |
| **Status** | — |

---

## 4. COMPLETING CHECKOUT PROCESS

### TC-CHK-001: Complete Full Checkout Successfully
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is logged in as `standard_user` and has at least 1 item in cart |
| **Test Steps** | 1. Click the cart icon<br>2. Click the **"Checkout"** button<br>3. Enter First Name: `John`<br>4. Enter Last Name: `Doe`<br>5. Enter Zip/Postal Code: `12345`<br>6. Click **"Continue"**<br>7. On the Overview page, verify item details, Payment Info, Shipping Info, and Total<br>8. Click **"Finish"** |
| **Expected Result** | Confirmation page displays:<br>- Header: **"Thank you for your order!"**<br>- Message: "Your order has been dispatched..."<br>- **"Back Home"** button is visible<br>- Cart badge disappears |
| **Status** | — |

### TC-CHK-002: Checkout with Missing First Name
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has items in cart and is on the Checkout: Your Information page |
| **Test Steps** | 1. Leave First Name empty<br>2. Enter Last Name: `Doe`<br>3. Enter Zip/Postal Code: `12345`<br>4. Click **"Continue"** |
| **Expected Result** | Error message: **"Error: First Name is required"** |
| **Status** | — |

### TC-CHK-003: Checkout with Missing Last Name
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has items in cart and is on the Checkout: Your Information page |
| **Test Steps** | 1. Enter First Name: `John`<br>2. Leave Last Name empty<br>3. Enter Zip/Postal Code: `12345`<br>4. Click **"Continue"** |
| **Expected Result** | Error message: **"Error: Last Name is required"** |
| **Status** | — |

### TC-CHK-004: Checkout with Missing Zip/Postal Code
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has items in cart and is on the Checkout: Your Information page |
| **Test Steps** | 1. Enter First Name: `John`<br>2. Enter Last Name: `Doe`<br>3. Leave Zip/Postal Code empty<br>4. Click **"Continue"** |
| **Expected Result** | Error message: **"Error: Postal Code is required"** |
| **Status** | — |

### TC-CHK-005: Checkout with All Fields Empty
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User has items in cart and is on the Checkout: Your Information page |
| **Test Steps** | 1. Leave all fields empty<br>2. Click **"Continue"** |
| **Expected Result** | Error message: **"Error: First Name is required"** (first validation fires) |
| **Status** | — |

### TC-CHK-006: Verify Checkout Overview Page Details
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has added "Sauce Labs Backpack" ($29.99) and filled in checkout info |
| **Test Steps** | 1. On the Checkout: Overview page, verify:<br>  - Product name, quantity, price<br>  - Payment Information section<br>  - Shipping Information section<br>  - Item total, Tax, and Total |
| **Expected Result** | - Item total: **$29.99**<br>- Tax is calculated (8% ≈ $2.40)<br>- Total: **$32.39**<br>- Payment Info: "SauceCard #31337"<br>- Shipping Info: "Free Pony Express Delivery!"<br>- **"Cancel"** and **"Finish"** buttons visible |
| **Status** | — |

### TC-CHK-007: Cancel Checkout from Overview Page
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the Checkout: Overview page |
| **Test Steps** | 1. Click the **"Cancel"** button on the overview page |
| **Expected Result** | User is redirected back to the inventory page. Cart still contains the items. |
| **Status** | — |

### TC-CHK-008: Cancel Checkout from Information Page
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is on the Checkout: Your Information page |
| **Test Steps** | 1. Click the **"Cancel"** button |
| **Expected Result** | User is redirected back to the cart page. Items remain in the cart. |
| **Status** | — |

### TC-CHK-009: Back Home After Successful Checkout
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User has completed checkout and is on the confirmation page |
| **Test Steps** | 1. Click the **"Back Home"** button |
| **Expected Result** | User is redirected to the inventory page. Cart badge is not visible (cart is empty). |
| **Status** | — |

### TC-CHK-010: Checkout with Multiple Products
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User has added 3 products to cart |
| **Test Steps** | 1. Proceed through full checkout flow<br>2. On overview page, verify all 3 items are listed<br>3. Verify item total is the sum of all 3 prices<br>4. Verify tax and total are calculated correctly<br>5. Click **"Finish"** |
| **Expected Result** | All 3 items appear in overview. Totals are sum of all items. Order confirmation is shown. |
| **Status** | — |

---

## 5. ADDITIONAL / EDGE CASE SCENARIOS

### TC-MISC-001: Sort Products by Price (Low to High)
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is logged in and on the inventory page |
| **Test Steps** | 1. Click the sort dropdown (default: "Name (A to Z)")<br>2. Select **"Price (low to high)"** |
| **Expected Result** | Products are listed in ascending order by price |
| **Status** | — |

### TC-MISC-002: Sort Products by Price (High to Low)
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is logged in and on the inventory page |
| **Test Steps** | 1. Select **"Price (high to low)"** from the sort dropdown |
| **Expected Result** | Products are listed in descending order by price |
| **Status** | — |

### TC-MISC-003: Sort Products by Name (Z to A)
| Field | Details |
|-------|---------|
| **Priority** | Low |
| **Precondition** | User is logged in and on the inventory page |
| **Test Steps** | 1. Select **"Name (Z to A)"** from the sort dropdown |
| **Expected Result** | Products are listed in reverse alphabetical order |
| **Status** | — |

### TC-MISC-004: Hamburger Menu - Logout
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is logged in |
| **Test Steps** | 1. Click the hamburger menu icon (top-left)<br>2. Click **"Logout"** |
| **Expected Result** | User is redirected to the login page. Session is ended. |
| **Status** | — |

### TC-MISC-005: Hamburger Menu - Reset App State
| Field | Details |
|-------|---------|
| **Priority** | Medium |
| **Precondition** | User is logged in with items in cart |
| **Test Steps** | 1. Click the hamburger menu icon<br>2. Click **"Reset App State"** |
| **Expected Result** | Cart badge is removed. All "Remove" buttons reset to "Add to cart". |
| **Status** | — |

### TC-MISC-006: Direct URL Access Without Login
| Field | Details |
|-------|---------|
| **Priority** | High |
| **Precondition** | User is NOT logged in |
| **Test Steps** | 1. Navigate directly to `https://www.saucedemo.com/inventory.html` |
| **Expected Result** | User is redirected to login page OR an error message is displayed: **"Epic sadface: You can only access '/inventory.html' when you are logged in."** |
| **Status** | — |

### TC-MISC-007: Social Media Links on Footer
| Field | Details |
|-------|---------|
| **Priority** | Low |
| **Precondition** | User is logged in and on the inventory page |
| **Test Steps** | 1. Scroll to the footer<br>2. Verify Twitter, Facebook, and LinkedIn links are present<br>3. Click each link |
| **Expected Result** | Each link opens the correct SauceLabs social media page in a new tab |
| **Status** | — |

### TC-MISC-008: About Link in Hamburger Menu
| Field | Details |
|-------|---------|
| **Priority** | Low |
| **Precondition** | User is logged in |
| **Test Steps** | 1. Click the hamburger menu<br>2. Click **"About"** |
| **Expected Result** | User is redirected to the SauceLabs website (https://saucelabs.com/) |
| **Status** | — |

---

**Total Test Cases: 33**

| Category | Count |
|----------|-------|
| Login | 10 |
| Add to Cart | 6 |
| Remove from Cart | 5 |
| Checkout | 10 |
| Miscellaneous / Edge Cases | 8 |
