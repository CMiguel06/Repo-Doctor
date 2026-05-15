import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Doctor",
  description: "Repository health analysis for developers, students and technical reviewers."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
