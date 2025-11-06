import { EpisodeCard } from '@/components/episode-card';
import { Logo } from '@/components/logo';
import type { Episode } from '@/lib/definitions';

async function getEpisodes() {
  const res = await fetch('http://localhost:3001/api/episodes');
  const episodes = await res.json();
  return episodes.data;
}

export default async function EpisodesExamplePage() {
  const episodes: Episode[] = await getEpisodes();

  return (
    <section className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center">
          <Logo />
          <p className="mt-4 text-lg text-gray-600">All episodes</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </section>
  );
}
