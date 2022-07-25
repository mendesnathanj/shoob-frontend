import { Controller, useFormContext } from 'react-hook-form';
import ReactCurrencyInput from 'react-currency-input-field';
import cn from 'classnames';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';
import InputContainer from './helpers/InputContainer';
import { ErrorMessage } from './helpers';

export default function CurrencyInput({
  className,
  errors,
  inline = false,
  ...rest
}: InputProps) {
  const nestedName = useNestedName({ name: rest.name });
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={nestedName}
      render={({ field: { name, onChange, value, ref } }) => (
        <InputContainer
          label={rest.label}
          name={name}
        >
          <ReactCurrencyInput
            className={cn(
              inline ? 'flex-1' : 'min-w-full',
              `inline-block rounded border-gray-400 text-gray-600
              placeholder:opacity-70 placeholder:italic
            focus:border-shoob-300 focus:ring-shoob-300`,
              { 'border-red-400': errors },
              className,
            )}
            prefix="$"
            placeholder="$00.00"
            ref={ref}
            name={name}
            decimalsLimit={2}
            value={value}
            onValueChange={(newValue: any) => onChange(newValue)}
          />
          {errors && <ErrorMessage message={errors} />}
        </InputContainer>
      )}
    />
  );
}
