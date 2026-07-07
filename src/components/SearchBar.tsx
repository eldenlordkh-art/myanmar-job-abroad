"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "@/lib/types";

interface SearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  initialCategory?: string;
  variant?: "hero" | "compact";
}

export default function SearchBar({
  initialQuery = "",
  initialLocation = "",
  initialCategory = "",
  variant = "hero"
}: SearchBarProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [category, setCategory] = useState(initialCategory);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center ${
        variant === "hero" ? "shadow-lg" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-400">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title or keyword"
          className="w-full bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </div>

      <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-lg bg-transparent px-2 py-2 text-sm text-slate-700 outline-none dark:text-slate-200 sm:w-44"
      >
        <option value="">All locations</option>
        {JOB_LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg bg-transparent px-2 py-2 text-sm text-slate-700 outline-none dark:text-slate-200 sm:w-56"
      >
        <option value="">All categories</option>
        {JOB_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full shrink-0 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 sm:w-auto"
      >
        Search Jobs
      </button>
    </form>
  );
}
