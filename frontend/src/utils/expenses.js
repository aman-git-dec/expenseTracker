export const formatCurrency = (amount) => {
  const value =
    typeof amount === "number" ? amount : Number(amount || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const isIncome = (entry) => entry.type === "income";
const isExpense = (entry) =>
  entry.type === "expense" ||
  entry.type === undefined ||
  entry.type === null;

export const getTotalExpenses = (expenses) => {
  return expenses
    .filter(isExpense)
    .reduce((total, expense) => total + (expense.amount || 0), 0);
};

export const getTotalIncome = (expenses) => {
  return expenses
    .filter(isIncome)
    .reduce((total, entry) => total + (entry.amount || 0), 0);
};

export const getExpensesByCategory = (expenses) => {
  const categories = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    utilities: 0,
    health: 0,
    other: 0,
  };

  expenses.forEach((expense) => {
    if (!isExpense(expense)) return;

    const key = expense.category || "other";
    if (categories[key] === undefined) {
      categories.other += expense.amount || 0;
    } else {
      categories[key] += expense.amount || 0;
    }
  });

  return categories;
};

export const getChartData = (expenses) => {
  const expensesByCategory = getExpensesByCategory(expenses);

  return Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
};

export const getCategoryTextColor = (category) => {
  const colors = {
    food: "text-indigo-500",
    transport: "text-cyan-500",
    entertainment: "text-purple-500",
    utilities: "text-teal-500",
    health: "text-green-500",
    shopping: "text-orange-500",
    other: "text-slate-500",
    income: "text-green-600",
    investment: "text-emerald-600",
    trading: "text-lime-600",
    business: "text-blue-600",
  };

  return colors[category] || "text-gray-500";
};

export const getMonthName = (date) => {
  return date.toLocaleString("default", { month: "short" });
};

export const getExpensesByMonth = (expenses, numMonths = 6) => {
  const now = new Date();
  const result = {};

  for (let i = 0; i < numMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${getMonthName(d)} ${d.getFullYear()}`;
    result[key] = 0;
  }

  expenses.forEach((expense) => {
    if (!isExpense(expense)) return;

    const d = new Date(expense.date);
    if (isNaN(d.getTime())) return;

    const key = `${getMonthName(d)} ${d.getFullYear()}`;
    if (result[key] !== undefined) {
      result[key] += expense.amount || 0;
    }
  });

  return result;
};

export const getIncomeByCategory = (expenses) => {
  const categories = {
    income: 0,
    investment: 0,
    trading: 0,
    business: 0,
    other: 0,
  };

  expenses.forEach((entry) => {
    if (!isIncome(entry)) return;

    const key = entry.category || "other";
    if (categories[key] === undefined) {
      categories.other += entry.amount || 0;
    } else {
      categories[key] += entry.amount || 0;
    }
  });

  return categories;
};

export const getIncomeChartData = (expenses) => {
  const incomeByCategory = getIncomeByCategory(expenses);

  return Object.entries(incomeByCategory)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
};

export const getIncomeByMonth = (expenses, numMonths = 6) => {
  const now = new Date();
  const result = {};

  for (let i = 0; i < numMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${getMonthName(d)} ${d.getFullYear()}`;
    result[key] = 0;
  }

  expenses.forEach((entry) => {
    if (!isIncome(entry)) return;

    const d = new Date(entry.date);
    if (isNaN(d.getTime())) return;

    const key = `${getMonthName(d)} ${d.getFullYear()}`;
    if (result[key] !== undefined) {
      result[key] += entry.amount || 0;
    }
  });

  return result;
};
