/**
 * FinFlow / Sarmaya - Personal Finance Web App
 * Designed for day-to-day financial tracking with PKR default, USD/EUR support,
 * editable figures, quick-action logging, and aesthetic fintech UI.
 */

// =============================================================================
// 1. CONSTANTS & INITIAL CONFIGURATION
// =============================================================================

const STORAGE_KEY = 'finflow_sarmaya_data_v2';
const THEME_KEY = 'finflow_theme_mode';

// Available currencies & exchange rates relative to PKR
const CURRENCIES = {
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rateToPKR: 1, format: '₨ #,##0' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToPKR: 278.50, format: '$#,##0.00' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToPKR: 302.20, format: '€#,##0.00' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToPKR: 354.00, format: '£#,##0.00' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rateToPKR: 75.80, format: 'د.إ #,##0' },
  SAR: { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rateToPKR: 74.20, format: '﷼ #,##0' }
};

// Built-in categories tailored to Pakistani day-to-day finances
const DEFAULT_CATEGORIES = {
  // Expense Categories
  grocery: { id: 'grocery', name: 'Grocery & Ration', icon: 'shopping-cart', color: '#10b981', type: 'expense', defaultBudget: 25000 },
  bike_car: { id: 'bike_car', name: 'Bike / Car / Fuel', icon: 'fuel', color: '#0ea5e9', type: 'expense', defaultBudget: 12000 },
  utility: { id: 'utility', name: 'Utility & Bills', icon: 'zap', color: '#f59e0b', type: 'expense', defaultBudget: 15000 },
  mobile: { id: 'mobile', name: 'Mobile & Internet', icon: 'smartphone', color: '#8b5cf6', type: 'expense', defaultBudget: 3500 },
  outing: { id: 'outing', name: 'Outing & Dining', icon: 'utensils', color: '#ec4899', type: 'expense', defaultBudget: 8000 },
  travel: { id: 'travel', name: 'Travel & Commute', icon: 'plane', color: '#06b6d4', type: 'expense', defaultBudget: 5000 },
  health: { id: 'health', name: 'Health & Medical', icon: 'activity', color: '#ef4444', type: 'expense', defaultBudget: 4000 },
  home: { id: 'home', name: 'Home & Rent', icon: 'home', color: '#6366f1', type: 'expense', defaultBudget: 35000 },
  charity: { id: 'charity', name: 'Sadqah & Charity', icon: 'heart', color: '#14b8a6', type: 'expense', defaultBudget: 3000 },
  other: { id: 'other', name: 'Other Expenses', icon: 'more-horizontal', color: '#64748b', type: 'expense', defaultBudget: 5000 },
  
  // Income Categories
  salary: { id: 'salary', name: 'Salary', icon: 'briefcase', color: '#10b981', type: 'income', defaultBudget: 0 },
  freelance: { id: 'freelance', name: 'Freelance / Side Gig', icon: 'laptop', color: '#3b82f6', type: 'income', defaultBudget: 0 },
  investment: { id: 'investment', name: 'Profit / Dividend', icon: 'trending-up', color: '#8b5cf6', type: 'income', defaultBudget: 0 },
  other_income: { id: 'other_income', name: 'Other Income', icon: 'plus-circle', color: '#06b6d4', type: 'income', defaultBudget: 0 }
};

// Payment Modes
const PAYMENT_MODES = [
  { id: 'cash', name: 'Cash (نقد)' },
  { id: 'bank', name: 'Bank Transfer' },
  { id: 'raast', name: 'Raast ID' },
  { id: 'jazzcash', name: 'JazzCash' },
  { id: 'easypaisa', name: 'EasyPaisa' },
  { id: 'sadapay', name: 'SadaPay / NayaPay' },
  { id: 'card', name: 'Debit / Credit Card' }
];

// Helper to get formatted date string (YYYY-MM-DD)
function getFormattedDateOffset(daysOffset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

// Seed realistic Pakistani demo transactions if new user
const INITIAL_SEED_DATA = {
  monthlySalary: 150000,
  selectedCurrency: 'PKR',
  exchangeRates: {
    USD: 278.5,
    EUR: 302.2,
    GBP: 354.0,
    AED: 75.8,
    SAR: 74.2
  },
  budgets: {
    grocery: 25000,
    bike_car: 12000,
    utility: 15000,
    mobile: 3500,
    outing: 8000,
    travel: 5000,
    health: 4000,
    other: 5000
  },
  transactions: [
    {
      id: 'tx_seed_1',
      type: 'income',
      category: 'salary',
      amount: 150000,
      title: 'Monthly Salary Credit',
      date: getFormattedDateOffset(0),
      paymentMethod: 'bank',
      notes: 'Company payroll transfer'
    },
    {
      id: 'tx_seed_2',
      type: 'expense',
      category: 'bike_car',
      amount: 4500,
      title: 'Bike & Car Fuel refill',
      date: getFormattedDateOffset(0),
      paymentMethod: 'card',
      notes: 'Shell Super Unleaded Petrol'
    },
    {
      id: 'tx_seed_3',
      type: 'expense',
      category: 'grocery',
      amount: 8200,
      title: 'Weekly Supermarket Rashan',
      date: getFormattedDateOffset(-1),
      paymentMethod: 'sadapay',
      notes: 'Atta, Daal, Cooking Oil, Fruits, Milk'
    },
    {
      id: 'tx_seed_4',
      type: 'expense',
      category: 'utility',
      amount: 9800,
      title: 'Electricity Bill',
      date: getFormattedDateOffset(-2),
      paymentMethod: 'bank',
      notes: 'Monthly electric power payment'
    },
    {
      id: 'tx_seed_5',
      type: 'expense',
      category: 'outing',
      amount: 2850,
      title: 'Family Dinner Outing',
      date: getFormattedDateOffset(-3),
      paymentMethod: 'cash',
      notes: 'BBQ and Chai dhaba'
    },
    {
      id: 'tx_seed_6',
      type: 'expense',
      category: 'mobile',
      amount: 1800,
      title: 'Postpaid & 4G Internet Package',
      date: getFormattedDateOffset(-4),
      paymentMethod: 'jazzcash',
      notes: 'Monthly Super Card bundle'
    },
    {
      id: 'tx_seed_7',
      type: 'expense',
      category: 'travel',
      amount: 1200,
      title: 'Careem / Ride Commute',
      date: getFormattedDateOffset(-5),
      paymentMethod: 'easypaisa',
      notes: 'Office ride commute'
    }
  ]
};

// =============================================================================
// 2. STATE MANAGEMENT
// =============================================================================

let appState = {
  monthlySalary: 150000,
  selectedCurrency: 'PKR',
  exchangeRates: { ...INITIAL_SEED_DATA.exchangeRates },
  budgets: { ...INITIAL_SEED_DATA.budgets },
  transactions: [],
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    period: 'current-month'
  },
  editingTxId: null
};

// Charts references
let categoryDonutChart = null;
let trendBarChart = null;

// Helper to get formatted date string (YYYY-MM-DD)
function getFormattedDateOffset(daysOffset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
}

// Load state from localStorage or initialize
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState = {
        ...appState,
        ...parsed,
        budgets: { ...INITIAL_SEED_DATA.budgets, ...(parsed.budgets || {}) },
        exchangeRates: { ...INITIAL_SEED_DATA.exchangeRates, ...(parsed.exchangeRates || {}) }
      };
      if (!Array.isArray(appState.transactions)) {
        appState.transactions = [];
      }
    } catch (e) {
      console.error('Failed to parse saved state, loading seed data', e);
      appState.transactions = [...INITIAL_SEED_DATA.transactions];
    }
  } else {
    // Initial First-Time Setup
    appState = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
    saveState();
  }
}

// Persist state to localStorage
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    monthlySalary: appState.monthlySalary,
    selectedCurrency: appState.selectedCurrency,
    exchangeRates: appState.exchangeRates,
    budgets: appState.budgets,
    transactions: appState.transactions
  }));
}

// =============================================================================
// 3. CURRENCY CONVERSION & FORMATTING
// =============================================================================

function convertFromPKR(amountInPKR, targetCurrency = appState.selectedCurrency) {
  if (targetCurrency === 'PKR') return amountInPKR;
  const rate = appState.exchangeRates[targetCurrency] || CURRENCIES[targetCurrency]?.rateToPKR || 1;
  return amountInPKR / rate;
}

function convertToPKR(amountInTarget, sourceCurrency = appState.selectedCurrency) {
  if (sourceCurrency === 'PKR') return amountInTarget;
  const rate = appState.exchangeRates[sourceCurrency] || CURRENCIES[sourceCurrency]?.rateToPKR || 1;
  return amountInTarget * rate;
}

function formatMoney(amountInPKR, currencyCode = appState.selectedCurrency) {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.PKR;
  const converted = convertFromPKR(amountInPKR, currencyCode);

  let formattedNum = '';
  if (currencyCode === 'PKR' || currencyCode === 'AED' || currencyCode === 'SAR') {
    formattedNum = Math.round(converted).toLocaleString('en-US');
  } else {
    formattedNum = converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  return `${curr.symbol} ${formattedNum}`;
}

function getCurrencySymbol(code = appState.selectedCurrency) {
  return CURRENCIES[code]?.symbol || '₨';
}

// =============================================================================
// 4. UI INITIALIZATION & EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTheme();
  setupEventListeners();
  renderApp();
  renderLucideIcons();
});

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
  updateThemeIcon(newTheme);
  if (categoryDonutChart) updateCharts();
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' 
    ? '<i data-lucide="sun"></i>' 
    : '<i data-lucide="moon"></i>';
  renderLucideIcons();
}

function renderLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

// Setup all click handlers and modal triggers
function setupEventListeners() {
  // Theme Toggle
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

  // Currency Selector
  const currencySelect = document.getElementById('currencySelector');
  if (currencySelect) {
    currencySelect.value = appState.selectedCurrency;
    currencySelect.addEventListener('change', (e) => {
      appState.selectedCurrency = e.target.value;
      saveState();
      renderApp();
    });
  }

  // Quick Action Buttons on Top
  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      const type = btn.getAttribute('data-type') || 'expense';
      openTransactionModal({ type, category });
    });
  });

  // Main Add Transaction Button in Header
  document.getElementById('headerAddTxBtn')?.addEventListener('click', () => {
    openTransactionModal({ type: 'expense', category: 'grocery' });
  });

  // Editable Salary inline triggers
  document.getElementById('editSalaryBtn')?.addEventListener('click', openSalaryModal);

  // Budget Edit trigger
  document.getElementById('editBudgetsBtn')?.addEventListener('click', openBudgetSettingsModal);

  // Backup & Restore buttons
  document.getElementById('exportCsvBtn')?.addEventListener('click', exportToCSV);
  document.getElementById('backupJsonBtn')?.addEventListener('click', exportToJSON);
  document.getElementById('importDataInput')?.addEventListener('change', handleImportJSON);
  document.getElementById('resetDataBtn')?.addEventListener('click', confirmResetData);

  // Filter and search handlers
  document.getElementById('txSearchInput')?.addEventListener('input', (e) => {
    appState.filters.search = e.target.value.trim().toLowerCase();
    renderTransactionsList();
  });

  document.getElementById('txCategoryFilter')?.addEventListener('change', (e) => {
    appState.filters.category = e.target.value;
    renderTransactionsList();
  });

  document.getElementById('txPeriodFilter')?.addEventListener('change', (e) => {
    appState.filters.period = e.target.value;
    renderApp();
  });

  // Modal Close buttons
  document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  // Modal Overlays background click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // Transaction Form submit
  document.getElementById('txForm')?.addEventListener('submit', handleTransactionSubmit);

  // Salary Form submit
  document.getElementById('salaryForm')?.addEventListener('submit', handleSalarySubmit);

  // Exchange Rate Form submit
  document.getElementById('rateForm')?.addEventListener('submit', handleRatesSubmit);
  document.getElementById('manageRatesBtn')?.addEventListener('click', openRatesModal);

  // Transaction Modal Type toggle (Expense vs Income)
  document.querySelectorAll('.type-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      setTypeToggle(type);
    });
  });

  // Keyboard shortcut: Escape to close modals, 'N' for new expense
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
    if ((e.key === 'n' || e.key === 'N') && !isInputFocused() && !isModalOpen()) {
      e.preventDefault();
      openTransactionModal({ type: 'expense', category: 'grocery' });
    }
  });
}

function isInputFocused() {
  const active = document.activeElement;
  return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');
}

function isModalOpen() {
  return document.querySelector('.modal-overlay.active') !== null;
}

// =============================================================================
// 5. RENDERING THE MAIN APPLICATION
// =============================================================================

function renderApp() {
  updateHeroStats();
  renderBudgetBars();
  renderTransactionsList();
  updateCharts();
  populateCategorySelects();
  renderLucideIcons();
}

// Filter transactions by the selected period (Current Month, Last Month, etc.)
function getFilteredPeriodTransactions() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  return appState.transactions.filter(tx => {
    if (!tx.date) return false;
    const txDate = new Date(tx.date);
    const txYear = txDate.getFullYear();
    const txMonth = txDate.getMonth();

    if (appState.filters.period === 'current-month') {
      return txYear === currentYear && txMonth === currentMonth;
    } else if (appState.filters.period === 'last-month') {
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return txYear === lastMonthYear && txMonth === lastMonth;
    } else if (appState.filters.period === 'this-year') {
      return txYear === currentYear;
    }
    return true; // 'all'
  });
}

// Calculate and render hero metric cards
function updateHeroStats() {
  const periodTxs = getFilteredPeriodTransactions();

  // Calculate total expenses and extra incomes
  let totalExpenses = 0;
  let totalExtraIncome = 0;

  periodTxs.forEach(tx => {
    const amt = parseFloat(tx.amount) || 0;
    if (tx.type === 'expense') {
      totalExpenses += amt;
    } else if (tx.type === 'income') {
      // If user logs salary as a transaction, we handle it gracefully
      if (tx.category === 'salary') {
        // counted in base income
      } else {
        totalExtraIncome += amt;
      }
    }
  });

  // Effective Total Monthly Income = Base Salary + Extra Incomes logged
  const totalIncome = appState.monthlySalary + totalExtraIncome;
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.max(0, Math.round((netBalance / totalIncome) * 100)) : 0;

  // Days elapsed in the current month for daily average
  const now = new Date();
  const dayOfMonth = Math.max(1, now.getDate());
  const dailyAverageSpend = totalExpenses / dayOfMonth;

  // Update DOM Elements
  const elSalary = document.getElementById('statSalaryVal');
  const elExpense = document.getElementById('statExpenseVal');
  const elBalance = document.getElementById('statBalanceVal');
  const elDaily = document.getElementById('statDailyVal');
  const elSavingsBadge = document.getElementById('statSavingsRate');
  const elCurrSymbol = document.querySelectorAll('.stat-currency-sym');

  const currSym = getCurrencySymbol();
  elCurrSymbol.forEach(el => el.textContent = currSym);

  if (elSalary) elSalary.textContent = formatConvertedValue(appState.monthlySalary);
  if (elExpense) elExpense.textContent = formatConvertedValue(totalExpenses);
  if (elBalance) elBalance.textContent = formatConvertedValue(netBalance);
  if (elDaily) elDaily.textContent = formatConvertedValue(dailyAverageSpend);

  const elExpenseCount = document.getElementById('statExpenseCount');
  if (elExpenseCount) {
    const count = periodTxs.filter(t => t.type === 'expense').length;
    elExpenseCount.textContent = `${count} item${count === 1 ? '' : 's'} recorded`;
  }

  if (elSavingsBadge) {
    elSavingsBadge.textContent = `${savingsRate}% Saved`;
    elSavingsBadge.style.color = savingsRate >= 20 ? 'var(--success)' : (savingsRate >= 0 ? 'var(--warning)' : 'var(--danger)');
  }

  // Update Period Label
  const periodLabel = document.getElementById('currentPeriodLabel');
  if (periodLabel) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    periodLabel.textContent = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  }
}

function formatConvertedValue(pkrAmount) {
  const converted = convertFromPKR(pkrAmount);
  if (appState.selectedCurrency === 'PKR' || appState.selectedCurrency === 'AED' || appState.selectedCurrency === 'SAR') {
    return Math.round(converted).toLocaleString('en-US');
  }
  return converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Budget Progress Cards (Grocery, Bike/Car, Utility, Mobile, Outing, etc.)
function renderBudgetBars() {
  const container = document.getElementById('budgetListContainer');
  if (!container) return;

  const periodTxs = getFilteredPeriodTransactions().filter(tx => tx.type === 'expense');

  // Sum expenses per category
  const spendByCat = {};
  periodTxs.forEach(tx => {
    spendByCat[tx.category] = (spendByCat[tx.category] || 0) + (parseFloat(tx.amount) || 0);
  });

  const categoriesToShow = ['grocery', 'bike_car', 'utility', 'mobile', 'outing', 'travel'];

  let html = '';
  categoriesToShow.forEach(catId => {
    const cat = DEFAULT_CATEGORIES[catId];
    if (!cat) return;

    const spent = spendByCat[catId] || 0;
    const budget = appState.budgets[catId] || cat.defaultBudget || 10000;
    const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
    
    let statusClass = 'status-safe';
    if (percent > 90) statusClass = 'status-danger';
    else if (percent > 70) statusClass = 'status-warning';

    html += `
      <div class="budget-item" data-cat-id="${catId}">
        <div class="budget-item-top">
          <div class="budget-cat-name">
            <span class="budget-cat-icon" style="background-color: ${cat.color}20; color: ${cat.color}">
              <i data-lucide="${cat.icon}"></i>
            </span>
            <span>${cat.name}</span>
          </div>
          <div class="budget-amounts">
            <span class="budget-spent">${formatMoney(spent)}</span>
            <span style="color: var(--text-muted)"> / </span>
            <span class="budget-limit-edit" title="Click to edit budget" onclick="quickEditBudget('${catId}')">${formatMoney(budget)}</span>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill ${statusClass}" style="width: ${percent}%;"></div>
        </div>
        <div class="budget-item-sub">
          <span>${percent}% used</span>
          <span>${formatMoney(Math.max(0, budget - spent))} remaining</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  renderLucideIcons();
}

// Quick edit budget for a category
window.quickEditBudget = function(catId) {
  const cat = DEFAULT_CATEGORIES[catId];
  if (!cat) return;
  const currentBudget = appState.budgets[catId] || cat.defaultBudget;
  const currSym = getCurrencySymbol();
  const currentValFormatted = Math.round(convertFromPKR(currentBudget));

  const promptVal = prompt(`Set Monthly Budget for ${cat.name} (${appState.selectedCurrency}):`, currentValFormatted);
  if (promptVal !== null) {
    const num = parseFloat(promptVal.replace(/[^0-9.]/g, ''));
    if (!isNaN(num) && num >= 0) {
      appState.budgets[catId] = convertToPKR(num);
      saveState();
      renderApp();
      showToast(`Budget for ${cat.name} updated to ${formatMoney(appState.budgets[catId])}`, 'success');
    }
  }
};

// =============================================================================
// 6. TRANSACTION LOG & FILTERING
// =============================================================================

function renderTransactionsList() {
  const container = document.getElementById('txListContainer');
  if (!container) return;

  const searchQuery = appState.filters.search;
  const catFilter = appState.filters.category;
  const periodTxs = getFilteredPeriodTransactions();

  // Apply search & category filter
  const filtered = periodTxs.filter(tx => {
    // Category match
    if (catFilter !== 'all' && tx.category !== catFilter) {
      return false;
    }
    // Search match (title, note, amount, category name)
    if (searchQuery) {
      const catName = DEFAULT_CATEGORIES[tx.category]?.name.toLowerCase() || '';
      const title = (tx.title || '').toLowerCase();
      const notes = (tx.notes || '').toLowerCase();
      const amtStr = String(tx.amount);
      if (!title.includes(searchQuery) && !notes.includes(searchQuery) && !catName.includes(searchQuery) && !amtStr.includes(searchQuery)) {
        return false;
      }
    }
    return true;
  });

  // Sort descending by date
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="tx-empty-state">
        <div class="tx-empty-icon"><i data-lucide="receipt"></i></div>
        <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">No transactions found</p>
        <p style="font-size: 0.8rem;">Click any quick button on top (like "+ Bike / Fuel" or "+ Grocery") to record your first expense.</p>
      </div>
    `;
    renderLucideIcons();
    return;
  }

  let html = '';
  filtered.forEach(tx => {
    const cat = DEFAULT_CATEGORIES[tx.category] || { name: 'Expense', icon: 'tag', color: '#64748b' };
    const isExpense = tx.type === 'expense';
    const sign = isExpense ? '-' : '+';
    const amountClass = isExpense ? 'is-expense' : 'is-income';
    const paymentLabel = PAYMENT_MODES.find(m => m.id === tx.paymentMethod)?.name || 'Cash';

    html += `
      <div class="tx-item">
        <div class="tx-left">
          <div class="tx-cat-icon" style="background-color: ${cat.color}20; color: ${cat.color}">
            <i data-lucide="${cat.icon}"></i>
          </div>
          <div class="tx-info">
            <span class="tx-title">${escapeHtml(tx.title || cat.name)}</span>
            <div class="tx-meta">
              <span>${formatDatePretty(tx.date)}</span>
              <span>•</span>
              <span class="tx-meta-badge">${paymentLabel}</span>
              ${tx.notes ? `<span>•</span> <span style="font-style: italic;">"${escapeHtml(tx.notes)}"</span>` : ''}
            </div>
          </div>
        </div>
        <div class="tx-right">
          <span class="tx-amount ${amountClass} amount-text">${sign}${formatMoney(tx.amount)}</span>
          <div class="tx-actions">
            <button class="btn-tx-action" title="Edit figure" onclick="editTransaction('${tx.id}')">
              <i data-lucide="edit-2"></i>
            </button>
            <button class="btn-tx-action delete" title="Delete" onclick="deleteTransaction('${tx.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  renderLucideIcons();
}

function formatDatePretty(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// =============================================================================
// 7. CHART.JS ANALYTICS & VISUALIZATIONS
// =============================================================================

function updateCharts() {
  if (typeof Chart === 'undefined') return;

  const periodTxs = getFilteredPeriodTransactions().filter(tx => tx.type === 'expense');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';

  // Group expenses by category
  const catTotals = {};
  let totalExpenses = 0;

  periodTxs.forEach(tx => {
    const amt = parseFloat(tx.amount) || 0;
    catTotals[tx.category] = (catTotals[tx.category] || 0) + amt;
    totalExpenses += amt;
  });

  const labels = [];
  const dataValues = [];
  const bgColors = [];

  Object.keys(catTotals).forEach(catId => {
    const cat = DEFAULT_CATEGORIES[catId] || { name: catId, color: '#94a3b8' };
    labels.push(cat.name);
    dataValues.push(convertFromPKR(catTotals[catId]));
    bgColors.push(cat.color);
  });

  // If no expenses, show placeholder
  const hasData = dataValues.length > 0 && totalExpenses > 0;
  const displayLabels = hasData ? labels : ['No expenses yet'];
  const displayData = hasData ? dataValues : [1];
  const displayColors = hasData ? bgColors : [isDark ? '#334155' : '#e2e8f0'];

  // 1. Donut Chart
  const donutCanvas = document.getElementById('expenseDonutChart');
  if (donutCanvas) {
    if (categoryDonutChart) {
      categoryDonutChart.destroy();
    }

    categoryDonutChart = new Chart(donutCanvas, {
      type: 'doughnut',
      data: {
        labels: displayLabels,
        datasets: [{
          data: displayData,
          backgroundColor: displayColors,
          borderWidth: 2,
          borderColor: isDark ? '#141e33' : '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: hasData,
            callbacks: {
              label: function(ctx) {
                const val = ctx.raw;
                const sym = getCurrencySymbol();
                return ` ${ctx.label}: ${sym} ${val.toLocaleString('en-US')}`;
              }
            }
          }
        }
      }
    });

    // Update center total
    const centerAmountEl = document.getElementById('donutCenterTotal');
    if (centerAmountEl) {
      centerAmountEl.textContent = formatMoney(totalExpenses);
    }

    // Render Clean Legend Grid
    renderDonutLegend(catTotals, totalExpenses);
  }

  // 2. Bar Chart (Cashflow comparison: Income vs Expense)
  renderTrendBarChart();
}

function renderDonutLegend(catTotals, totalExpenses) {
  const legendGrid = document.getElementById('donutLegendGrid');
  if (!legendGrid) return;

  const entries = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    legendGrid.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8rem; grid-column: span 2; text-align: center;">No expenses recorded this period</span>`;
    return;
  }

  let html = '';
  entries.slice(0, 6).forEach(([catId, amount]) => {
    const cat = DEFAULT_CATEGORIES[catId] || { name: catId, color: '#94a3b8' };
    const pct = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
    html += `
      <div class="chart-legend-item">
        <div class="chart-legend-badge">
          <span class="legend-dot" style="background-color: ${cat.color};"></span>
          <span>${cat.name} (${pct}%)</span>
        </div>
        <span class="chart-legend-val">${formatMoney(amount)}</span>
      </div>
    `;
  });

  legendGrid.innerHTML = html;
}

function renderTrendBarChart() {
  const barCanvas = document.getElementById('cashflowBarChart');
  if (!barCanvas || typeof Chart === 'undefined') return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  // Calculate past 4 weeks or past months
  const periodTxs = getFilteredPeriodTransactions();
  let totalIncome = appState.monthlySalary;
  let totalExpense = 0;

  periodTxs.forEach(tx => {
    if (tx.type === 'expense') totalExpense += parseFloat(tx.amount) || 0;
    else if (tx.type === 'income' && tx.category !== 'salary') totalIncome += parseFloat(tx.amount) || 0;
  });

  const convertedIncome = convertFromPKR(totalIncome);
  const convertedExpense = convertFromPKR(totalExpense);
  const convertedNet = convertFromPKR(Math.max(0, totalIncome - totalExpense));

  if (trendBarChart) trendBarChart.destroy();

  trendBarChart = new Chart(barCanvas, {
    type: 'bar',
    data: {
      labels: ['Total Income', 'Total Spend', 'Net Savings'],
      datasets: [{
        label: 'Financial Flow',
        data: [convertedIncome, convertedExpense, convertedNet],
        backgroundColor: ['#10b981', '#ef4444', '#6366f1'],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${getCurrencySymbol()} ${Math.round(ctx.raw).toLocaleString('en-US')}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { weight: '600' } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            callback: (val) => `${getCurrencySymbol()} ${Math.round(val).toLocaleString('en-US')}`
          }
        }
      }
    }
  });
}

// =============================================================================
// 8. POPULATE DROPDOWNS & CATEGORY PILLS
// =============================================================================

function populateCategorySelects() {
  const filterSelect = document.getElementById('txCategoryFilter');
  if (filterSelect) {
    const currentVal = filterSelect.value || 'all';
    let optionsHtml = '<option value="all">All Categories</option>';

    Object.values(DEFAULT_CATEGORIES).forEach(cat => {
      optionsHtml += `<option value="${cat.id}">${cat.name}</option>`;
    });

    filterSelect.innerHTML = optionsHtml;
    filterSelect.value = currentVal;
  }
}

function renderModalCategoryPills(currentType = 'expense', selectedCatId = 'grocery') {
  const container = document.getElementById('modalCatPillsContainer');
  if (!container) return;

  let html = '';
  Object.values(DEFAULT_CATEGORIES)
    .filter(cat => cat.type === currentType)
    .forEach(cat => {
      const isSelected = cat.id === selectedCatId ? 'selected' : '';
      html += `
        <button type="button" class="cat-pill-option ${isSelected}" data-cat-id="${cat.id}">
          <i data-lucide="${cat.icon}"></i>
          <span>${cat.name}</span>
        </button>
      `;
    });

  container.innerHTML = html;
  renderLucideIcons();

  // Attach click events
  container.querySelectorAll('.cat-pill-option').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.cat-pill-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const hiddenInput = document.getElementById('txCategoryInput');
      if (hiddenInput) hiddenInput.value = btn.getAttribute('data-cat-id');
    });
  });

  // Set the hidden input value
  const hiddenInput = document.getElementById('txCategoryInput');
  if (hiddenInput) hiddenInput.value = selectedCatId;
}

// =============================================================================
// 9. TRANSACTION MODAL HANDLERS
// =============================================================================

function openTransactionModal(options = {}) {
  const type = options.type || 'expense';
  const category = options.category || (type === 'expense' ? 'grocery' : 'salary');

  appState.editingTxId = options.editId || null;

  const modal = document.getElementById('transactionModal');
  const titleEl = document.getElementById('txModalTitle');
  const submitBtn = document.getElementById('txSubmitBtn');
  const amountInput = document.getElementById('txAmountInput');
  const titleInput = document.getElementById('txTitleInput');
  const dateInput = document.getElementById('txDateInput');
  const paymentSelect = document.getElementById('txPaymentSelect');
  const notesInput = document.getElementById('txNotesInput');
  const currPrefix = document.getElementById('txAmountPrefix');

  if (currPrefix) currPrefix.textContent = getCurrencySymbol();

  // Set default date to today
  if (dateInput) dateInput.value = getFormattedDateOffset(0);

  if (appState.editingTxId) {
    const tx = appState.transactions.find(t => t.id === appState.editingTxId);
    if (tx) {
      if (titleEl) titleEl.innerHTML = '<i data-lucide="edit-3"></i> Edit Figure / Transaction';
      if (submitBtn) submitBtn.textContent = 'Save Changes';
      setTypeToggle(tx.type);
      renderModalCategoryPills(tx.type, tx.category);

      const displayAmount = convertFromPKR(tx.amount);
      if (amountInput) amountInput.value = Math.round(displayAmount * 100) / 100;
      if (titleInput) titleInput.value = tx.title || '';
      if (dateInput) dateInput.value = tx.date;
      if (paymentSelect) paymentSelect.value = tx.paymentMethod || 'cash';
      if (notesInput) notesInput.value = tx.notes || '';
    }
  } else {
    // New Transaction
    if (titleEl) titleEl.innerHTML = '<i data-lucide="plus-circle"></i> Quick Add Transaction';
    if (submitBtn) submitBtn.textContent = 'Add Transaction';
    setTypeToggle(type);
    renderModalCategoryPills(type, category);

    if (amountInput) amountInput.value = '';
    if (titleInput) titleInput.value = '';
    if (notesInput) notesInput.value = '';
    if (paymentSelect) paymentSelect.value = 'cash';
  }

  modal?.classList.add('active');

  // Auto-focus amount input for instant typing!
  setTimeout(() => {
    amountInput?.focus();
  }, 100);

  renderLucideIcons();
}

function setTypeToggle(type) {
  const expenseBtn = document.getElementById('typeBtnExpense');
  const incomeBtn = document.getElementById('typeBtnIncome');
  const hiddenTypeInput = document.getElementById('txTypeInput');

  if (type === 'income') {
    incomeBtn?.classList.add('active', 'is-income');
    expenseBtn?.classList.remove('active', 'is-expense');
    if (hiddenTypeInput) hiddenTypeInput.value = 'income';
    renderModalCategoryPills('income', 'salary');
  } else {
    expenseBtn?.classList.add('active', 'is-expense');
    incomeBtn?.classList.remove('active', 'is-income');
    if (hiddenTypeInput) hiddenTypeInput.value = 'expense';
    renderModalCategoryPills('expense', 'grocery');
  }
}

function handleTransactionSubmit(e) {
  e.preventDefault();

  const amountInput = document.getElementById('txAmountInput');
  const typeInput = document.getElementById('txTypeInput');
  const categoryInput = document.getElementById('txCategoryInput');
  const titleInput = document.getElementById('txTitleInput');
  const dateInput = document.getElementById('txDateInput');
  const paymentSelect = document.getElementById('txPaymentSelect');
  const notesInput = document.getElementById('txNotesInput');

  const rawAmount = parseFloat(amountInput?.value);
  if (isNaN(rawAmount) || rawAmount <= 0) {
    showToast('Please enter a valid amount greater than 0', 'danger');
    amountInput?.focus();
    return;
  }

  // Convert entered amount back to PKR base value
  const amountInPKR = convertToPKR(rawAmount);

  const type = typeInput?.value || 'expense';
  const category = categoryInput?.value || 'other';
  const title = titleInput?.value.trim() || DEFAULT_CATEGORIES[category]?.name || 'Expense';
  const date = dateInput?.value || getFormattedDateOffset(0);
  const paymentMethod = paymentSelect?.value || 'cash';
  const notes = notesInput?.value.trim() || '';

  if (appState.editingTxId) {
    // Update existing transaction
    const index = appState.transactions.findIndex(t => t.id === appState.editingTxId);
    if (index !== -1) {
      appState.transactions[index] = {
        ...appState.transactions[index],
        type,
        category,
        amount: amountInPKR,
        title,
        date,
        paymentMethod,
        notes
      };
      showToast('Transaction figure updated successfully!', 'success');
    }
  } else {
    // Add new transaction
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      type,
      category,
      amount: amountInPKR,
      title,
      date,
      paymentMethod,
      notes
    };
    appState.transactions.unshift(newTx);
    showToast(`${formatMoney(amountInPKR)} logged to ${DEFAULT_CATEGORIES[category]?.name}!`, 'success');
  }

  saveState();
  closeAllModals();
  renderApp();
}

window.addQuickAmount = function(val) {
  const input = document.getElementById('txAmountInput');
  if (!input) return;
  const current = parseFloat(input.value) || 0;
  // If viewing in non-PKR, convert the chip value
  const convertedAdd = Math.round(convertFromPKR(val) * 100) / 100;
  input.value = Math.round((current + convertedAdd) * 100) / 100;
  input.focus();
};

window.editTransaction = function(id) {
  openTransactionModal({ editId: id });
};

window.deleteTransaction = function(id) {
  const tx = appState.transactions.find(t => t.id === id);
  if (!tx) return;

  if (confirm(`Are you sure you want to delete "${tx.title}" (${formatMoney(tx.amount)})?`)) {
    appState.transactions = appState.transactions.filter(t => t.id !== id);
    saveState();
    renderApp();
    showToast('Transaction deleted', 'success');
  }
};

// =============================================================================
// 10. EDITABLE SALARY MODAL HANDLERS
// =============================================================================

function openSalaryModal() {
  const modal = document.getElementById('salaryModal');
  const salaryInput = document.getElementById('modalSalaryInput');
  const currPrefix = document.getElementById('salaryCurrPrefix');

  if (currPrefix) currPrefix.textContent = getCurrencySymbol();

  const convertedSalary = convertFromPKR(appState.monthlySalary);
  if (salaryInput) {
    salaryInput.value = Math.round(convertedSalary);
  }

  modal?.classList.add('active');
  setTimeout(() => salaryInput?.focus(), 100);
}

function handleSalarySubmit(e) {
  e.preventDefault();
  const salaryInput = document.getElementById('modalSalaryInput');
  const val = parseFloat(salaryInput?.value);

  if (isNaN(val) || val < 0) {
    showToast('Please enter a valid salary figure', 'danger');
    return;
  }

  appState.monthlySalary = convertToPKR(val);
  saveState();
  closeAllModals();
  renderApp();
  showToast(`Monthly salary updated to ${formatMoney(appState.monthlySalary)}!`, 'success');
}

// =============================================================================
// 11. BUDGET SETTINGS MODAL
// =============================================================================

function openBudgetSettingsModal() {
  const modal = document.getElementById('budgetSettingsModal');
  const container = document.getElementById('budgetInputsContainer');
  if (!container) return;

  let html = '';
  Object.values(DEFAULT_CATEGORIES)
    .filter(c => c.type === 'expense')
    .forEach(cat => {
      const budgetPKR = appState.budgets[cat.id] || cat.defaultBudget || 0;
      const convertedVal = Math.round(convertFromPKR(budgetPKR));

      html += `
        <div class="form-group">
          <label class="form-label">${cat.name}</label>
          <div class="form-input-wrap">
            <span class="form-input-prefix">${getCurrencySymbol()}</span>
            <input type="number" class="form-input has-prefix budget-config-input" 
                   data-cat-id="${cat.id}" value="${convertedVal}" step="any" min="0">
          </div>
        </div>
      `;
    });

  container.innerHTML = html;
  modal?.classList.add('active');

  // Submit handler for budget settings
  const form = document.getElementById('budgetSettingsForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      container.querySelectorAll('.budget-config-input').forEach(input => {
        const catId = input.getAttribute('data-cat-id');
        const num = parseFloat(input.value) || 0;
        appState.budgets[catId] = convertToPKR(num);
      });
      saveState();
      closeAllModals();
      renderApp();
      showToast('Monthly category budgets updated!', 'success');
    };
  }
}

// =============================================================================
// 12. EXCHANGE RATES MANAGER MODAL
// =============================================================================

function openRatesModal() {
  const modal = document.getElementById('ratesModal');
  const container = document.getElementById('ratesInputsContainer');
  if (!container) return;

  let html = '';
  ['USD', 'EUR', 'GBP', 'AED', 'SAR'].forEach(code => {
    const rate = appState.exchangeRates[code] || CURRENCIES[code].rateToPKR;
    html += `
      <div class="form-group">
        <label class="form-label">1 ${code} = PKR (₨)</label>
        <div class="form-input-wrap">
          <span class="form-input-prefix">₨</span>
          <input type="number" step="0.01" class="form-input has-prefix exchange-rate-input" 
                 data-code="${code}" value="${rate}">
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  modal?.classList.add('active');
}

function handleRatesSubmit(e) {
  e.preventDefault();
  const container = document.getElementById('ratesInputsContainer');
  if (!container) return;

  container.querySelectorAll('.exchange-rate-input').forEach(input => {
    const code = input.getAttribute('data-code');
    const val = parseFloat(input.value);
    if (!isNaN(val) && val > 0) {
      appState.exchangeRates[code] = val;
    }
  });

  saveState();
  closeAllModals();
  renderApp();
  showToast('Exchange rates updated successfully!', 'success');
}

// =============================================================================
// 13. DATA EXPORT / IMPORT & BACKUP
// =============================================================================

function exportToCSV() {
  if (appState.transactions.length === 0) {
    showToast('No transactions to export', 'danger');
    return;
  }

  let csv = 'ID,Date,Type,Category,Title,Amount_PKR,Payment_Method,Notes\n';
  appState.transactions.forEach(tx => {
    const row = [
      tx.id,
      tx.date,
      tx.type,
      `"${DEFAULT_CATEGORIES[tx.category]?.name || tx.category}"`,
      `"${(tx.title || '').replace(/"/g, '""')}"`,
      tx.amount,
      tx.paymentMethod,
      `"${(tx.notes || '').replace(/"/g, '""')}"`
    ];
    csv += row.join(',') + '\n';
  });

  downloadFile(csv, `FinFlow_Sarmaya_Export_${getFormattedDateOffset(0)}.csv`, 'text/csv');
  showToast('Transactions exported to CSV for Excel/Sheets!', 'success');
}

function exportToJSON() {
  const data = JSON.stringify(appState, null, 2);
  downloadFile(data, `FinFlow_Backup_${getFormattedDateOffset(0)}.json`, 'application/json');
  showToast('Full backup JSON file downloaded!', 'success');
}

function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (imported.transactions && Array.isArray(imported.transactions)) {
        appState = {
          ...appState,
          ...imported
        };
        saveState();
        renderApp();
        showToast('Backup restored successfully!', 'success');
      } else {
        showToast('Invalid backup file format', 'danger');
      }
    } catch (err) {
      showToast('Error reading JSON backup file', 'danger');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function confirmResetData() {
  if (confirm('Are you sure you want to reset all data back to clean state? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEY);
    appState = JSON.parse(JSON.stringify(INITIAL_SEED_DATA));
    saveState();
    renderApp();
    showToast('Application reset to initial state', 'success');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  appState.editingTxId = null;
}

// =============================================================================
// 14. TOAST NOTIFICATIONS
// =============================================================================

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  renderLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
