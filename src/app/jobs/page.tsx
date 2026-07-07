import { Suspense } from "react";
import type { Metadata } from "next";
import Loader from "@/components/Loader";
import JobsPageContent from "./JobsPageContent";

export const metadata: Metadata = {
  title: "Browse Jobs",
  description: "Search and filter thousands of job listings across Myanmar by title, location, and category."
};

export default function JobsPage() {
  return (
    <Suspense fallback={<Loader label="Loading jobs..." />}>
      <JobsPageContent />
    </Suspense>
  );
}
