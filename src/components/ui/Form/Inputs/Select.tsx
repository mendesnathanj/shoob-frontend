import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';
import { useNestedName } from '../utils/NestedContext';

type OptionType = {
  label: string;
  value: string | number;
}

type SelectProps = {
  name: string;
  options: OptionType[];
} & Omit<StateManagerProps, 'onChange' | 'onBlur' | 'value' | 'ref'>

export default function Select({ name, options, isMulti = false, ...rest }: SelectProps) {
  const { control } = useFormContext();
  const nestedName = useNestedName({ name });

  return (
    <Controller
      control={control}
      name={nestedName}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactSelect
          isMulti={isMulti}
          onBlur={onBlur}
          onChange={(opt) => {
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
          ref={ref}
          {...rest}
        />
      )}
    />
  );
}
