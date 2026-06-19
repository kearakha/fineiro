import React from 'react';

type SummaryProps = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeCount: number;
  expenseCount: number;
};

// Formatter IDR
export const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SummaryCards({ summary }: { summary: SummaryProps | null }) {
  if (!summary) return <div className="animate-pulse flex space-x-4"><div className="h-24 bg-zinc-200 rounded-2xl w-full"></div></div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 border border-zinc-100 dark:border-zinc-800 transition-colors">
        <h3 className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider font-semibold mb-3">Total Balance</h3>
        <p className={`text-4xl font-extrabold tracking-tight ${summary.balance >= 0 ? 'text-zinc-900 dark:text-zinc-50' : 'text-red-500'}`}>
          {formatIDR(summary.balance)}
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 border border-zinc-100 dark:border-zinc-800 transition-colors">
        <h3 className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider font-semibold mb-3">Total Income ({summary.incomeCount})</h3>
        <p className="text-4xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-500">
          {formatIDR(summary.totalIncome)}
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 border border-zinc-100 dark:border-zinc-800 transition-colors">
        <h3 className="text-zinc-500 dark:text-zinc-400 text-sm uppercase tracking-wider font-semibold mb-3">Total Expense ({summary.expenseCount})</h3>
        <p className="text-4xl font-extrabold tracking-tight text-rose-600 dark:text-rose-500">
          {formatIDR(summary.totalExpense)}
        </p>
      </div>
    </div>
  );
}
