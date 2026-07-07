"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import { getAllJobs } from "@/lib/jobs";
import { deriveCompanies, CompanySummary } from "@/lib/companies";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllJobs()
      .then((jobs) => setCompanies(deriveCompanies(jobs)))
      .catch(() => setError("Could not load companies. Please check your Firebase configuration."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Companies Hiring in Myanmar</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {loading ? "Loading..." : `${companies.length} compan${companies.length === 1 ? "y" : "ies"} with open roles`}
      </p>

      <div className="mt-8">
        {loading && <Loader label="Loading companies..." />}

        {!loading && error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
            {error}
          </div>
        )}

        {!loading && !error && companies.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No companies yet. Companies appear here automatically once jobs are posted.
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c) => (
              <Link
                key={c.name}
                href={`/jobs?q=${encodeURIComponent(c.name)}`}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-lg font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{c.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{c.location}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="mt-4 border-t border-slate-100 pt-3 text-sm font-medium text-brand-600 dark:border-slate-800 dark:text-brand-400">
                  {c.openJobs} open job{c.openJobs === 1 ? "" : "s"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
