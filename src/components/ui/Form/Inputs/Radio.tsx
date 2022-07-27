import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import { ErrorMessage } from './helpers';
import { InputProps } from './types';

// TODO: this will probably need to be grouped together like checkboxes for better error display
export default function Radio({ label, name, registerOptions = {}, ...rest }: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const nestedName = useNestedName({ name });

  return (
    <label className="flex gap-2">
      <input
        className="inline-block rounded-full border-gray-400 text-shoob-600
                   placeholder:opacity-70 placeholder:italic top-0.5 relative
                 focus:border-shoob-300 focus:ring-shoob-300"
        {...register(nestedName, registerOptions)}
        {...rest}
        type="radio"
      />
      <span>{label}</span>
      {errors[nestedName] && <ErrorMessage message={errors[nestedName]?.message} />}
    </label>
  );
}
