"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import { getJobById } from "@/lib/jobs";
import { Job } from "@/lib/types";

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Salary negotiable";
  const fmt = (n: number) => n.toLocaleString();
  if (min && max) return `${fmt(min)} - ${fmt(max)} MMK / month`;
  return `${fmt((min || max) as number)} MMK / month`;
}

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getJobById(id)
      .then((j) => {
        if (!j) setNotFound(true);
        else setJob(j);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Loading job details..." />;

  if (notFound || !job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job not found</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">This job may have been removed or the link is incorrect.</p>
        <Link href="/jobs" className="mt-6 inline-block text-brand-600 hover:text-brand-700 dark:text-brand-400">
          ← Back to all jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/jobs" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
        ← Back to all jobs
      </Link>

      <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-2xl font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{job.company} · {job.location}</p>
          </div>
        </div>
        {job.featured && (
          <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            Featured
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{job.type}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{job.category}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{formatSalary(job.salaryMin, job.salaryMax)}</span>
        {job.deadline && (
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Job Description</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {job.description}
            </p>
          </section>

          {job.requirements.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Requirements</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Benefits</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">Apply for this job</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {job.applyUrl
              ? "Apply directly on the company's site."
              : job.applyEmail
              ? "Send your CV to the email below."
              : "Contact us for application details."}
          </p>

          {job.applyUrl && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700"
            >
              Apply Now
            </a>
          )}

          {!job.applyUrl && job.applyEmail && (
            <a
              href={`mailto:${job.applyEmail}?subject=Application for ${encodeURIComponent(job.title)}`}
              className="mt-4 block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700"
            >
              Email Application
            </a>
          )}

          {!job.applyUrl && !job.applyEmail && (
            <Link
              href="/contact"
              className="mt-4 block w-full rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700"
            >
              Contact Us
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
