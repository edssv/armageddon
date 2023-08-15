'use client';

import { useContext } from 'react';

import { AppContext } from '../providers/context-provider';
import AsteroidList from './asteroid-list';
import styles from './order-page.module.css';

export default function OrderPage() {
  const { cart } = useContext(AppContext);
  return (
    <>
      {typeof window !== 'undefined' && (
        <h1 className={styles.headline}>
          {cart.length ? 'Заказ отправлен!' : 'Заказ пуст!'}
        </h1>
      )}
      <AsteroidList />
    </>
  );
}
