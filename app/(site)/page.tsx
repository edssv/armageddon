import { AsteroidService } from '@/services/asteroid/asteroid.service';

import { HomePage } from '@/components/pages/home-page/home-page';

export default async function Home() {
  const initialData = await AsteroidService.getAsteroidList();

  return <HomePage initialData={initialData} />;
}
