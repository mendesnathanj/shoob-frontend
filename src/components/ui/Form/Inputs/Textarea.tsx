import React from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';
import { ErrorMessage, Label } from './helpers';

type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & InputProps;

export default function Textarea({
  className = '',
  containerProps = {},
  inline = false,
  label,
  labelProps = {},
  name,
  registerOptions = {},
  showLabel = true,
  ...rest
}: TextareaProps) {
  const { register, formState: { errors } } = useFormContext();
  const nestedName = useNestedName({ name });

  const containerClass = inline ? 'flex gap-3' : '';

  return (
    <div {...containerProps} className={cn(containerClass, containerProps.className)}>
      <Label
        name={name}
        hasError={!!errors[nestedName]}
        showLabel={showLabel}
        {...labelProps}
      >
        {label}
      </Label>
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
