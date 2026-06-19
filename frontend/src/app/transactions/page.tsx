"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockTransactions } from "@/lib/mockData";

type Transaction = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "income" | "expense";
};

const CATEGORY_COLORS: Record<string, string> = {
  Salary:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Bonus:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Investment:
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  "Food & Dining":
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Transportation:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Rent: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  Utilities:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Entertainment:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Healthcare: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Other: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function TransactionsPage() {
  const transactions = mockTransactions as Transaction[];
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [monthFilter, setMonthFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
  }, [router]);

  const handleDelete = (_id: number, _type: "income" | "expense") => {
    alert("Delete disabled in demo mode.");
  };

  // Compute filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    const tMonthYear = `${tDate.getFullYear()}-${String(tDate.getMonth() + 1).padStart(2, "0")}`;

    const matchesSearch =
      t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "All Categories" || t.category === filterCategory;
    const matchesMonth = monthFilter === "" || tMonthYear === monthFilter;

    return matchesSearch && matchesCategory && matchesMonth;
  });

  // Unique categories for the dropdown filter
  const uniqueCategories = Array.from(
    new Set(transactions.map((t) => t.category)),
  ).sort();

  return (
    <div className="p-8 md:p-14 max-w-[1440px] w-full mx-auto animate-in fade-in duration-500 min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Transactions
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-lg">
            A complete history of your incomes and expenses.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-zinc-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent w-full sm:w-64 transition-colors"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent w-full sm:w-48 appearance-none transition-colors"
          >
            <option value="All Categories" className="dark:bg-zinc-900">
              All Categories
            </option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat} className="dark:bg-zinc-900">
                {cat}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Month:
            </span>
            <input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-colors"
            />
            {monthFilter && (
              <button
                onClick={() => setMonthFilter("")}
                className="text-xs text-zinc-400 hover:text-zinc-600 font-bold underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 dark:text-zinc-400 text-base">
            {transactions.length === 0
              ? "You don't have any transactions yet. Add some from the Dashboard!"
              : "No transactions match your search filters."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                  <th className="px-8 py-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">
                    Amount
                  </th>
                  <th className="px-8 py-5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredTransactions.map((t) => {
                  const tagColor =
                    CATEGORY_COLORS[t.category] || "bg-zinc-100 text-zinc-700";
                  const isIncome = t.type === "income";
                  const formattedAmount = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(t.amount);

                  return (
                    <tr
                      key={`${t.type}-${t.id}`}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10 transition-colors group"
                    >
                      <td className="px-8 py-5 whitespace-nowrap text-base text-zinc-600 dark:text-zinc-400 font-medium">
                        {new Date(t.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${tagColor}`}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-base text-zinc-600 dark:text-zinc-400 max-w-xs truncate">
                        {t.description || (
                          <span className="text-zinc-400 dark:text-zinc-600 italic">
                            No description
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-8 py-5 whitespace-nowrap text-lg font-bold text-right ${isIncome ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-900 dark:text-zinc-100"}`}
                      >
                        <div className="flex items-center justify-end">
                          <span
                            className={`mr-2 text-sm font-extrabold ${isIncome ? "text-emerald-500" : "text-red-500"}`}
                          >
                            {isIncome ? "+" : "-"}
                          </span>
                          {formattedAmount}
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right text-base font-bold">
                        <button
                          onClick={() => handleDelete(t.id, t.type)}
                          className="text-zinc-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
