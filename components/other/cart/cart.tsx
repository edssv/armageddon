'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { plural } from '@/lib/utils';
import { Button } from '@/components/ui/button/button';
import { AppContext } from '@/components/providers/context-provider';

import styles from './cart.module.css';

export function Cart() {
  const { cart } = useContext(AppContext);
  const router = useRouter();

  const getCartInfo = () => {
    if (!!cart.length) {
      return `${cart.length} ${plural(cart.length, [
        'Астероид',
        'Астероида',
        'Астероидов',
        'Астероидов',
      ])}`;
    }
    return 'Нет астероидов';
  };

  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h3 className={styles.headline}>Корзина</h3>
        <span className={styles.subhead}>{getCartInfo()}</span>
      </div>
      <Button
        disabled={!cart.length}
        onClick={() => router.push('/order')}
        className={styles.button}
        size="lg"
      >
        Отправить
      </Button>
    </div>
  );
}
