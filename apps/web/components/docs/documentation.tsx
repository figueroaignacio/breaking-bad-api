// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Card } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Categories } from './categories';
import { GettingStarted } from './getting-started';
import { Legends } from './legends';
import { Regions } from './regions';

export function Documentation() {
  const t = useTranslations('sections');

  const tabs = [
    { value: 'getting-started', label: 'Getting Started', Component: GettingStarted },
    { value: 'legends', label: 'Legends', Component: Legends },
    { value: 'regions', label: 'Regions', Component: Regions },
    { value: 'categories', label: 'Categories', Component: Categories },
  ];

  return (
    <section id="documentation" className="border-border container border-t py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">{t('docs.title')}</h2>
          <p className="text-muted-foreground text-balance text-lg">{t('docs.description')}</p>
        </div>
        <Card className="p-8">
          <Tabs defaultValue={tabs[0]?.value ?? ''} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              {tabs.map(({ value, label }) => (
                <TabsTrigger key={value} value={value}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ value, Component }) => (
              <TabsContent key={value} value={value} className="mt-6">
                <Component />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
