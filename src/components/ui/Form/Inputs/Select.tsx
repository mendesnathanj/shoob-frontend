import { Controller, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import ReactSelect from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';

const customStyles = {
  control: (provided: object) => ({ ...provided, height: 44 }),
};

type OptionType = {
  label: string;
  value?: string | number;
}

type SelectProps = {
  options: OptionType[];
} & InputProps & Omit<StateManagerProps, 'onChange' | 'onBlur' | 'value' | 'ref'>

export default function Select({
  className,
  containerProps = {},
  inline = false,
  isMulti = false,
  label,
  labelProps = {},
  name,
  options,
  showLabel = true,
  ...rest
}: SelectProps) {
  const { control } = useFormContext();
  const nestedName = useNestedName({ name });

  const containerClass = inline ? 'flex gap-3 items-center' : '';

  return (
    <Controller
      control={control}
      name={nestedName}
      render={({ field: { onChange, onBlur, value, ref } }) => (
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
          <ReactSelect
            className={cn(
              inline ? 'flex-1' : 'min-w-full',
              className,
            )}
            isMulti={isMulti}
            onBlur={onBlur}
            onChange={(opt: unknown): void => {
              if (opt === null) return;

              if (isMulti) {
                onChange((opt as OptionType[]).map((option) => option.value));
              }
              else {
                onChange((opt as OptionType).value);
              }
            }}
            options={options}
            value={options.find((opt) => opt.value === value)}
            styles={customStyles}
            ref={ref}
            {...rest}
          />
        </div>
      )}
    />
  );
}
