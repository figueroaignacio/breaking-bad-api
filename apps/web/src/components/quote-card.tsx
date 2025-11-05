import type { Quote } from '@/lib/definitions';

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="border-border bg-card relative overflow-hidden rounded-lg border">
      <div className="bg-primary absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <blockquote className="border-accent border-l-4 p-6">
        <p className="text-accent text-lg font-semibold italic">&quot;{quote.quote}&quot;</p>
      </blockquote>

      <div className="space-y-3 px-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-secondary h-2 w-2 rounded-full" />
          <p className="text-foreground text-sm">
            <span className="font-bold">{quote.character.name}</span>
            {quote.character.nickname && (
              <span className="text-muted-foreground"> ({quote.character.nickname})</span>
            )}
          </p>
        </div>

        <div className="bg-muted/30 rounded px-3 py-2">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            Season {quote.episode.season} • Episode {quote.episode.episode}
          </p>
          <p className="text-foreground mt-1 text-sm font-medium">{quote.episode.title}</p>
        </div>

        {quote.context && (
          <div className="border-accent bg-accent/5 border-l-2 p-3">
            <p className="text-foreground/80 text-sm">{quote.context}</p>
          </div>
        )}
      </div>
    </div>
  );
}
