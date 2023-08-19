import { env } from '@/env.mjs';

import { GetAsteroidListResponse } from './asteroid.helper';

export const AsteroidService = {
  async getAsteroidList() {
    const res = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?api_key=${env.API_KEY}`,
      {
        next: { revalidate: 60 },
      }
    );
    return res.json() as Promise<GetAsteroidListResponse>;
  },
  async getNextAsteroids(link: string) {
    const res = await fetch(link, {
      next: { revalidate: 1 },
    });
    return res.json() as Promise<GetAsteroidListResponse>;
  },
  async getAsteroid(asteroidId: string) {
    return await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${env.API_KEY}`,
      {
        next: { revalidate: 60 },
      }
    );
  },
};
