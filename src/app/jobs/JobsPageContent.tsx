"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import Loader from "@/components/Loader";
import { getAllJobs } from "@/lib/jobs";
import { Job, JOB_TYPES } from "@/lib/types";

export default function JobsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllJobs()
      .then(setJobs)
      .catch(() => setError("Could not load jobs. Please check your Firebase configuration."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQ =
        !q ||
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.company.toLowerCase().includes(q.toLowerCase());
      const matchesLocation = !location || job.location === location;
      const matchesCategory = !category || job.category === category;
      const matchesType = !type || job.type === type;
      return matchesQ && matchesLocation && matchesCategory && matchesType;
    });
  }, [jobs, q, location, category, type]);

  const setTypeFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("type", value);
    else params.delete("type");
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Browse Jobs</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {loading ? "Loading..." : `${filtered.length} job${filtered.length === 1 ? "" : "s"} found`}
      </p>

      <div className="mt-6">
        <SearchBar initialQuery={q} initialLocation={location} initialCategory={category} variant="compact" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setTypeFilter("")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            !type
              ? "bg-brand-600 text-white"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          All Types
        </button>
        {JOB_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              type === t
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {loading && <Loader label="Loading jobs..." />}

        {!loading && error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No jobs match your filters. Try adjusting your search.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
