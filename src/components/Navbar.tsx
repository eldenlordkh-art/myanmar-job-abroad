"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/companies", label: "Companies" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-700 dark:text-brand-400">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">M</span>
          MyanmarJobs
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-brand-600 dark:hover:text-brand-400 ${
                pathname === l.href ? "text-brand-600 dark:text-brand-400" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin ? (
            <>
              <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400">
                Admin
              </Link>
              <button
                onClick={() => logout()}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Admin Login
            </Link>
          )}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {l.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <Link href="/admin" onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Admin
                </Link>
                <button onClick={() => logout()} className="text-left text-sm font-medium text-slate-700 dark:text-slate-200">
                  Log out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
