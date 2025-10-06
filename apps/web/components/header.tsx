import { Button } from '@workspace/ui/components/button';
import { BookOpen, Github } from 'lucide-react';

export function Header() {
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
          <a
            href="#documentation"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Documentation
          </a>
          <a
            href="#endpoints"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Endpoints
          </a>
          <a
            href="#examples"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Examples
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
