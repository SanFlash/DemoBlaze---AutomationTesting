# 🛒 DemoBlaze Automation Framework (Playwright + JavaScript)

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📌 Overview

This project is an **End-to-End Automation Framework** for the DemoBlaze e-commerce website, built using **Playwright and JavaScript**.

It automates real user workflows such as:

* Navigation across categories
* Product selection
* Cart management
* Price validation
* Checkout process

The framework follows the **Page Object Model (POM)** design pattern for better structure and reusability.

---

## 🚀 Features Covered

* 🔐 Login / Authentication flow
* 🧭 Navigation across categories (Phones, Laptops, Monitors)
* 🛍️ Product selection (including random selection)
* ➕ Add to cart functionality
* ❌ Delete items from cart dynamically
* 🔢 Cart item count validation
* 💰 Price sum vs total validation
* 🧾 Checkout process automation
* ⚡ Handling alerts and popups

---

## 🛠️ Tech Stack

* 🎭 Playwright
* 🟨 JavaScript (Node.js)
* 🧱 Page Object Model (POM)

---

## 📂 Project Structure

```id="9xq7lk"
project/
│
├── pages/                 # Page Object Models
│   ├── LandingPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│
├── tests/                 # Test files
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│
├── playwright.config.js
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```id="q4zn8n"
npm install
```

### 2️⃣ Install browsers

```id="rzb1n4"
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```id="4q6tvc"
npx playwright test
```

### Run specific test

```id="7d5m7h"
npx playwright test tests/cart.spec.js
```

### Run in headed mode

```id="4zt2fh"
npx playwright test --headed
```

---

## 📊 Reports

```id="0y6zqj"
npx playwright show-report
```

---

## 🧠 Key Learnings

* Handling **dynamic UI updates (cart operations)**
* Managing **alerts in Playwright**
* Implementing **robust wait strategies**
* Building **scalable POM architecture**

---

## ⚠️ Challenges Handled

* Async cart updates (no page reload)
* Delayed total price calculation
* Dynamic DOM updates after delete
* Alert handling for add-to-cart

---

## 🔄 Sample Flow

1. Open DemoBlaze
2. Login user
3. Select products (random/manual)
4. Add items to cart
5. Validate cart count and price
6. Delete extra items
7. Complete checkout

---

## 🚀 Future Enhancements

* CI/CD integration (GitHub Actions)
* Data-driven testing
* API validation integration
* Advanced reporting (Allure)

---

## 👨‍💻 Author

**Satyendra Namdeo**

---

## ⭐ Support

If you found this useful, consider giving this repository a ⭐
