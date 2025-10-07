// next-intl
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

// Components
import { Documentation } from '@/components/docs/documentation';
import { Endpoints } from '@/components/endpoints';
import { Examples } from '@/components/examples';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Overview } from '@/components/overview';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default function Home({ params }: HomePageProps) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Overview />
        <Documentation />
        <Endpoints />
        <Examples />
      </main>
      <Footer />
    </div>
  );
}
