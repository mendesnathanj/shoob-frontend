import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import Select from './Select';

type OmitRegisterProps = Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'onBlur' | 'onChange' | 'ref'>;

type InputProps = {
  containerProps?: React.HTMLProps<HTMLDivElement>;
  name: string;
  label: string;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
  showLabel?: boolean;
} & OmitRegisterProps;

function Input({
  className,
  containerProps = {},
  label,
  labelProps = {},
  name,
  showLabel = true,
  type = 'text',
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const computedName = useNestedName({ name });

  return (
    <div {...containerProps}>
      <label
        htmlFor={computedName}
        {...labelProps}
        className={cn(
          { hidden: !showLabel },
          'inline-block',
          'mb-1',
          labelProps.className,
        )}
      >
        {label}
      </label>
      <input
        {...rest}
        className={cn(
          `block min-w-full rounded border-gray-400 text-gray-600
           placeholder:opacity-70 placeholder:italic
         focus:border-shoob-300 focus:ring-shoob-300`,
          className,
        )}
        id={computedName}
        {...register(computedName)}
        type={type}
      />
    </div>
  );
}

Input.Select = Select;

export default Input;
