import Image from 'next/image';
import Link from 'next/link';
import { Asteroid as IAsteroid } from '@/services/asteroid/asteroid.helper';

import { formatDate, plural } from '@/lib/utils';
import asteroidImage from '@/assets/images/pngegg.png';

import { Button } from '../ui/button/button';
import { Skeleton } from '../ui/skeleton/skeleton';
import styles from './asteroid.module.css';

interface AsteroidProps {
  asteroid: IAsteroid;
  distanceType?:
    | IAsteroid['close_approach_data']['0']['miss_distance']['kilometers']
    | IAsteroid['close_approach_data']['0']['miss_distance']['lunar'];
  isInCart?: boolean;
  onClick?: () => void;
}

export function Asteroid({
  asteroid,
  distanceType = 'lunar',
  isInCart,
  onClick,
}: AsteroidProps) {
  const getDistance = () => {
    if (distanceType === 'kilometers') {
      return `${Number(
        asteroid.close_approach_data[0].miss_distance.kilometers
      ).toLocaleString()} км`;
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
          <div className={styles.line} />
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
        {!!onClick &&
          (typeof window === 'undefined' ? (
            <Skeleton className={styles.buttonSkeleton} />
          ) : (
            <Button
              onClick={() => onClick()}
              variant={isInCart ? 'tertiary' : 'secondary'}
            >
              {isInCart ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
            </Button>
          ))}

        {asteroid.is_potentially_hazardous_asteroid && <div>⚠️ Опасен</div>}
      </div>
    </div>
  );
}
