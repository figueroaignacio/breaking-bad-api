import { Badge } from "@workspace/ui/components/badge";
import { Card } from "@workspace/ui/components/card";

const endpoints = [
  {
    method: "GET",
    path: "/v1/legends",
    description: "Get all urban legends with pagination",
    params: ["page", "limit", "category", "origin"],
  },
  {
    method: "GET",
    path: "/v1/legends/random",
    description: "Get a random urban legend",
    params: ["category"],
  },
  {
    method: "GET",
    path: "/v1/legends/:id",
    description: "Get a specific legend by ID",
    params: [],
  },
  {
    method: "GET",
    path: "/v1/legends/search",
    description: "Search legends by keyword",
    params: ["q", "limit"],
  },
  {
    method: "GET",
    path: "/v1/categories",
    description: "Get all available categories",
    params: [],
  },
  {
    method: "GET",
    path: "/v1/origins",
    description: "Get all geographic origins",
    params: [],
  },
];

export function Endpoints() {
  return (
    <section id="endpoints" className="container py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            API Endpoints
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Complete reference for all available endpoints
          </p>
        </div>

        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <Card
              key={endpoint.path}
              className="p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 font-mono">
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono text-foreground">
                      {endpoint.path}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {endpoint.description}
                  </p>
                </div>

                {endpoint.params.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {endpoint.params.map((param) => (
                      <Badge
                        key={param}
                        variant="secondary"
                        className="font-mono text-xs">
                        {param}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-muted/50">
          <h3 className="mb-3 text-lg font-semibold">Base URL</h3>
          <code className="text-sm font-mono text-primary">
            https://api.urbanlegends.dev
          </code>
          <p className="mt-4 text-sm text-muted-foreground">
            All endpoints return JSON responses. Rate limit: 100 requests per
            minute for free tier.
          </p>
        </Card>
      </div>
    </section>
  );
}
