import cn from 'classnames';
import { PropsWithChildren } from 'react';
import { BaseInputProps } from '../types';
import Label from './Label';

export default function InputContainer({
  children,
  containerProps = {},
  errors,
  inline,
  label,
  labelProps = {},
  name,
  showLabel = true
}: PropsWithChildren<BaseInputProps>) {
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
      {children}
    </div>
  );
}
