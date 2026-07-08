import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-brand-700 dark:text-brand-400">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-sm text-white">M</span>
              MyanmarJobs
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              Connecting talented professionals across Myanmar with the country&apos;s best employers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/jobs" className="hover:text-brand-600 dark:hover:text-brand-400">Find Jobs</Link></li>
              <li><Link href="/companies" className="hover:text-brand-600 dark:hover:text-brand-400">Companies</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-400">Contact</Link></li>
              <li><Link href="/login" className="hover:text-brand-600 dark:hover:text-brand-400">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Yangon, Myanmar</li>
              <li>thazinpwintthu.tzpt@gmail.com</li>
              <li>+95 9 000 000 000</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} MyanmarJobs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
