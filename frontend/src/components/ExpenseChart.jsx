import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getChartData, getExpensesByMonth } from "../utils/expenses";
import { BarChart, PieChart } from "lucide-react";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseBarChart from "./ExpenseBarChart";
import IncomePieChart from "./IncomePieChart";
import IncomeBarChart from "./IncomeBarChart";

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [expenseChartType, setExpenseChartType] = useState("pie");
  const [incomeChartType, setIncomeChartType] = useState("pie");

  const chartData = getChartData(expenses);
  const monthlyData = getExpensesByMonth(expenses);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md text-center p-6">
          <h2 className="text-2xl font-semibold text-expense-dark mb-4">
            Expense Analytics
          </h2>
          <p className="text-gray-500">
            Add some expenses or income to see your analytics
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md text-center p-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Income Analytics
          </h2>
          <p className="text-gray-500">
            Add some income entries to see your income analytics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* EXPENSE ANALYTICS */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-expense-dark mb-4">
          Expense Analytics
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setExpenseChartType("pie")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-all ${
              expenseChartType === "pie"
                ? "bg-expense text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <PieChart size={18} className="mr-2" />
            <span>Pie Chart</span>
          </button>
          <button
            onClick={() => setExpenseChartType("bar")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-all ${
              expenseChartType === "bar"
                ? "bg-expense text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <BarChart size={18} className="mr-2" />
            <span>Bar Chart</span>
          </button>
        </div>

        {expenseChartType === "pie" ? (
          <ExpensePieChart data={chartData} />
        ) : (
          <ExpenseBarChart data={monthlyData} />
        )}
      </div>

      {/* INCOME ANALYTICS */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Income Analytics
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIncomeChartType("pie")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-all ${
              incomeChartType === "pie"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <PieChart size={18} className="mr-2" />
            <span>Pie Chart</span>
          </button>
          <button
            onClick={() => setIncomeChartType("bar")}
            className={`flex items-center cursor-pointer px-4 py-2 rounded-md transition-all ${
              incomeChartType === "bar"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <BarChart size={18} className="mr-2" />
            <span>Bar Chart</span>
          </button>
        </div>

        {incomeChartType === "pie" ? <IncomePieChart /> : <IncomeBarChart />}
      </div>
    </div>
  );
};

export default ExpenseChart;
