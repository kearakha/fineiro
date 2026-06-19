"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const navItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
    },
    {
      label: "Savings Goals",
      path: "/savings",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Budget Planner",
      path: "/budgeting",
      icon: "M20 12H4M8 16l-4-4 4-4",
    },
  ];

  return (
    <div className="hidden md:flex flex-col justify-between w-96 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 h-screen shrink-0 transition-colors duration-300">
      <div>
        <div className="p-10">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center">
            <div className="w-10 h-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center rounded-xl mr-4 text-base shadow-sm">
              F
            </div>
            Fineiro
          </h2>
        </div>
        <nav className="mt-6 text-lg font-semibold px-8 space-y-3 text-zinc-600 dark:text-zinc-400">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center px-6 py-4 rounded-xl transition-all cursor-pointer ${isActive ? "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold shadow-sm" : "hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50"}`}
                >
                  <svg
                    className={`w-7 h-7 mr-5 ${isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400 dark:text-zinc-600"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d={item.icon}
                    />
                  </svg>
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-6 py-4 text-lg font-bold text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          {theme === "light" ? (
            <>
              <svg
                className="w-7 h-7 mr-5 text-zinc-400 dark:text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              Dark Mode
            </>
          ) : (
            <>
              <svg
                className="w-7 h-7 mr-5 text-zinc-400 dark:text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Light Mode
            </>
          )}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-4 text-lg font-bold text-zinc-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <svg
            className="w-7 h-7 mr-5 text-zinc-400 dark:text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}
