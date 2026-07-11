import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Ktzeejobs.mm team — ask questions or post a job opening."
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
