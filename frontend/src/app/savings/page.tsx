"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatIDR } from "@/components/SummaryCards";
import { mockSavings } from "@/lib/mockData";

type SavingGoal = {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string | null;
  icon: string;
};

export default function SavingsPage() {
  const [goals] = useState<SavingGoal[]>(mockSavings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newIcon, setNewIcon] = useState("🎯");
  const [newDeadline, setNewDeadline] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
  }, [router]);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Adding goals is disabled in demo mode.");
    setShowAddModal(false);
  };

  const handleUpdateAmount = (_id: number, _addAmount: number) => {
    alert("Updating savings is disabled in demo mode.");
  };

  const handleDeleteGoal = (_id: number) => {
    alert("Delete is disabled in demo mode.");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8 md:p-14 font-sans text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-[1440px] w-full mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight italic uppercase">
              Savings Goals
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mt-2">
              Track your dreams and save money effectively.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-all"
          >
            + Create New Goal
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {goals.map((goal) => {
            const progress = Math.min(
              100,
              Math.round((goal.currentAmount / goal.targetAmount) * 100),
            );
            return (
              <div
                key={goal.id}
                className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="text-5xl">{goal.icon}</div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-2 text-zinc-300 dark:text-zinc-700 hover:text-rose-500 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  {goal.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-6">
                  Target: {formatIDR(goal.targetAmount)}
                  {goal.deadline &&
                    ` • Due ${new Date(goal.deadline).toLocaleDateString()}`}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-black text-emerald-500">
                      {progress}%
                    </span>
                    <span className="text-sm font-bold text-zinc-400">
                      {formatIDR(goal.currentAmount)} saved
                    </span>
                  </div>
                  <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleUpdateAmount(goal.id, 50000)}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    + Rp 50rb
                  </button>
                  <button
                    onClick={() => handleUpdateAmount(goal.id, 500000)}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 py-3 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    + Rp 500rb
                  </button>
                </div>
              </div>
            );
          })}

          {goals.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-400 text-xl font-medium">
                No goals set yet. Start dreaming today!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add Goal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl border border-zinc-100 dark:border-zinc-800">
            <h2 className="text-3xl font-black mb-8">Set New Dream</h2>
            <form onSubmit={handleAddGoal} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                  What is it?
                </label>
                <input
                  type="text"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-lg font-bold"
                  placeholder="e.g. New Gaming PC"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Target Amount
                  </label>
                  <input
                    type="text"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-lg font-bold"
                    placeholder="Rp 0"
                    value={formatIDR(
                      parseFloat(newTarget.replace(/\D/g, "") || "0"),
                    )}
                    onChange={(e) => setNewTarget(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                    Icon
                  </label>
                  <select
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-lg font-bold"
                    value={newIcon}
                    onChange={(e) => setNewIcon(e.target.value)}
                  >
                    <option>🎯</option>
                    <option>💻</option>
                    <option>🛫</option>
                    <option>🏠</option>
                    <option>🚗</option>
                    <option>🎁</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 text-lg font-bold"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-emerald-500 text-white rounded-2xl font-black text-xl py-4 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Launch Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
