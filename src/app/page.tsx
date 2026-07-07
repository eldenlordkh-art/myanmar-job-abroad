"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import { getFeaturedJobs } from "@/lib/jobs";
import { Job, JOB_CATEGORIES } from "@/lib/types";

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getFeaturedJobs(6)
      .then(setJobs)
      .catch(() => setError("Could not load jobs. Please check your Firebase configuration."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Find your next job in <span className="text-brand-600 dark:text-brand-400">Myanmar</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Thousands of opportunities across Yangon, Mandalay, and beyond — updated daily.
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBar variant="hero" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {JOB_CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat}
                href={`/jobs?category=${encodeURIComponent(cat)}`}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Jobs</h2>
          <Link href="/jobs" className="text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            View all jobs →
          </Link>
        </div>

        {loading && <Loader label="Loading featured jobs..." />}

        {!loading && error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
            {error} Add your Firebase credentials to <code>.env.local</code> and create some jobs from the admin dashboard.
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No jobs posted yet. Log in as admin to add the first listing.
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-brand-600 py-14 dark:bg-brand-900">
        <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Hiring in Myanmar?</h2>
          <p className="mt-3 text-brand-100">
            Reach thousands of qualified candidates across the country. Contact us to get your open roles listed.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  );
}
