import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatIDR } from './SummaryCards';

type ChartProps = {
  income: number;
  expense: number;
  expenseByCategory: { name: string; value: number }[];
};

// Colors adapted for more muted modern palette
const COLORS = ['#10b981', '#f43f5e']; 

export default function ChartVisual({ income, expense, expenseByCategory }: ChartProps) {
  const [view, setView] = React.useState<'proportion' | 'categories'>('proportion');
  const { theme } = useTheme();

  const proportionData = [
    { name: 'Income', value: income, color: COLORS[0] }, 
    { name: 'Expense', value: expense, color: COLORS[1] }
  ];

  // Colors for category breakdown (cycling through a palette)
  const CATEGORY_COLORS = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'
  ];

  if (income === 0 && expense === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 flex flex-col items-center justify-center h-full min-h-[350px] border border-zinc-100 dark:border-zinc-800 text-center transition-colors duration-300">
        <div className="w-20 h-20 mb-5 rounded-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
          <svg className="w-10 h-10 text-zinc-300 dark:text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-base">No transaction data available yet.</p>
        <p className="text-zinc-400 dark:text-zinc-600 text-sm mt-2">Add your first income or expense to see the chart.</p>
      </div>
    );
  }

  const activeData = view === 'proportion' ? proportionData : expenseByCategory;
  const activeTitle = view === 'proportion' ? 'Proportion' : 'Expense by Category';

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 w-full h-[500px] flex flex-col border border-zinc-100 dark:border-zinc-800 group transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">{activeTitle}</h3>
        
        {/* View Switcher Controls */}
        <div className="flex gap-2">
          <button 
            onClick={() => setView('proportion')}
            className={`w-3 h-3 rounded-full transition-all ${view === 'proportion' ? 'bg-zinc-900 dark:bg-zinc-100 scale-125' : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700'}`}
            title="Overall Proportion"
          />
          <button 
            onClick={() => setView('categories')}
            className={`w-3 h-3 rounded-full transition-all ${view === 'categories' ? 'bg-zinc-900 dark:bg-zinc-100 scale-125' : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700'}`}
            title="Expense by Category"
          />
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeData}
              cx="50%"
              cy="45%"
              innerRadius={view === 'proportion' ? 100 : 80}
              outerRadius={view === 'proportion' ? 140 : 120}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              cornerRadius={6}
            >
              {activeData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={view === 'proportion' ? (entry as any).color : CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatIDR(Number(value))} 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                color: theme === 'dark' ? '#fafafa' : '#18181b'
              }}
              itemStyle={{ color: theme === 'dark' ? '#fafafa' : '#18181b' }}
            />
            <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Helper text for carousel */}
      <div className="mt-4 text-center">
         <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-widest group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors">
            Click dots above to switch view
         </p>
      </div>
    </div>
  );
}
