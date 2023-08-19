import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Asteroid } from '@/services/asteroid/asteroid.helper';
import { AsteroidService } from '@/services/asteroid/asteroid.service';

import { env } from '@/env.mjs';
import { absoluteUrl } from '@/lib/utils';

import { AsteroidPage } from '@/components/pages/asteroid-page/asteroid-page';

interface AsteroidPageProps {
  params: {
    slug: string;
  };
}

async function getAsteroidFromParams(params: AsteroidPageProps['params']) {
  const slug = params?.slug;
  const data = await AsteroidService.getAsteroid(slug);

  if (!data.ok) {
    return notFound();
  }

  return data.json() as Promise<Asteroid>;
}

export async function generateMetadata({
  params,
}: AsteroidPageProps): Promise<Metadata> {
  const asteroid = await getAsteroidFromParams(params);

  if (!asteroid) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('heading', asteroid.name);
  ogUrl.searchParams.set('type', 'Blog asteroid');
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: asteroid.name,
    description: asteroid.name,
    openGraph: {
      title: asteroid.name,
      description: asteroid.name,
      type: 'article',
      url: absoluteUrl(`asteroids/${asteroid.id}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: asteroid.name,
      description: asteroid.name,
    },
  };
}

export default async function Asteroid({ params }: AsteroidPageProps) {
  const data = await getAsteroidFromParams(params);

  return <AsteroidPage data={data}/>;
}
