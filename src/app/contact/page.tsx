"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name} via MyanmarJobs`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:hello@myanmarjobs.example?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Us</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Questions about a job listing, or want to post a role? Reach out — we usually reply within one business day.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Email</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">hello@myanmarjobs.example</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Phone</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">+95 9 000 000 000</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Office</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Hledan Township, Yangon, Myanmar</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Hours</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Mon–Fri, 9:00 AM – 5:30 PM (MMT)</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {sent && (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
              Thanks! Your email app should have opened with your message pre-filled.
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
            <input required className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Your Email</label>
            <input required type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
            <textarea required rows={5} className={inputClass} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="submit" className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
