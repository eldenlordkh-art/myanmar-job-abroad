import Link from "next/link";
import Seal from "./Seal";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-800/10 bg-mist dark:border-gold-300/10 dark:bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold text-brand-800 dark:text-mist">
              <Seal size={26} />
              Ktzeejobs.mm
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-600 dark:text-slate-400">
              Connecting talented professionals across Myanmar with the country&apos;s best employers.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/jobs" className="hover:text-brand-600 dark:hover:text-brand-400">Find Jobs</Link></li>
              <li><Link href="/companies" className="hover:text-brand-600 dark:hover:text-brand-400">Companies</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-400">Contact</Link></li>
              <li><Link href="/login" className="hover:text-brand-600 dark:hover:text-brand-400">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>thazinpwintthu.tzpt@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-brand-800/10 pt-6 text-center font-mono text-xs text-slate-500 dark:border-gold-300/10 dark:text-slate-500">
          © {new Date().getFullYear()} Ktzeejobs.mm. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
