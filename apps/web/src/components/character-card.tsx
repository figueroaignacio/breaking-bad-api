import type { Character } from '@/lib/definitions';

export function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="border-border bg-card hover:border-primary hover:shadow-primary/20 group relative overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg">
      <div className="border-border border-b px-6 py-4">
        <h2 className="text-accent text-2xl font-bold">{character.name}</h2>
        <p className="text-accent mt-1 text-sm italic">&quot;{character.nickname}&quot;</p>
      </div>

      <div className="px-6 py-4">
        <p className="text-foreground/90 line-clamp-4 text-sm leading-relaxed">
          {character.biography}
        </p>
      </div>

      <div className="border-border/50 text-muted-foreground flex items-center justify-between border-t px-6 py-3 text-xs">
        <span className="font-semibold uppercase tracking-wider">Breaking Bad</span>
        <span className="bg-secondary h-1 w-1 rounded-full" />
      </div>
    </div>
  );
}
