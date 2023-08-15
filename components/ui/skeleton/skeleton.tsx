import clsx from 'clsx';

import styles from './skeleton.module.css';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(styles.root, className)} {...props} />;
}
