import { AsteroidService } from '@/services/asteroid/asteroid.service';

import { Cart } from '@/components/cart/cart';
import { AsteroidList } from '@/components/home-page/asteroid-list/asteroid-list';

import styles from './page.module.css';

export default async function Home() {
  const initialData = await AsteroidService.getAsteroidList();

  return (
    <>
      <h1 className={styles.headline}>Ближайшие подлёты астероидов</h1>
      <AsteroidList initialData={initialData} />
      <Cart />
    </>
  );
}
