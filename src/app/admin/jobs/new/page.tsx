"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import JobForm from "@/components/JobForm";
import { createJob } from "@/lib/jobs";
import { JobInput } from "@/lib/types";

function NewJobForm() {
  const router = useRouter();

  const handleSubmit = async (input: JobInput) => {
    const id = await createJob(input);
    router.push(`/admin`);
    router.refresh();
    return void id;
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Add New Job</h1>
      <p className="mt-1 text-slate-500 dark:text-slate-400">Fill in the details below to publish a new listing.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <JobForm onSubmit={handleSubmit} submitLabel="Publish Job" />
      </div>
    </div>
  );
}

export default function NewJobPage() {
  return (
    <ProtectedRoute>
      <NewJobForm />
    </ProtectedRoute>
  );
}
