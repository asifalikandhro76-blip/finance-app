# 💰 Sarmaya (سرمایہ) - Personal Finance & Daily Activity Tracker

A clean, modern, and aesthetic personal finance web application built for daily use. Keep track of day-to-day income, grocery expenses, utility bills, bike/car fuel, mobile packages, dining out, travel, and more.

---

## 🌟 Key Features

### 1. ⚡ Direct Quick Links on Top (Instant Expense Adding)
- Pinned at the top of the dashboard for lightning-fast 1-click recording:
  - 🛵 **+ Bike / Fuel** (Petrol, oil change, tuning)
  - 🛒 **+ Grocery** (Supermarket, rashan, milk, veggies)
  - ⚡ **+ Utility** (Electricity, gas, water, internet)
  - 📱 **+ Mobile** (Card recharge, postpaid, 4G bundles)
  - 🍽️ **+ Outing** (Restaurants, cafes, chai dhaba)
  - ✈️ **+ Travel** (Careem, indrive, buses, train, trips)
  - 📦 **+ Other** (Miscellaneous items)
  - 💵 **+ Add Income** (Salary, freelance, dividends)
- Clicking any button immediately opens the entry modal with the category pre-selected and the amount field focused for instant entry.

### 2. ✏️ 100% Editable Figures
- **Editable Salary**: Click the **"Edit"** pencil badge right on the **Monthly Salary** hero card to change your salary at any time. All balances, savings rates, and cashflow charts recalculate immediately in real-time.
- **Editable Category Budgets**: Click on any target budget figure under the **"Category Budgets & Limits"** panel (or use the *Edit Budgets* modal) to customize your monthly target.
- **Editable Transactions**: Every transaction in the activity log has an **Edit (pencil)** button to update amount, description, date, payment method, or notes, plus a **Delete (trash)** button for clean-up.

### 3. 🇵🇰 Default PKR with Currency Switching (USD, EUR, GBP, AED, SAR)
- **Default Currency**: **PKR (₨)**.
- **Instant Switcher**: Seamlessly switch between **PKR (₨)**, **USD ($)**, **EUR (€)**, **GBP (£)**, **AED (د.إ)**, and **SAR (﷼)**.
- **Configurable Exchange Rates**: Click the **Exchange Rates** button (↔️) in the header to view or customize the exchange rates anytime. All values display converted cleanly with proper locale formatting.

### 4. 🎨 Neat & Clean Aesthetic Display
- **Minimalist Fintech Design**: High-contrast, clean typography (Plus Jakarta Sans & Inter), soft shadows, and clean cards.
- **Dark & Light Mode**: Toggle anytime via the Moon/Sun icon on top (persisted automatically).
- **Interactive Visualizations**:
  - Category Breakdown **Donut Chart** with centered total spend.
  - Cashflow balance **Bar Chart** (Income vs Expenses vs Net Savings).
  - Category budget progress bars with automatic color alerts (Green < 70%, Yellow 70-90%, Red > 90%).

### 5. 💳 Pakistan-Tailored Payment Modes
- Support for:
  - Cash (نقد)
  - Bank Account Transfer (Meezan, HBL, Alfalah, etc.)
  - Raast ID
  - JazzCash
  - EasyPaisa
  - SadaPay / NayaPay
  - Credit & Debit Cards

### 6. 🔒 100% Offline, Private & Persistent
- All your figures and transactions are saved locally on your computer (`localStorage`). No private data is ever sent to any remote server.
- **Data Export to CSV**: One-click export to open in Microsoft Excel or Google Sheets.
- **Full Backup / Restore**: Download a `.json` backup file anytime and restore it whenever you want.

---

## 🚀 How to Run the App

1. Simply double-click **`open-sarmaya.bat`** OR double-click **`index.html`** in this folder.
2. It immediately opens in your default web browser (Google Chrome, Microsoft Edge, Firefox, Brave, etc.).
3. No server, Node.js, or Python installation is required!

---

## ⌨️ Keyboard Shortcuts
- **`N`**: Quick add new transaction
- **`Esc`**: Close any open popup / modal
