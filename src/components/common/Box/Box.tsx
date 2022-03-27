import styles from './Box.module.scss';
import { HTMLAttributes } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padded: 0 | 1 | 2 | 3;
  children: React.ReactNode;
}

export default function Box({ padded, children, ...rest }: BoxProps) {
  return <div className={` ${styles.box} ${styles[`padded-${padded * 8}`]}`} {...rest}>{children}</div>
}
