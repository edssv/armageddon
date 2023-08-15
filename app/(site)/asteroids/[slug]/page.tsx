import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Asteroid } from '@/services/asteroid/asteroid.helper';
import { AsteroidService } from '@/services/asteroid/asteroid.service';

import { env } from '@/env.mjs';
import { absoluteUrl } from '@/lib/utils';
import { CloseAproach } from '@/components/close-approach/close-approach';

import styles from './page.module.css';

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
  // ogUrl.searchParams.set('image', asteroid.cover.data.attributes.url);
  ogUrl.searchParams.set('mode', 'dark');

  return {
    title: asteroid.name,
    description: asteroid.name,
    openGraph: {
      title: asteroid.name,
      description: asteroid.name,
      type: 'article',
      url: absoluteUrl(`asteroids/${asteroid.id}`),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: asteroid.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: asteroid.name,
      description: asteroid.name,
      images: [ogUrl.toString()],
    },
  };
}

export default async function AsteroidPage({ params }: AsteroidPageProps) {
  const data = await getAsteroidFromParams(params);
  console.log(data.close_approach_data[0]);

  return (
    <div className="">
      <h1>{data.name}</h1>
      <div>
        <span>Сближения:</span>
        <ul className={styles.closeApproachList}>
          {data.close_approach_data.map((item, i) => (
            <li className="" key={i}>
              <CloseAproach closeApproach={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
