import { RegisterOptions, Merge, FieldError, FieldErrorsImpl, DeepRequired } from 'react-hook-form';

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
  errors?: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>>;
  inline?: boolean;
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  name: string;
} & LabelProps & React.HTMLProps<HTMLInputElement>;

export type InputProps = {
  registerOptions?: RegisterOptions;
} & BaseInputProps & OmitRegisterProps;
