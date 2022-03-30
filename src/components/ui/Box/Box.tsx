import cn from 'classnames';
import styles from './Box.module.scss';

type Range = '' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type BoxOwnProps<E extends React.ElementType> = {
  /** The React element / HTML node to render as. Default element is a div */
  as?: E;
  children: React.ReactNode;
  /** The amount of margin */
  m?: Range,
  /** The amount of padding */
  p?: Range;
};

type BoxProps<E extends React.ElementType> = BoxOwnProps<E> & Omit<React.ComponentProps<E>, keyof BoxOwnProps<E>>;

export default function Box<E extends React.ElementType ='div'>({ as, children, className, m = '', p = '', ...rest }: BoxProps<E>) {
  const classes = cn({
    [styles[`p-${p}`]]: p,
    [styles[`m-${m}`]]: m,
    className
  });

  const Component = as || 'div';
  return <Component className={classes} {...rest}>{children}</Component>;
}
