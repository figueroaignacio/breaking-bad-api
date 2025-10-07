// Hooks
import { Card, CardDescription, CardTitle } from '@workspace/ui/components/card';
import { useTranslations } from 'next-intl';

interface OverviewItems {
  title: string;
  description: string;
}

export function Overview() {
  const t = useTranslations('sections');
  const items: OverviewItems[] = t.raw('overview.items');

  return (
    <section className="border-border container border-t py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">{t('overview.title')}</h2>
          <p className="text-muted-foreground text-balance text-lg">{t('overview.description')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="hover:border-primary/50 p-6 transition-colors">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
