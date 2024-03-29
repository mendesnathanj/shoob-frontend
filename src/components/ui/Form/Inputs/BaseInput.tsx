import React from 'react';
import cn from 'classnames';
import { BaseInputProps } from './types';
import { ErrorMessage, Label } from './helpers';

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(({
  className,
  endIcon,
  errors,
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
      <Label
        name={name}
        hasError={!!errors}
        showLabel={showLabel}
        {...labelProps}
      >
        {label}
      </Label>
      <div className="relative">
        <input
          className={cn(
            inline ? 'flex-1' : 'min-w-full',
            `max-w-full inline-block rounded border-gray-400 text-gray-600
            placeholder:opacity-70 placeholder:italic
          focus:border-shoob-300 focus:ring-shoob-300`,
            { 'border-red-400': errors },
            className,
          )}
          id={name}
          name={name}
          ref={ref}
          type={type}
          {...rest}
        />
        {endIcon && (
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600">
            {endIcon}
          </span>
        )}
      </div>
      {errors && <ErrorMessage message={errors} />}
    </div>
  );
});

export default BaseInput;
