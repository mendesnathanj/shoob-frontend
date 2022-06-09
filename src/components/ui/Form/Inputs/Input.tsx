import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import DateInput from './DateInput';
import Select from './Select';
import { InputProps } from './types';

function Input({
  className,
  endIcon,
  endIconProps = {},
  containerProps = {},
  inline,
  label,
  labelProps = {},
  name,
  showLabel = true,
  type = 'text',
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const computedName = useNestedName({ name });

  const containerClass = inline ? 'flex gap-3 items-center' : '';

  return (
    <div {...containerProps} className={cn(containerClass, containerProps.className)}>
      <label
        htmlFor={computedName}
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
          {...rest}
          className={cn(
            inline ? 'flex-1' : 'min-w-full',
            `inline-block rounded border-gray-400 text-gray-600
            placeholder:opacity-70 placeholder:italic
          focus:border-shoob-300 focus:ring-shoob-300`,
            className,
          )}
          id={computedName}
          {...register(computedName)}
          type={type}
        />
        {endIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {endIcon}
          </span>
        )}
      </div>
    </div>
  );
}

Input.Date = DateInput;
Input.Select = Select;

export default Input;
