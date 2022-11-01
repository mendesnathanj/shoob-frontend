import React from 'react';
import { RegisterOptions } from 'react-hook-form';

type OmitRegisterProps = Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'onBlur' | 'onChange' | 'ref'>;

export type LabelProps = React.PropsWithChildren<{
  hasError?: boolean;
  name?: string;
  showLabel?: boolean;
}> & React.HTMLProps<HTMLLabelElement>;

export type BaseInputProps = {
  containerProps?: React.HTMLProps<HTMLDivElement>;
  endIcon?: React.ReactElement;
  endIconProps?: React.HTMLProps<HTMLButtonElement>;
  errors?: string;
  inline?: boolean;
  label: any; // TODO: Figure out how to type this correctly to take any element. React.ReactNode | React.ReactElement | Element shows error for img tag
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  name: string;
} & LabelProps & React.HTMLProps<HTMLInputElement>;

export type InputProps = {
  registerOptions?: RegisterOptions;
} & BaseInputProps & OmitRegisterProps;
