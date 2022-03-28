import cn from 'classnames';
import styles from './Box.module.scss';

type Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type BoxOwnProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
  p?: Range;
};

type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<React.ComponentProps<E>, keyof BoxOwnProps<E>>;

export default function Box<E extends React.ElementType ='div'>({ as, children, className, p }: BoxProps<E>) {
  const classes = cn({
    [styles[`p-${p}`]]: p,
    className
  });

  const Component = as || 'div';
  return <Component className={classes}>{children}</Component>;
}
