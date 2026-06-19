"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SummaryCards from "@/components/SummaryCards";
import TransactionForm from "@/components/TransactionForm";
import ChartVisual from "@/components/ChartVisual";
import PredictionCard from "@/components/PredictionCard";
import HealthScoreCard from "@/components/HealthScoreCard";
import { mockSummary } from "@/lib/mockData";

export default function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (!saved) {
      router.replace("/login");
    } else {
      setToken(saved);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 md:p-14 font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        <header className="mb-10 flex justify-between items-center bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Budget Overview
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-base mt-2">
              Hello, manage your financial dashboard with ML insights.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-zinc-200 dark:border-zinc-700 rounded-xl px-6 py-3 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Sign out
          </button>
        </header>

        <SummaryCards summary={mockSummary} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6 flex flex-col">
            <TransactionForm type="income" token={token} onSuccess={() => {}} />
            <TransactionForm
              type="expense"
              token={token}
              onSuccess={() => {}}
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <HealthScoreCard token={token} />
              <ChartVisual
                income={mockSummary.totalIncome}
                expense={mockSummary.totalExpense}
                expenseByCategory={mockSummary.expenseByCategory}
              />
            </div>
            <div className="w-full">
              <PredictionCard token={token} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
