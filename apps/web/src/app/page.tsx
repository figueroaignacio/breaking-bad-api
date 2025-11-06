import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Logo />
        </div>
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-accent">RESTful API</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl text-center text-lg">
          A collection of Breaking Bad resources — characters, episodes, and quotes — available
          through a clean RESTful API.
        </p>
        <Link href="/examples/characters" className="bg-accent mt-5 rounded-sm p-3 text-white">
          See examples
        </Link>
      </main>
    </div>
  );
}
