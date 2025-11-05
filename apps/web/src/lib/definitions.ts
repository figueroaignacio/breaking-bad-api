export interface Character {
  id: number;
  name: string;
  nickname: string;
  img: string;
  biography: string;
}

export interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  airDate: string | null;
  director: string;
  writer: string;
  synopsis: string;
  imdbRating: number | null;
  duration: string;
  poster: string | null;
}

export interface Quote {
  id: number;
  quote: string;
  context: string;
  character: { name: string; nickname: string };
  episode: { title: string; season: number; episode: number };
}
