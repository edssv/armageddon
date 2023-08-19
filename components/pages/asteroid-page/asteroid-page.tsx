'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Asteroid } from '@/services/asteroid/asteroid.helper';

import { CloseAproach } from '@/components/other/close-approach/close-approach';
import { Selector } from '@/components/other/selector/selector';

import styles from './asteroid-page.module.css';

export function AsteroidPage({ data }: { data: Asteroid }) {
  const [distanceType, setDistanceType] = useState('kilometers');

  return (
    <div className={styles.root}>
      <div>
        <Link className={styles.link} href="/">
          Список астероидов
        </Link>
        <h1>{data.name}</h1>
        <div className={styles.info}>
          Диаметр:{' '}
          {data.estimated_diameter.meters.estimated_diameter_min.toFixed()} -{' '}
          {data.estimated_diameter.meters.estimated_diameter_max.toFixed()} м
        </div>
        <div className={styles.info}>
          Абсолютная величина: {data.absolute_magnitude_h} м
        </div>
      </div>
      <div className={styles.closeApproach}>
        <h2>Сближения:</h2>
        <Selector active={distanceType} setActive={setDistanceType} />
        <ul className={styles.closeApproachList}>
          {data.close_approach_data.map((item, i) => (
            <li key={i}>
              <CloseAproach closeApproach={item} distanceType={distanceType} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
