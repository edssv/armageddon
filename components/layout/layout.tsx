import Image from 'next/image';

import EarthImage from '@/assets/images/planeta_zemlia.png';

import { Footer } from './footer/footer';
import { Header } from './header/header';
import styles from './layout.module.css';

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="container">
        <div className={styles.root}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
          <Image
            priority
            src={EarthImage}
            alt="Earth"
            className={styles.earth}
          />
        </div>
      </div>
    </>
  );
}
