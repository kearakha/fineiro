"use client";

import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 font-sans p-4 transition-colors duration-300">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 dark:border-zinc-800 transition-colors text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
          Prototype Mode
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          Registration is disabled in demo mode. Use the demo account to
          explore.
        </p>
        <div className="mb-6 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-300">
          <span className="font-semibold">Email:</span> demo@example.com
          <br />
          <span className="font-semibold">Password:</span> demo1234
        </div>
        <Link
          href="/login"
          className="inline-flex justify-center w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
