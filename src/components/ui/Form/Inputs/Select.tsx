import { useMemo } from 'react';
import { get } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import ReactSelect from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';
import { ErrorMessage, Label } from './helpers';

type OptionType = {
  label: string;
  value?: string | number | boolean;
}

type SelectProps = {
  options?: OptionType[];
  reactSelectProps?: object;
} & InputProps & Omit<StateManagerProps, 'onChange' | 'onBlur' | 'value' | 'ref'>

export default function Select({
  className,
  containerProps = {},
  inline = false,
  isMulti = false,
  label,
  labelProps = {},
  name,
  options = [],
  reactSelectProps = {},
  showLabel = true,
  ...rest
}: SelectProps) {
  const { control, formState: { errors } } = useFormContext();
  const nestedName = useNestedName({ name });

  const myErrors = get(errors, nestedName);

  const customStyles = useMemo(() => ({
    control: (provided: object, state: any) => {
      const errorStyles = errors[nestedName] && !state.isFocused ? { borderColor: 'rgb(248 113 113)' } : {};

      return {
        ...provided,
        height: 44,
        ...errorStyles
      };
    },
  }), [errors[nestedName]?.message]);

  const containerClass = inline ? 'flex gap-3 items-center' : '';

  return (
    <Controller
      control={control}
      name={nestedName}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <div {...containerProps} className={cn(containerClass, containerProps.className)}>
          <Label
            name={name}
            hasError={!!errors[nestedName]}
            showLabel={showLabel}
            {...labelProps}
          >
            {label}
          </Label>
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
            {...reactSelectProps}
            {...rest}
          />
          {myErrors && <ErrorMessage message={myErrors.message} />}
        </div>
      )}
    />
  );
}
