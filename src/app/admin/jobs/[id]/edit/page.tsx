"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobForm from "@/components/JobForm";
import Loader from "@/components/Loader";
import { getJobById, updateJob } from "@/lib/jobs";
import { Job, JobInput } from "@/lib/types";

function EditJobForm() {
  const params = useParams();
  const router = useRouter();
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

  const handleSubmit = async (input: JobInput) => {
    await updateJob(id, input);
    router.push("/admin");
    router.refresh();
  };

  if (loading) return <Loader label="Loading job..." />;

  if (notFound || !job) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Job not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Job</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Update the listing details below.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <JobForm initialJob={job} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

export default function EditJobPage() {
  return (
    <ProtectedRoute>
      <EditJobForm />
    </ProtectedRoute>
  );
}
