"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import Seal from "@/components/Seal";
import { getAllJobs } from "@/lib/jobs";
import { Job, JOB_CATEGORIES } from "@/lib/types";

function tickerTime(ms: number): string {
  const days = Math.floor((Date.now() - ms) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllJobs()
      .then(setJobs)
      .catch(() => setError("Could not load jobs. Please check your Firebase configuration."))
      .finally(() => setLoading(false));
  }, []);

  const featured = [...jobs.filter((j) => j.featured), ...jobs.filter((j) => !j.featured)].slice(0, 6);
  const ticker = jobs.slice(0, 8);

  return (
    <div>
      <section className="overflow-hidden border-b border-brand-800/10 bg-gradient-to-b from-brand-50/60 to-mist dark:border-gold-300/10 dark:from-brand-950 dark:to-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
              Ktzeejobs.mm · Yangon — Mandalay — Beyond
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Find work
              <br />
              that <span className="text-brand-600 dark:text-brand-400">fits.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600 dark:text-slate-300">
              New openings added every day, from Yangon tech teams to Mandalay trading houses.
            </p>

            <div className="mt-8 max-w-2xl">
              <SearchBar variant="hero" />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {JOB_CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat}
                  href={`/jobs?category=${encodeURIComponent(cat)}`}
                  className="rounded-full border border-slate-300 bg-white/60 px-3 py-1.5 font-mono text-xs font-medium text-slate-600 transition hover:border-brand-500 hover:bg-brand-600 hover:text-white dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:border-brand-400 dark:hover:bg-brand-600 dark:hover:text-white"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {ticker.length > 0 && (
            <div className="ticker-pause relative h-80 overflow-hidden rounded-2xl border border-brand-800/10 bg-white/70 shadow-xl shadow-brand-900/5 backdrop-blur dark:border-gold-300/10 dark:bg-brand-950/60">
              <div className="absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-mist to-transparent dark:from-ink" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-mist to-transparent dark:from-ink" />
              <div className="animate-ticker px-5 py-6">
                {[...ticker, ...ticker].map((job, i) => (
                  <Link
                    key={`${job.id}-${i}`}
                    href={`/jobs/${job.id}`}
                    className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-3.5 text-sm transition hover:text-brand-600 dark:border-slate-800 dark:hover:text-brand-400"
                  >
                    <span className="min-w-0">
                      <span className="line-clamp-1 block font-medium text-slate-800 dark:text-slate-100">{job.title}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {job.company} · {job.location}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {tickerTime(job.createdAt)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">
              Currently hiring
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">Featured Jobs</h2>
          </div>
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

        {!loading && featured.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-ink py-16">
        <div className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <Seal size={56} />
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Hiring in Myanmar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-100/80">
              Reach thousands of qualified candidates across the country. Contact us to get your open roles listed.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-gold-400 px-6 py-3 text-sm font-semibold text-gold-300 transition hover:bg-gold-400 hover:text-ink active:scale-95"
          >
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  );
}
