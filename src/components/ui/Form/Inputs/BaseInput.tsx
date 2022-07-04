import React from 'react';
import cn from 'classnames';
import { BaseInputProps } from './types';

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(({
  className,
  endIcon,
  containerProps = {},
  inline = false,
  label,
  labelProps = {},
  name,
  showLabel = true,
  type = 'text',
  ...rest
}, ref) => {
  const containerClass = inline ? 'flex gap-3 items-center' : '';

  return (
    <div {...containerProps} className={cn(containerClass, containerProps.className)}>
      <label
        htmlFor={name}
        {...labelProps}
        className={cn(
          { hidden: !showLabel },
          'inline-block',
          'mb-1',
          'min-w-min',
          labelProps.className,
        )}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={cn(
            inline ? 'flex-1' : 'min-w-full',
            `inline-block rounded border-gray-400 text-gray-600
            placeholder:opacity-70 placeholder:italic
          focus:border-shoob-300 focus:ring-shoob-300`,
            className,
          )}
          id={name}
          name={name}
          ref={ref}
          type={type}
          {...rest}
        />
        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {endIcon}
          </span>
        )}
      </div>
    </div>
  );
});

export default BaseInput;
