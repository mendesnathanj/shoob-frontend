import cn from 'classnames';
import { LabelProps } from '../types';

export default function Label({ children, className, hasError, name, showLabel, ...rest }: LabelProps) {
  return (
    <label
      htmlFor={name}
      {...rest}
      className={cn(
        { hidden: !showLabel },
        'inline-block',
        'mb-1',
        'min-w-min',
        { 'text-red-400': hasError },
        className,
      )}
    >
      {children}
    </label>
  );
}
