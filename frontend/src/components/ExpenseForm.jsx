import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getTotalExpenses, getTotalIncome } from "../utils/expenses";
import { toast } from "react-hot-toast";

const ExpenseForm = () => {
  const { expenses, addExpense } = useExpenses();

  const [entryType, setEntryType] = useState("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expenseCategories = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const incomeCategories = [
    { value: "income", label: "Income" },
    { value: "investment", label: "Investment" },
    { value: "trading", label: "Trading" },
    { value: "business", label: "Business" },
    { value: "other", label: "Other" },
  ];

  const resetForm = (type) => {
    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory(type === "expense" ? "food" : "income");
  };

  const handleSelectExpense = () => {
    setEntryType("expense");
    resetForm("expense");
  };

  const handleSelectIncome = () => {
    setEntryType("income");
    resetForm("income");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!description.trim()) {
        toast.error("Please enter a description");
        setIsSubmitting(false);
        return;
      }

      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast.error("Enter a valid amount");
        setIsSubmitting(false);
        return;
      }

      const newEntry = {
        description: description.trim(),
        amount: Number(amount),
        category,
        date,
        type: entryType,
      };

      if (entryType === "expense") {
        const currentIncome = getTotalIncome(expenses);
        const currentExpenses = getTotalExpenses(expenses);
        const projectedExpenses = currentExpenses + newEntry.amount;

        if (currentIncome < projectedExpenses) {
          toast.error("Expense cannot exceed total income");
          setIsSubmitting(false);
          return;
        }
      }

      addExpense(newEntry);

      toast.success(
        entryType === "income"
          ? "Income added successfully"
          : "Expense added successfully"
      );

      resetForm(entryType);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <div className="flex mb-4 rounded-md overflow-hidden border border-gray-200">
        <button
          type="button"
          onClick={handleSelectExpense}
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            entryType === "expense"
              ? "bg-expense text-white"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={handleSelectIncome}
          className={`flex-1 py-2 text-sm font-medium transition-all ${
            entryType === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          }`}
        >
          Income
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-expense-dark mb-6 text-center">
        {entryType === "expense" ? "Add New Expense" : "Add New Income"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder={entryType === "expense" ? "What did you spend on?" : "What did you earn from?"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-expense-light"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-expense-light"
          />
        </div>

        {entryType === "expense" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            >
              {expenseCategories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {entryType === "income" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Source
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            >
              {incomeCategories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-expense text-white py-2 rounded-md hover:bg-expense-dark font-medium"
        >
          {entryType === "expense" ? "Add Expense" : "Add Income"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
