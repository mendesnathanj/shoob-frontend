import cn from 'classnames';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import Checkbox from './Checkboxes/Checkbox';
import Checkboxes from './Checkboxes/Checkboxes';
import DateInput from './DateInput';
import Radio from './Radio';
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
  registerOptions = {},
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const nestedName = useNestedName({ name });

  const containerClass = inline ? 'flex gap-3 items-center' : '';

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
        <input
          {...rest}
          className={cn(
            inline ? 'flex-1' : 'min-w-full',
            `inline-block rounded border-gray-400 text-gray-600
            placeholder:opacity-70 placeholder:italic
          focus:border-shoob-300 focus:ring-shoob-300`,
            className,
          )}
          id={nestedName}
          {...register(nestedName, registerOptions)}
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

Input.Checkboxes = Checkboxes;
Input.Checkbox = Checkbox;
Input.Date = DateInput;
Input.Radio = Radio;
Input.Select = Select;

export default Input;
