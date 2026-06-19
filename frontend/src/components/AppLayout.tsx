"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

import { ThemeProvider } from '@/context/ThemeContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes completely without sidebar
  const noSidebarRoutes = ['/', '/login', '/register'];
  const hideSidebar = noSidebarRoutes.includes(pathname);

  if (hideSidebar) {
    return (
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-300">
          {children}
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
