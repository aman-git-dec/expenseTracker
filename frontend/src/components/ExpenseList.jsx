import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatDate,
  getCategoryTextColor,
} from "../utils/expenses";
import { Trash2 } from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-expense-dark mb-4">
          Expense & Income History
        </h2>
        <p className="text-gray-500 text-sm">No records yet.</p>
      </div>
    );
  }

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Entry deleted successfully");
  };

  const labelCategory = (category) => {
    if (!category) return "Other";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-expense-dark mb-4">
        Expense & Income History
      </h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left py-2 px-3 font-semibold text-gray-700">
              Type
            </th>
            <th className="text-left py-2 px-3 font-semibold text-gray-700">
              Description
            </th>
            <th className="text-left py-2 px-3 font-semibold text-gray-700">
              Category
            </th>
            <th className="text-right py-2 px-3 font-semibold text-gray-700">
              Amount
            </th>
            <th className="text-left py-2 px-3 font-semibold text-gray-700">
              Date
            </th>
            <th className="text-center py-2 px-3 font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item) => {
            const isIncome = item.type === "income";

            return (
              <tr
                key={item.id}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2 px-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      isIncome
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {isIncome ? "Income" : "Expense"}
                  </span>
                </td>

                <td className="py-2 px-3 text-gray-800">
                  {item.description}
                </td>

                <td
                  className={`py-2 px-3 text-xs ${getCategoryTextColor(
                    item.category
                  )}`}
                >
                  {labelCategory(item.category)}
                </td>

                <td
                  className={`py-2 px-3 text-right font-semibold ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </td>

                <td className="py-2 px-3 text-gray-600">
                  {formatDate(item.date)}
                </td>

                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
