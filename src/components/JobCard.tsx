import Link from "next/link";
import { Job } from "@/lib/types";
import Seal from "./Seal";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const day = 86400000;
  const days = Math.floor(diff / day);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Salary negotiable";
  const fmt = (n: number) => `${(n / 1000).toFixed(0)}K`;
  if (min && max) return `${fmt(min)} - ${fmt(max)} MMK`;
  return `${fmt((min || max) as number)} MMK`;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-slate-800 dark:bg-brand-950 dark:hover:border-brand-700"
    >
      {job.featured && (
        <div className="absolute -right-2 -top-2 rotate-6 transition group-hover:rotate-0">
          <div className="relative">
            <Seal size={44} />
            <span className="absolute inset-0 flex -rotate-6 items-center justify-center font-mono text-[7px] font-bold uppercase tracking-tight text-gold-100 transition group-hover:rotate-0">
              Featured
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700 transition group-hover:scale-105 dark:bg-brand-900 dark:text-brand-300">
          {job.company.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-1 font-display font-semibold text-slate-900 decoration-brand-400 decoration-2 underline-offset-4 group-hover:underline dark:text-white">
            {job.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{job.company}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs">
        <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/50 dark:text-brand-300">
          {job.location}
        </span>
        <span className="rounded-full border border-gold-200 bg-gold-50 px-2.5 py-1 font-medium text-gold-700 dark:border-gold-700/40 dark:bg-gold-700/10 dark:text-gold-300">
          {job.type}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {job.category}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{timeAgo(job.createdAt)}</span>
      </div>
    </Link>
  );
}
