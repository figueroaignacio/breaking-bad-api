'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const examplesNav = [
  { label: 'Characters', href: '/examples/characters' },
  { label: 'Episodes', href: '/examples/episodes' },
  { label: 'Quotes', href: '/examples/quotes' },
];

export function ExamplesNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <ul className="flex gap-8 py-4">
          {examplesNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-accent border-accent border-b-2 pb-0.5'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
