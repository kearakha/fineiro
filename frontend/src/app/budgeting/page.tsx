"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockAllocations } from "@/lib/mockData";

type Allocation = {
  id: string; // generated client-side for keys
  category: string;
  percentage: number;
  amount: number;
};

const DEFAULT_CATEGORIES = ["Food", "Transportation", "Utilities"];

export default function BudgetingPage() {
  const [totalBudgetStr, setTotalBudgetStr] = useState(
    new Intl.NumberFormat("id-ID").format(mockAllocations.totalBudget),
  );
  const [totalBudget, setTotalBudget] = useState(mockAllocations.totalBudget);
  const [allocations, setAllocations] = useState<Allocation[]>(
    mockAllocations.allocations.map((a) => ({
      ...a,
      id: Math.random().toString(36).substr(2, 9),
    })),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newCatName, setNewCatName] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
  }, [router]);

  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setTotalBudgetStr("");
      setTotalBudget(0);
      recalculateAmountsByPercentage(0, allocations);
      return;
    }

    const parsed = parseInt(rawValue, 10);
    setTotalBudgetStr(new Intl.NumberFormat("id-ID").format(parsed));
    setTotalBudget(parsed);
    recalculateAmountsByPercentage(parsed, allocations);
  };

  // When Total Budget changes or Percentages change, we push the new Amounts
  const recalculateAmountsByPercentage = (
    total: number,
    currentAllocs: Allocation[],
  ) => {
    const updated = currentAllocs.map((a) => ({
      ...a,
      amount: total > 0 ? (a.percentage / 100) * total : 0,
    }));
    setAllocations(updated);
  };

  const handlePercentageChange = (id: string, newPctRaw: string) => {
    let newPct = parseFloat(newPctRaw);
    if (isNaN(newPct)) newPct = 0;
    if (newPct < 0) newPct = 0;
    if (newPct > 100) newPct = 100;

    const updated = allocations.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          percentage: newPct,
          amount: totalBudget > 0 ? (newPct / 100) * totalBudget : 0,
        };
      }
      return a;
    });
    setAllocations(updated);
  };

  // BI-DIRECTIONAL: When Nominal Amount changes manually, recalculate its Percentage.
  const handleAmountChange = (id: string, newAmountStr: string) => {
    const rawValue = newAmountStr.replace(/\D/g, "");
    const maxNumber = parseInt(rawValue || "0", 10);

    const updated = allocations.map((a) => {
      if (a.id === id) {
        return {
          ...a,
          amount: maxNumber,
          // Recalculate percentage based on new manual amount
          percentage:
            totalBudget > 0
              ? Math.min(100, Math.max(0, (maxNumber / totalBudget) * 100))
              : 0,
        };
      }
      return a;
    });
    setAllocations(updated);
  };

  const currentTotalPct = allocations.reduce(
    (acc, curr) => acc + curr.percentage,
    0,
  );
  const remainingPct = 100 - currentTotalPct;
  const currentTotalAmnt = allocations.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const remainingAmnt = totalBudget - currentTotalAmnt;

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    setAllocations([
      ...allocations,
      {
        id: Math.random().toString(36).substr(2, 9),
        category: newCatName.trim(),
        percentage: 0,
        amount: 0,
      },
    ]);
    setNewCatName("");
  };

  const handleDeleteCategory = (id: string) => {
    setAllocations(allocations.filter((a) => a.id !== id));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setSuccess("Budget Plan saved! (demo mode — not persisted)");
    setTimeout(() => setSuccess(""), 3000);
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-14 max-w-[1200px] w-full mx-auto animate-in fade-in duration-500 pb-20 min-h-screen transition-colors duration-300">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Budget Planner
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-lg">
          Distribute your expected income. You can adjust percentages or type
          exact amounts directly.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 transition-colors duration-300">
        {/* Total Expected Input */}
        <div className="mb-8 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-colors">
          <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Expected Total Budget (IDR)
          </label>
          <div className="relative rounded-md shadow-sm max-w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-zinc-500 dark:text-zinc-400 font-semibold text-lg">
                Rp
              </span>
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl text-2xl font-bold text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-mono"
              placeholder="0"
              value={totalBudgetStr}
              onChange={handleTotalBudgetChange}
            />
          </div>
        </div>

        {/* Status Headers */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Category breakdown
          </h3>

          <div className="flex items-center gap-3">
            <div
              className={`text-base font-semibold px-5 py-2 rounded-full border ${remainingPct < 0 ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30" : currentTotalPct === 100 ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30" : "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"}`}
            >
              <span className="font-extrabold">
                {currentTotalPct.toFixed(1)}%
              </span>{" "}
              Allocated
              {remainingPct !== 0 && (
                <span className="text-zinc-500 dark:text-zinc-400 font-medium ml-2">
                  ({remainingPct.toFixed(1)}% Left)
                </span>
              )}
            </div>

            <div
              className={`text-base font-semibold px-5 py-2 rounded-full border ${remainingAmnt < 0 ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30" : remainingAmnt === 0 ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30" : "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"}`}
            >
              Remaining:{" "}
              <span className="font-extrabold">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(Math.abs(remainingAmnt))}
              </span>
              {remainingAmnt < 0 && " (Over)"}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg text-sm border border-emerald-100 dark:border-emerald-900/30">
            {success}
          </div>
        )}

        {/* Dynamic Allocation List */}
        <div className="space-y-4 mb-8">
          {allocations.map((alloc) => (
            <div
              key={alloc.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm group"
            >
              <div className="w-full md:w-1/3">
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 tracking-tight">
                  {alloc.category}
                </span>
              </div>

              <div className="w-full md:w-1/3 flex flex-col justify-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={alloc.percentage}
                  onChange={(e) =>
                    handlePercentageChange(alloc.id, e.target.value)
                  }
                  className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 mb-3"
                />
                <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 font-semibold justify-between">
                  <span>0%</span>
                  <span className="text-zinc-900 dark:text-zinc-100 font-extrabold bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md transition-colors">
                    {alloc.percentage.toFixed(1)}%
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Editable Nominal Input */}
              <div className="w-full md:w-1/3 flex items-center justify-end">
                <div className="relative rounded-xl shadow-sm w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-zinc-500 dark:text-zinc-400 text-base font-semibold">
                      Rp
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-lg font-bold text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all text-right font-mono"
                    value={
                      alloc.amount > 0
                        ? new Intl.NumberFormat("id-ID").format(alloc.amount)
                        : ""
                    }
                    placeholder="0"
                    onChange={(e) =>
                      handleAmountChange(alloc.id, e.target.value)
                    }
                    disabled={totalBudget <= 0}
                    title={
                      totalBudget <= 0
                        ? "Set total budget first"
                        : "Edit explicitly"
                    }
                  />
                </div>

                <button
                  onClick={() => handleDeleteCategory(alloc.id)}
                  className="ml-4 text-zinc-400 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove Category"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category Trigger */}
        <div className="flex items-center gap-4 mb-10 p-5 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-950 transition-colors">
          <input
            type="text"
            className="flex-1 px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all font-semibold"
            placeholder="Type a new category (e.g. Subscriptions)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddCategory();
            }}
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-base font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
          >
            + Add
          </button>
        </div>

        <div className="flex justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={handleSave}
            disabled={loading || totalBudget <= 0}
            className="px-10 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-lg font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving Layout..." : "Save Budget Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
