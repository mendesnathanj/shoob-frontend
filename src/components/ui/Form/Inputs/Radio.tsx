import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';

export default function Radio({ label, name, ...rest }: InputProps) {
  const { register } = useFormContext();
  const nestedName = useNestedName({ name });

  return (
    <label className="flex gap-2">
      <input
        className="inline-block rounded-full border-gray-400 text-shoob-600
                   placeholder:opacity-70 placeholder:italic top-0.5 relative
                 focus:border-shoob-300 focus:ring-shoob-300"
        {...register(nestedName)}
        {...rest}
        type="radio"
      />
      <span>{label}</span>
    </label>
  );
}
