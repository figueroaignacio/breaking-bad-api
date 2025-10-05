import { Analytics } from "@vercel/analytics/next";
import "@workspace/ui/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Urban Legends API - Professional Folklore Database",
  description:
    "Access thousands of urban legends, myths, and folklore stories through our comprehensive REST API. Free and open for developers.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased max-w-7xl mx-auto`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
