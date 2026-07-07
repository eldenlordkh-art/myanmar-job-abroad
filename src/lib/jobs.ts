import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit as fsLimit,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import { Job, JobInput } from "./types";

const JOBS_COLLECTION = "jobs";

function toJob(id: string, data: any): Job {
  return {
    id,
    title: data.title,
    company: data.company,
    companyLogo: data.companyLogo,
    location: data.location,
    category: data.category,
    type: data.type,
    salaryMin: data.salaryMin,
    salaryMax: data.salaryMax,
    description: data.description,
    requirements: data.requirements || [],
    benefits: data.benefits || [],
    applyEmail: data.applyEmail,
    applyUrl: data.applyUrl,
    featured: !!data.featured,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toMillis()
        : data.createdAt || Date.now(),
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toMillis()
        : data.updatedAt,
    deadline: data.deadline
  };
}

export async function getAllJobs(): Promise<Job[]> {
  const q = query(collection(db, JOBS_COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toJob(d.id, d.data()));
}

export async function getFeaturedJobs(count = 6): Promise<Job[]> {
  const jobs = await getAllJobs();
  const featured = jobs.filter((j) => j.featured);
  const rest = jobs.filter((j) => !j.featured);
  return [...featured, ...rest].slice(0, count);
}

export async function getJobById(id: string): Promise<Job | null> {
  const ref = doc(db, JOBS_COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return toJob(snap.id, snap.data());
}

export async function createJob(input: JobInput): Promise<string> {
  const ref = await addDoc(collection(db, JOBS_COLLECTION), {
    ...input,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  return ref.id;
}

export async function updateJob(id: string, input: Partial<JobInput>): Promise<void> {
  const ref = doc(db, JOBS_COLLECTION, id);
  await updateDoc(ref, { ...input, updatedAt: Date.now() });
}

export async function deleteJob(id: string): Promise<void> {
  const ref = doc(db, JOBS_COLLECTION, id);
  await deleteDoc(ref);
}
