type OmitRegisterProps = Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'onBlur' | 'onChange' | 'ref'>;

export type InputProps = {
  containerProps?: React.HTMLProps<HTMLDivElement>;
  endIcon?: React.ReactElement;
  endIconProps?: React.HTMLProps<HTMLButtonElement>;
  inline?: boolean;
  name: string;
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  showLabel?: boolean;
} & OmitRegisterProps;
