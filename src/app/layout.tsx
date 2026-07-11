import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display"
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const data = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-data"
});

const myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600"],
  variable: "--font-myanmar"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ktzeejobs.mm";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ktzeejobs.mm — Find Your Next Job in Myanmar",
    template: "%s | Ktzeejobs.mm"
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
    title: "Ktzeejobs.mm — Find Your Next Job in Myanmar",
    description:
      "Browse thousands of job listings across Myanmar. Search by title, location, and category.",
    url: siteUrl,
    siteName: "Ktzeejobs.mm",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ktzeejobs.mm — Find Your Next Job in Myanmar",
    description: "Myanmar's modern job board."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${data.variable} ${myanmar.variable}`}>
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
