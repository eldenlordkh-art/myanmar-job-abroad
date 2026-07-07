import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myanmarjobs.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyanmarJobs — Find Your Next Job in Myanmar",
    template: "%s | MyanmarJobs"
  },
  description:
    "Myanmar's modern job board. Browse thousands of job listings across Yangon, Mandalay, and beyond, in IT, sales, finance, healthcare, and more.",
  keywords: [
    "Myanmar jobs",
    "Yangon jobs",
    "job board Myanmar",
    "career Myanmar",
    "hiring Myanmar"
  ],
  openGraph: {
    title: "MyanmarJobs — Find Your Next Job in Myanmar",
    description:
      "Browse thousands of job listings across Myanmar. Search by title, location, and category.",
    url: siteUrl,
    siteName: "MyanmarJobs",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "MyanmarJobs — Find Your Next Job in Myanmar",
    description: "Myanmar's modern job board."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
