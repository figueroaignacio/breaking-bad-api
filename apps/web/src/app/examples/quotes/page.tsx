import { Logo } from '@/components/logo';
import { QuoteCard } from '@/components/quote-card';
import type { Quote } from '@/lib/definitions';

async function getQuotes() {
  const res = await fetch('http://localhost:3001/api/quotes');
  const quotes = await res.json();
  return quotes.data;
}

export default async function QuotesExamplePage() {
  const quotes: Quote[] = await getQuotes();

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center">
          <Logo />
          <p className="mt-4 text-lg text-gray-600">Best quotes</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </div>
    </section>
  );
}
