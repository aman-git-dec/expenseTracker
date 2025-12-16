import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";
import { formatCurrency } from "../utils/expenses";

const IncomeBarChart = () => {
  const { expenses } = useExpenses();

  const incomes = expenses.filter((e) => e.type === "income");

  // Last 6 months buckets
  const now = new Date();
  const buckets = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getFullYear()}`;
    buckets.push({ key, value: 0 });
  }

  const bucketMap = Object.fromEntries(buckets.map((b) => [b.key, b]));

  incomes.forEach((entry) => {
    const d = new Date(entry.date);
    if (isNaN(d)) return;
    const key = `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getFullYear()}`;
    if (bucketMap[key]) {
      bucketMap[key].value += entry.amount;
    }
  });

  const data = buckets;

  const hasData = data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 h-80 flex items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          Add some income entries to see monthly income analytics
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Income Analytics (Last 6 Months)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
