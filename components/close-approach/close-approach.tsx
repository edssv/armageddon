import { CloseApproachData } from '@/services/asteroid/asteroid.helper';

import { formatDate } from '@/lib/utils';

import styles from './close-approach.module.css';

export function CloseAproach({
  closeApproach,
}: {
  closeApproach: CloseApproachData;
}) {
  return (
    <div>
      <div>
        Скорость относительно земли:
        {Number(
          closeApproach.relative_velocity.kilometers_per_hour
        ).toFixed()}{' '}
        км/ч
      </div>
      <div>
        Время максимального сближения с Землей:
        {formatDate(closeApproach.close_approach_date_full)}
      </div>
      <div>
        Расстояние до земли:
        {Number(closeApproach.miss_distance.kilometers).toLocaleString()} км
      </div>
      <div>Летит вокруг: {closeApproach.orbiting_body}</div>
    </div>
  );
}
