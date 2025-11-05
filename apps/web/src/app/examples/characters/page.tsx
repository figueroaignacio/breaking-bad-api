import { CharacterCard } from '@/components/character-card';
import Logo from '@/components/logo';
import type { Character } from '@/lib/definitions';

async function getCharacters() {
  const res = await fetch('http://localhost:3001/api/characters');
  const characters = await res.json();
  return characters.data;
}

export default async function Home() {
  const characters: Character[] = await getCharacters();

  return (
    <section className="bg-background min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center">
          <Logo />
          <p className="text-muted-foreground mt-4 text-lg">Characters</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </section>
  );
}
