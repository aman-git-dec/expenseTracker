import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import {
  formatCurrency,
  getExpensesByCategory,
  getTotalExpenses,
  getTotalIncome,
} from "../utils/expenses";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const totalIncome = getTotalIncome(expenses);
  const balance = totalIncome - totalExpenses;

  const categoriesData = getExpensesByCategory(expenses);

  // find highest expense category
  let highestCategory = { name: "none", amount: 0 };
  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount };
    }
  });

  const friendlyCategoryNames = {
    food: "Food & Dining",
    transport: "Transportation",
    entertainment: "Entertainment",
    shopping: "Shopping",
    utilities: "Utilities",
    health: "Health & Medical",
    other: "Other",
  };

  const highestCategoryLabel =
    highestCategory.amount > 0
      ? friendlyCategoryNames[highestCategory.name] || highestCategory.name
      : "None";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Income */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
        <div className="p-2 rounded-full bg-green-100">
          <TrendingUp className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-xl font-semibold text-gray-800">
            {formatCurrency(totalIncome)}
          </p>
        </div>
      </div>

      {/* Total Expenses */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
        <div className="p-2 rounded-full bg-red-100">
          <TrendingDown className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-semibold text-gray-800">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
        <div className="p-2 rounded-full bg-blue-100">
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p
            className={`text-xl font-semibold ${
              balance < 0 ? "text-red-600" : "text-green-700"
            }`}
          >
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Highest Expense Category + total entries */}
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Highest Expense Category
          </p>
          {highestCategory.amount > 0 ? (
            <>
              <p className="text-lg font-semibold text-gray-800">
                {highestCategoryLabel}
              </p>
              <p className="text-sm text-gray-500">
                {formatCurrency(highestCategory.amount)}
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-500">None</p>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          Total entries: {expenses.length}
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
