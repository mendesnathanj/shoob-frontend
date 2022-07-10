import { RegisterOptions } from 'react-hook-form';

type OmitRegisterProps = Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'onBlur' | 'onChange' | 'ref'>;

export type BaseInputProps = {
  containerProps?: React.HTMLProps<HTMLDivElement>;
  endIcon?: React.ReactElement;
  endIconProps?: React.HTMLProps<HTMLButtonElement>;
  errors?: string;
  inline?: boolean;
  name: string;
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  showLabel?: boolean;
} & React.HTMLProps<HTMLInputElement>;

export type InputProps = {
  registerOptions?: RegisterOptions;
} & BaseInputProps & OmitRegisterProps;
