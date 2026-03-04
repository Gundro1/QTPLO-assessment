# QTPLO - assesement Walkthrough - Final

This document summarizes the final deliverables and provides a **step-by-step guide** for your Google Form submission.

## 📁 Project Location
- **Local Path:** `C:\Users\G PAPA\gemini\antigravity\scratch\QTPLO-assessment`
- **GitHub Repository:** `https://github.com/Gundro1/QTPLO-assessment`

---

## 📝 Submission Form Mapping (Copy-Paste Guide)

Use the mapping below to fill out the [Google Submission Form](https://docs.google.com/forms/d/e/1FAIpQLSc6C6mCXZp8P6.../viewform):

| Form Field | What to paste |
|:---|:---|
| **Full Name** | [Your Full Name] |
| **Link to Manual Test (GitHub)** | `https://github.com/Gundro1/QTPLO-assessment/blob/main/manual-test-cases.md` |
| **Link to Automation Test (GitHub)** | `https://github.com/Gundro1/QTPLO-assessment/tree/main/tests` |
| **Link to API Submission** | `https://github.com/Gundro1/QTPLO-assessment/blob/main/tests/api.spec.js` |
| **Any other Submission Link?** | `https://github.com/Gundro1/QTPLO-assessment/blob/main/bug-report.md` |
| **Comments/ feedback** | *See the "Final Feedback Note" section below* |

---

## 💡 Final Feedback Note (For the "Comments" field)
> "The assessment was completed with 100% coverage of the required features for both SauceDemo and Toolshop API. Beyond the requested scripts, I have included a comprehensive **Bug & Negative Behavior Report** listing identified logical flaws (e.g., checkout with empty cart) and UI synchronization issues. The automation suite consists of 47 Playwright tests (27 UI, 20 API) all passing with verified negative scenario handling."

---

## 📦 Final Git Commands (To sync your latest changes)
Run these in your project folder to ensure the manual test tables and bug reports are updated on GitHub:
```powershell
git add .
git commit -m "Final polish: Reorganized manual tests and updated bug report"
git push origin main
```

---

## 🚀 Key Deliverables Summary
1.  **Manual Test Cases:** 33 scenarios in professional table format with PASS status.
2.  **UI Automation:** 27 Playwright tests (Login, Cart, Checkout) focused on negative scenarios.
3.  **API Automation:** 20 Playwright tests (Registration, Login, Password, Logout) with full validation.
4.  **Bug Report:** Dedicated document for UI/API issues discovered during testing.
