'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Asteroid } from '@/components/asteroid/asteroid';

import { AppContext } from '../../providers/context-provider';
import styles from './order-page.module.css';

export default function OrderPage() {
  const { cart } = useContext(AppContext);

  return (
    <div className={styles.root}>
      <Link className={styles.link} href="/">
        Список астероидов
      </Link>
      {typeof window !== 'undefined' && (
        <h1 className={styles.headline}>
          {cart.length ? 'Заказ отправлен!' : 'Заказ пуст!'}
        </h1>
      )}
      <ul className={styles.asteroidList}>
        {cart?.map((asteroid, i) => {
          return (
            <li key={asteroid.id}>
              <Asteroid asteroid={asteroid} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
