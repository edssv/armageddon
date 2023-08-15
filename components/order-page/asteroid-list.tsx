'use client';

import { useContext } from 'react';

import { Asteroid } from '@/components/asteroid/asteroid';
import styles from '@/components/home-page/asteroid-list/asteroid-list.module.css';
import { AppContext } from '@/components/providers/context-provider';

export default function AsteroidList() {
  const { cart } = useContext(AppContext);

  return (
    <ul className={styles.root}>
      {cart?.map((asteroid, i) => {
        return (
          <li key={asteroid.id}>
            <Asteroid asteroid={asteroid} />
          </li>
        );
      })}
    </ul>
  );
}
