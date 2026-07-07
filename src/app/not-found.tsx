import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <h1 className="text-5xl font-extrabold text-brand-600 dark:text-brand-400">404</h1>
      <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">Page not found</p>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-6 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
        Back to Home
      </Link>
    </div>
  );
}
