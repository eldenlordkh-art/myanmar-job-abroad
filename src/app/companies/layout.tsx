import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies Hiring in Myanmar",
  description: "Browse companies currently hiring in Myanmar and see their open job listings."
};

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
