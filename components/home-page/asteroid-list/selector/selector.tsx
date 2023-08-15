import clsx from 'clsx';

import styles from './selector.module.css';

interface SelectorProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

export function Selector({ active, setActive }: SelectorProps) {
  return (
    <div className={styles.selector}>
      <button
        onClick={() => setActive('kilometers')}
        className={clsx(active === 'kilometers' && styles.active)}
      >
        в километрах
      </button>
      |
      <button
        onClick={() => setActive('lunar')}
        className={clsx(active === 'lunar' && styles.active)}
      >
        в лунных орбитах
      </button>
    </div>
  );
}
