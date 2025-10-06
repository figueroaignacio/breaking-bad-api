// next-intl
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

// Components
import { Documentation } from '@/components/documentation';
import { Endpoints } from '@/components/endpoints';
import { Examples } from '@/components/examples';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';

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
        <Features />
        <Documentation />
        <Endpoints />
        <Examples />
      </main>
      <Footer />
    </div>
  );
}
