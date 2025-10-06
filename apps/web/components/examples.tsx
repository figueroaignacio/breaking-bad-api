import { Card } from '@workspace/ui/components/card';

export function Examples() {
  return (
    <section id="examples" className="border-border container border-t py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Response Examples</h2>
          <p className="text-muted-foreground text-balance text-lg">
            See what you'll get from our API
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Single Legend Response</h3>
            <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
              <code className="text-foreground font-mono">{`{
  "id": "legend_001",
  "title": "The Vanishing Hitchhiker",
  "story": "A driver picks up a hitchhiker...",
  "origin": "United States",
  "category": "Ghost Story",
  "year_originated": "1940s",
  "variations": 47,
  "cultural_context": "Post-WWII America",
  "verified": false,
  "tags": ["ghost", "highway", "disappearance"],
  "related_legends": ["legend_023", "legend_156"]
}`}</code>
            </pre>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">List Response</h3>
            <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-xs">
              <code className="text-foreground font-mono">{`{
  "data": [
    {
      "id": "legend_001",
      "title": "The Vanishing Hitchhiker",
      "excerpt": "A driver picks up...",
      "category": "Ghost Story",
      "origin": "United States"
    },
    // ... more legends
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1247,
    "pages": 63
  }
}`}</code>
            </pre>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20 mt-8 p-8">
          <div className="text-center">
            <h3 className="mb-3 text-2xl font-bold">Ready to start building?</h3>
            <p className="text-muted-foreground mb-6">
              No API key required for basic usage. Start making requests right away.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <code className="bg-background border-border rounded-lg border px-4 py-2 font-mono text-sm">
                https://api.urbanlegends.dev/v1/legends/random
              </code>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
