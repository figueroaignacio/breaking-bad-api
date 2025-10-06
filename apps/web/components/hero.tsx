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
        <div className="border-border bg-muted mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
          <Sparkles className="text-primary h-4 w-4" />
          <span className="text-muted-foreground">{t('hero.badge')}</span>
        </div>
        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {t('hero.title')}
        </h1>
        <p className="text-muted-foreground mb-10 text-balance text-xl leading-relaxed">
          {t('hero.description')}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="text-base">
            {t('hero.actions.getStarted')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-base">
            {t('hero.actions.viewApi')}
          </Button>
        </div>

        <div className="border-border bg-card mt-16 rounded-lg border p-6">
          <div className="flex items-start gap-3 text-left">
            <div className="bg-primary/10 text-primary rounded px-2 py-1 font-mono text-xs">
              GET
            </div>
            <code className="text-muted-foreground flex-1 font-mono text-sm">
              https://api.urbanlegends.dev/v1/legends/random
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
