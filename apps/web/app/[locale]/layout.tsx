// next-intl
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Styles
import '@workspace/ui/globals.css';

// Fonts
import { geist } from '@/lib/fonts';

// Next and React
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type React from 'react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Urban Legends API - Professional Folklore Database',
  description:
    'Access thousands of urban legends, myths, and folklore stories through our comprehensive REST API. Free and open for developers.',
  generator: 'v0.app',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${geist.className} mx-auto max-w-7xl antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
