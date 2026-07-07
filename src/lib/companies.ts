import { Job } from "./types";

export interface CompanySummary {
  name: string;
  logo?: string;
  location: string;
  openJobs: number;
  categories: string[];
}

/**
 * Companies are derived from active job postings so admins only need to
 * manage one collection (jobs) in Firestore. Group jobs by company name.
 */
export function deriveCompanies(jobs: Job[]): CompanySummary[] {
  const map = new Map<string, CompanySummary>();

  for (const job of jobs) {
    const existing = map.get(job.company);
    if (existing) {
      existing.openJobs += 1;
      if (!existing.categories.includes(job.category)) {
        existing.categories.push(job.category);
      }
      if (!existing.logo && job.companyLogo) existing.logo = job.companyLogo;
    } else {
      map.set(job.company, {
        name: job.company,
        logo: job.companyLogo,
        location: job.location,
        openJobs: 1,
        categories: [job.category]
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.openJobs - a.openJobs);
}
