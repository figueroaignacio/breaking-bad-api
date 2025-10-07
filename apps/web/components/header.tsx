// Hooks
import { useTranslations } from 'next-intl';

// Components
import { BookOpen } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

interface Navigation {
  label: string;
  href: string;
}

export function Header() {
  const t = useTranslations('components');
  const navigation: Navigation[] = t.raw('header.navigation');

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
            <BookOpen className="text-primary-foreground h-5 w-5" />
          </div>
          <span className="text-xl font-bold">Urban Legends API</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <a
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
