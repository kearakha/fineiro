"use client";

import React, { useState, useEffect } from "react";
import { mockHealth } from "@/lib/mockData";

type HealthScoreData = {
  score: number;
  status: string;
  message: string;
  breakdown: {
    savingRate: number;
    budgetAdherence: number;
  };
};

export default function HealthScoreCard({ token: _token }: { token: string }) {
  const data: HealthScoreData = mockHealth;

  if (false) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-100 dark:border-zinc-800 animate-pulse h-full min-h-[220px]">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mb-6"></div>
        <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-yellow-500";
    return "text-rose-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10";
    if (score >= 60) return "bg-yellow-500/10";
    return "bg-rose-500/10";
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 border border-zinc-100 dark:border-zinc-800 transition-all duration-300 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Financial Health
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${getScoreBg(data.score)} ${getScoreColor(data.score)}`}
          >
            {data.status}
          </span>
        </div>

        <div className="flex items-end gap-3 mb-4">
          <span
            className={`text-6xl font-black tracking-tighter ${getScoreColor(data.score)}`}
          >
            {data.score}
          </span>
          <span className="text-xl font-bold text-zinc-400 dark:text-zinc-600 mb-1.5">
            / 100
          </span>
        </div>

        <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
          {data.message}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            <span>Saving Rate</span>
            <span>{data.breakdown.savingRate}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${data.breakdown.savingRate}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            <span>Budget Adherence</span>
            <span>{data.breakdown.budgetAdherence}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000"
              style={{ width: `${data.breakdown.budgetAdherence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
