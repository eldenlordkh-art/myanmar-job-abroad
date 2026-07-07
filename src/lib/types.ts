export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string; // e.g. "Yangon", "Mandalay", "Remote"
  category: string; // e.g. "IT & Software", "Sales", "Finance"
  type: JobType;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  requirements: string[];
  benefits?: string[];
  applyEmail?: string;
  applyUrl?: string;
  featured?: boolean;
  createdAt: number; // epoch ms
  updatedAt?: number;
  deadline?: string; // ISO date
}

export type JobInput = Omit<Job, "id" | "createdAt" | "updatedAt">;

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  website?: string;
  description: string;
}

export const JOB_CATEGORIES = [
  "IT & Software",
  "Sales & Marketing",
  "Finance & Accounting",
  "Human Resources",
  "Engineering",
  "Customer Service",
  "Education & Training",
  "Healthcare",
  "Hospitality & Tourism",
  "Construction",
  "Logistics & Supply Chain",
  "Design & Media",
  "Admin & Office",
  "Other"
];

export const JOB_LOCATIONS = [
  "Yangon",
  "Mandalay",
  "Naypyidaw",
  "Bago",
  "Mawlamyine",
  "Taunggyi",
  "Pathein",
  "Remote"
];

export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
