import type { Episode } from '@/lib/definitions';

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="border-border bg-card group relative overflow-hidden rounded-lg border">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-primary/20 text-primary inline-block rounded-md px-3 py-1 text-sm font-bold">
            S{String(episode.season).padStart(2, '0')}E{String(episode.episode).padStart(2, '0')}
          </span>
          {episode.duration && (
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
              {episode.duration}
            </span>
          )}
        </div>

        <h3 className="text-foreground mb-3 text-xl font-bold">{episode.title}</h3>

        <p className="text-foreground/80 mb-4 line-clamp-2 text-sm leading-relaxed">
          {episode.synopsis}
        </p>

        <div className="border-border/50 mb-4 space-y-2 border-y py-3">
          {episode.director && (
            <div className="text-sm">
              <span className="text-accent font-semibold">Director:</span>
              <span className="text-foreground/90 ml-2">{episode.director}</span>
            </div>
          )}
          {episode.writer && (
            <div className="text-sm">
              <span className="text-accent font-semibold">Writer:</span>
              <span className="text-foreground/90 ml-2">{episode.writer}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {episode.imdbRating && (
            <span className="text-accent flex items-center gap-1 font-semibold">
              <span>★</span>
              {episode.imdbRating}
            </span>
          )}
          {episode.airDate && (
            <span className="text-muted-foreground text-xs">
              {new Date(episode.airDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
