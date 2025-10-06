import { Card } from '@workspace/ui/components/card';
import { Code2, Database, Globe, Lock, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with global CDN distribution and sub-100ms response times.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Legends from every continent, culture, and time period. Constantly updated.',
  },
  {
    icon: Lock,
    title: 'Reliable & Secure',
    description: '99.9% uptime SLA with enterprise-grade security and data protection.',
  },
  {
    icon: Code2,
    title: 'Developer Friendly',
    description: 'RESTful design, comprehensive docs, and SDKs for popular languages.',
  },
  {
    icon: Database,
    title: 'Rich Metadata',
    description: 'Each legend includes origin, category, variations, and cultural context.',
  },
  {
    icon: Sparkles,
    title: 'Always Free',
    description: 'No API keys required for basic usage. Premium features available.',
  },
];

export function Features() {
  return (
    <section className="border-border container border-t py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Built for modern developers</h2>
          <p className="text-muted-foreground text-balance text-lg">
            Everything you need to integrate urban legends into your applications
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:border-primary/50 p-6 transition-colors">
              <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <feature.icon className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
