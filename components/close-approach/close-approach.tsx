import { CloseApproachData } from '@/services/asteroid/asteroid.helper';

import { formatDate, plural } from '@/lib/utils';

import styles from './close-approach.module.css';

export function CloseAproach({
  closeApproach,
  distanceType,
}: {
  closeApproach: CloseApproachData;
  distanceType: string;
}) {
  const getDistance = () => {
    if (distanceType === 'kilometers') {
      return `${closeApproach.miss_distance.kilometers
        .split('.')[0]
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} км`;
    }

    if (distanceType === 'lunar') {
      const count = Number(closeApproach.miss_distance.lunar).toFixed();
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
      <h3>{formatDate(closeApproach.close_approach_date_full)}</h3>
      <div>
        Скорость относительно земли:{' '}
        {closeApproach.relative_velocity.kilometers_per_hour
          .split('.')[0]
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
        км/ч
      </div>
      <div>Расстояние до земли: {getDistance()}</div>
      <div>Летит вокруг: {closeApproach.orbiting_body}</div>
    </div>
  );
}
