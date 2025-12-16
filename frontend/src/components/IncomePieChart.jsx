import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useExpenses } from "../context/ExpenseContext";

const CATEGORY_COLORS = {
  Income: "#22C55E",
  Investment: "#0EA5E9",
  Trading: "#6366F1",
  Business: "#F97316",
  Other: "#64748B",
};

const IncomePieChart = () => {
  const { expenses } = useExpenses();

  const totals = {
    income: 0,
    investment: 0,
    trading: 0,
    business: 0,
    other: 0,
  };

  expenses
    .filter((e) => e.type === "income")
    .forEach((e) => {
      const key = e.category || "other";
      if (totals[key] === undefined) {
        totals.other += e.amount;
      } else {
        totals[key] += e.amount;
      }
    });

  const data = Object.entries(totals)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name:
        key === "income"
          ? "Income"
          : key === "investment"
          ? "Investment"
          : key === "trading"
          ? "Trading"
          : key === "business"
          ? "Business"
          : "Other",
      value,
    }));

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No income data to display
      </div>
    );
  }

  const getColor = (name) => {
    return CATEGORY_COLORS[name] || "#8E9196";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = total > 0 ? ((value / total) * 100).toFixed(0) : 0;

      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{name}</p>
          <p className="text-lg">
            ₹{value.toFixed(2)}
            <span className="text-sm text-gray-500 ml-1">({percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value) => (
            <span className="text-sm font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default IncomePieChart;
