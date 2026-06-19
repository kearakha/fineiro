"use client";

import React, { useState, useEffect } from "react";
import { mockPrediction } from "@/lib/mockData";

type PredictionCardProps = {
  token: string;
};

type PredictionResponse = {
  prediction_total?: number;
  breakdown?: { category: string; predicted_amount: number }[];
  history_months_used?: number;
  message?: string;
  isOverbudgetWarning?: boolean;
};

export default function PredictionCard({ token: _token }: PredictionCardProps) {
  const data: PredictionResponse = mockPrediction;
  const loading = false;
  const error = "";

  const formattedPrediction = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(data?.prediction_total || 0);

  return (
    <div className="bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-zinc-800 relative overflow-hidden text-white h-full flex flex-col justify-between">
      {/* Subtle decorative gradient */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex-1">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 tracking-tight flex items-center gap-2">
              <svg
                className="w-6 h-6 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI Forecast
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Based on historical data
            </p>
          </div>
          <button
            onClick={() => {}}
            disabled={loading}
            className="p-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50"
            title="Recalculate Prediction"
          >
            <svg
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {error ? (
          <div className="bg-red-900/30 text-red-200 border border-red-800/50 p-6 rounded-xl text-base mb-6 backdrop-blur-sm">
            {error}
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">
              Predicted Next Month Total
            </p>
            {loading ? (
              <div className="h-12 bg-zinc-800 rounded-lg w-2/3 animate-pulse mb-3"></div>
            ) : (
              <div className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm mb-4">
                {formattedPrediction}
              </div>
            )}

            {data?.history_months_used !== undefined && (
              <p className="text-sm text-emerald-400 italic">
                {data.history_months_used} months of data analyzed
              </p>
            )}

            {!loading && data?.isOverbudgetWarning && (
              <div className="mt-5 bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-4">
                <svg
                  className="w-8 h-8 text-red-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-bold text-red-200 uppercase tracking-tight mb-1">
                    Warning: Overbudget
                  </p>
                  <p className="text-xs text-red-300">
                    Your current spending trend suggests you will exceed your
                    expected budget next month.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Breakdowns */}
        {!loading && data?.breakdown && data.breakdown.length > 0 && (
          <div className="space-y-4 mt-8 border-t border-zinc-800 pt-6">
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
              Top Category Predictions
            </p>
            {data.breakdown
              .sort((a, b) => b.predicted_amount - a.predicted_amount)
              .slice(0, 3)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-base py-1.5"
                >
                  <span className="text-zinc-300">{item.category}</span>
                  <span className="font-semibold text-white">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      item.predicted_amount,
                    )}
                  </span>
                </div>
              ))}
          </div>
        )}

        {data?.message && !data.breakdown?.length && !error && (
          <div className="text-sm text-zinc-400 italic bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 mt-4 leading-relaxed">
            {data.message}
          </div>
        )}
      </div>
    </div>
  );
}
