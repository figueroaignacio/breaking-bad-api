interface Character {
  id: number;
  name: string;
  nickname: string;
  img: string;
  biography: string;
}

async function getCharacters() {
  const res = await fetch('http://localhost:3001/api/characters');
  const characters = await res.json();
  return characters.data;
}

export async function Example() {
  const characters: Character[] = await getCharacters();

  return (
    <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
      {characters.map((character) => (
        <li key={character.id}>
          <div className="h-full space-y-4">
            <img src={character.img} alt={character.name} className="object-fit h-56 w-full" />
            <div>
              <h2>{character.name}</h2>
              <h3>&quot;{character.nickname}&quot;</h3>
            </div>
            <p>{character.biography}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
