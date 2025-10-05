import { Card } from "@workspace/ui/components/card";

export function Examples() {
  return (
    <section id="examples" className="container py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Response Examples
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            See what you'll get from our API
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Single Legend Response
            </h3>
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-xs">
              <code className="font-mono text-foreground">{`{
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
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-xs">
              <code className="font-mono text-foreground">{`{
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

        <Card className="mt-8 p-8 bg-primary/5 border-primary/20">
          <div className="text-center">
            <h3 className="mb-3 text-2xl font-bold">
              Ready to start building?
            </h3>
            <p className="mb-6 text-muted-foreground">
              No API key required for basic usage. Start making requests right
              away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <code className="rounded-lg bg-background px-4 py-2 text-sm font-mono border border-border">
                https://api.urbanlegends.dev/v1/legends/random
              </code>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
