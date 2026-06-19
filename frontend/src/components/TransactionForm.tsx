import React, { useState } from "react";

type TransactionFormProps = {
  type: "income" | "expense";
  token: string;
  onSuccess: () => void;
};

const PREDEFINED_CATEGORIES = {
  income: ["Salary", "Bonus", "Investment", "Other"],
  expense: [
    "Food & Dining",
    "Transportation",
    "Rent",
    "Utilities",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Other",
  ],
};

export default function TransactionForm({
  type,
  token,
  onSuccess,
}: TransactionFormProps) {
  const [displayAmount, setDisplayAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-format IDR on type
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digits
    const rawValue = e.target.value.replace(/\D/g, "");
    if (!rawValue) {
      setDisplayAmount("");
      return;
    }

    // Format with dots
    const formatted = new Intl.NumberFormat("id-ID").format(
      parseInt(rawValue, 10),
    );
    setDisplayAmount(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = type === "income" ? "/incomes" : "/expenses";

    // Clean up formatted amount back to integer
    const finalAmount = parseFloat(displayAmount.replace(/\D/g, ""));

    // Determine the category string to send
    const finalCategory =
      selectedCategory === "Custom..." ? customCategory : selectedCategory;

    if (!finalCategory || finalCategory.trim() === "") {
      setError("Please select or specify a category.");
      setLoading(false);
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 500));
      setDisplayAmount("");
      setSelectedCategory("");
      setCustomCategory("");
      setDescription("");
      setIsRecurring(false);
      setError("Demo mode — transaction not saved.");
      setTimeout(() => setError(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  const categories = PREDEFINED_CATEGORIES[type];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-8 border border-zinc-100 dark:border-zinc-800 transition-colors"
    >
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 tracking-tight capitalize">
        Add {type}
      </h3>
      {error && (
        <p className="text-red-500 text-base mb-5 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {/* Amount Field with Prefix */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Amount (IDR)
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium sm:text-base">
                Rp
              </span>
            </div>
            <input
              type="text"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-lg font-semibold text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
              placeholder="0"
              value={displayAmount}
              onChange={handleAmountChange}
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Category
          </label>
          <select
            required
            className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled className="dark:bg-zinc-950">
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="dark:bg-zinc-950">
                {cat}
              </option>
            ))}
            <option value="Custom..." className="dark:bg-zinc-950">
              Custom...
            </option>
          </select>
        </div>

        {/* Custom Category Input (Conditional) */}
        {selectedCategory === "Custom..." && (
          <div className="pl-5 border-l-4 border-zinc-200 dark:border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300 mb-4">
            <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Custom Category
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
              placeholder="Type your category..."
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Date
          </label>
          <input
            type="date"
            required
            className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Description{" "}
            <span className="text-zinc-400 dark:text-zinc-600 font-normal normal-case tracking-normal">
              (Optional)
            </span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-transparent transition-all"
            placeholder="What was this for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-6 pt-2">
          <input
            type="checkbox"
            id={`recurring-${type}`}
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-5 h-5 text-zinc-900 dark:text-zinc-100 rounded border-zinc-300 dark:border-zinc-800 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-2 cursor-pointer bg-white dark:bg-zinc-950"
          />
          <label
            htmlFor={`recurring-${type}`}
            className="ml-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
          >
            Repeat this {type} monthly
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-4 px-6 rounded-xl text-lg font-bold text-white shadow-md ${type === "income" ? "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200" : "bg-red-600 hover:bg-red-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-colors mt-6 disabled:opacity-70`}
        >
          {loading ? "Saving..." : `Save ${type}`}
        </button>
      </div>
    </form>
  );
}
