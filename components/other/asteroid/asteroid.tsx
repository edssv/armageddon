'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Asteroid as IAsteroid } from '@/services/asteroid/asteroid.helper';

import { formatDate, plural } from '@/lib/utils';
import asteroidImage from '@/assets/images/pngegg.png';

import { AddToCartButton } from '../add-to-cart-button/add-to-cart-button';
import styles from './asteroid.module.css';

interface AsteroidProps {
  asteroid: IAsteroid;
  distanceType?:
    | IAsteroid['close_approach_data']['0']['miss_distance']['kilometers']
    | IAsteroid['close_approach_data']['0']['miss_distance']['lunar'];
  isInCart?: boolean;
  button?: boolean;
}

export function Asteroid({
  asteroid,
  distanceType = 'lunar',
  isInCart,
  button = false,
}: AsteroidProps) {
  const getDistance = () => {
    if (distanceType === 'kilometers') {
      return `${asteroid.close_approach_data[0].miss_distance.kilometers
        .split('.')[0]
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} км`;
    }

    if (distanceType === 'lunar') {
      const count = Number(
        asteroid.close_approach_data[0].miss_distance.lunar
      ).toFixed();
      return `${count} ${plural(+count, [
        'лунная',
        'лунные',
        'лунных',
        'лунных',
      ])} ${plural(+count, ['орбита', 'орбиты', 'орбит', 'орбит'])}`;
    }
  };

  return (
    <div className={styles.root}>
      <span className={styles.date}>
        {formatDate(asteroid.close_approach_data[0].close_approach_date_full, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
      <div className={styles.center}>
        <div className={styles.distance}>
          <span>{getDistance()}</span>
          <svg
            viewBox="0 0 129 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 3L5 5.88675L5 0.113249L0 3ZM129 3.00001L124 0.113259L124 5.88676L129 3.00001ZM4.5 3.5L124.5 3.50001L124.5 2.50001L4.5 2.5L4.5 3.5Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <Image
            src={asteroidImage}
            alt="Asteroid"
            height={
              +asteroid.estimated_diameter.meters.estimated_diameter_max > 150
                ? 40
                : 24
            }
          />
          <div className={styles.text}>
            <Link href={`/asteroids/${asteroid.id}`} className={styles.name}>
              {asteroid.name}
            </Link>
            <span className={styles.size}>
              Ø{' '}
              {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed()}{' '}
              м
            </span>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        {button && <AddToCartButton asteroid={asteroid} isInCart={isInCart} />}
        {asteroid.is_potentially_hazardous_asteroid && <div>⚠️ Опасен</div>}
      </div>
    </div>
  );
}
