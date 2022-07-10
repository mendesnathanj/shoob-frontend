import React from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';
import ErrorMessage from './ErrorMessage';

type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & InputProps;

export default function Textarea({
  className = '',
  cols,
  containerProps = {},
  inline = false,
  label,
  labelProps = {},
  name,
  registerOptions = {},
  rows,
  showLabel = true,
  ...rest
}: TextareaProps) {
  const { register, formState: { errors } } = useFormContext();
  const nestedName = useNestedName({ name });

  const containerClass = inline ? 'flex gap-3' : '';

  return (
    <div {...containerProps} className={cn(containerClass, containerProps.className)}>
      <label
        htmlFor={nestedName}
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
        <textarea
          {...rest}
          className={cn(
            inline ? 'flex-1' : 'min-w-full',
            `inline-block rounded border-gray-400 text-gray-600
            placeholder:opacity-70 placeholder:italic caret-shoob-300
          focus:border-shoob-300 focus:ring-shoob-300`,
            { 'border-red-400': errors[nestedName] },
            className,
          )}
          id={nestedName}
          {...register(nestedName, registerOptions)}
        />
      </div>
      {errors[nestedName] && <ErrorMessage message={errors[nestedName].message} />}
    </div>
  );
}
