"use client";

import { useState, FormEvent } from "react";
import { Job, JobInput, JOB_CATEGORIES, JOB_LOCATIONS, JOB_TYPES } from "@/lib/types";

interface JobFormProps {
  initialJob?: Job;
  onSubmit: (input: JobInput) => Promise<void>;
  submitLabel?: string;
}

export default function JobForm({ initialJob, onSubmit, submitLabel = "Save Job" }: JobFormProps) {
  const [title, setTitle] = useState(initialJob?.title || "");
  const [company, setCompany] = useState(initialJob?.company || "");
  const [companyLogo, setCompanyLogo] = useState(initialJob?.companyLogo || "");
  const [location, setLocation] = useState(initialJob?.location || JOB_LOCATIONS[0]);
  const [category, setCategory] = useState(initialJob?.category || JOB_CATEGORIES[0]);
  const [type, setType] = useState(initialJob?.type || JOB_TYPES[0]);
  const [salaryMin, setSalaryMin] = useState(initialJob?.salaryMin?.toString() || "");
  const [salaryMax, setSalaryMax] = useState(initialJob?.salaryMax?.toString() || "");
  const [description, setDescription] = useState(initialJob?.description || "");
  const [requirements, setRequirements] = useState(initialJob?.requirements.join("\n") || "");
  const [benefits, setBenefits] = useState(initialJob?.benefits?.join("\n") || "");
  const [applyEmail, setApplyEmail] = useState(initialJob?.applyEmail || "");
  const [applyUrl, setApplyUrl] = useState(initialJob?.applyUrl || "");
  const [deadline, setDeadline] = useState(initialJob?.deadline || "");
  const [featured, setFeatured] = useState(initialJob?.featured || false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !company || !description) {
      setError("Title, company, and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        title,
        company,
        companyLogo: companyLogo || undefined,
        location,
        category,
        type,
        salaryMin: salaryMin ? Number(salaryMin) : undefined,
        salaryMax: salaryMax ? Number(salaryMax) : undefined,
        description,
        requirements: requirements.split("\n").map((r) => r.trim()).filter(Boolean),
        benefits: benefits.split("\n").map((b) => b.trim()).filter(Boolean),
        applyEmail: applyEmail || undefined,
        applyUrl: applyUrl || undefined,
        deadline: deadline || undefined,
        featured
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Job Title *</label>
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend Developer" />
        </div>
        <div>
          <label className={labelClass}>Company Name *</label>
          <input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Golden Rock Tech" />
        </div>
        <div>
          <label className={labelClass}>Company Logo URL</label>
          <input className={inputClass} value={companyLogo} onChange={(e) => setCompanyLogo(e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <select className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)}>
            {JOB_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Job Type</label>
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as any)}>
            {JOB_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Minimum Salary (MMK)</label>
          <input type="number" className={inputClass} value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="e.g. 500000" />
        </div>
        <div>
          <label className={labelClass}>Maximum Salary (MMK)</label>
          <input type="number" className={inputClass} value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="e.g. 900000" />
        </div>
        <div>
          <label className={labelClass}>Application Email</label>
          <input className={inputClass} value={applyEmail} onChange={(e) => setApplyEmail(e.target.value)} placeholder="hr@company.com" />
        </div>
        <div>
          <label className={labelClass}>Application URL</label>
          <input className={inputClass} value={applyUrl} onChange={(e) => setApplyUrl(e.target.value)} placeholder="https://company.com/apply" />
        </div>
        <div>
          <label className={labelClass}>Application Deadline</label>
          <input type="date" className={inputClass} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="featured" className="text-sm font-medium text-slate-700 dark:text-slate-300">Mark as featured job</label>
        </div>
      </div>

      <div>
        <label className={labelClass}>Job Description *</label>
        <textarea className={inputClass} rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the role, responsibilities, and team..." />
      </div>

      <div>
        <label className={labelClass}>Requirements (one per line)</label>
        <textarea className={inputClass} rows={4} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder={"Bachelor's degree in related field\n2+ years experience"} />
      </div>

      <div>
        <label className={labelClass}>Benefits (one per line)</label>
        <textarea className={inputClass} rows={3} value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder={"Health insurance\nAnnual bonus"} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
