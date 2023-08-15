import Link from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';

import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={clsx(styles.brand)}>
        {siteConfig.name}
      </Link>
      <p className={styles.paragraph}>{siteConfig.description}</p>
    </header>
  );
}
