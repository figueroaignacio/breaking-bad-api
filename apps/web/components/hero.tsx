// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Button } from '@workspace/ui/components/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const t = useTranslations('sections');

  return (
    <section className="container py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">{t('hero.badge')}</span>
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {t('hero.title')}
        </h1>
        <p className="mb-10 text-xl text-muted-foreground text-balance leading-relaxed">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="text-base">
            {t('hero.actions.getStarted')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-base bg-transparent">
            {t('hero.actions.viewApi')}
          </Button>
        </div>

        <div className="mt-16 rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-3 text-left">
            <div className="rounded bg-primary/10 px-2 py-1 text-xs font-mono text-primary">
              GET
            </div>
            <code className="flex-1 text-sm font-mono text-muted-foreground">
              https://api.urbanlegends.dev/v1/legends/random
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
