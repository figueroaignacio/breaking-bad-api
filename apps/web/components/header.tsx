import { Button } from "@workspace/ui/components/button";
import { BookOpen, Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Urban Legends API</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#documentation"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </a>
          <a
            href="#endpoints"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Endpoints
          </a>
          <a
            href="#examples"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
