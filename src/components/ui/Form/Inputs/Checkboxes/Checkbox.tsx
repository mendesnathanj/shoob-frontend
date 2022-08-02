import { useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { InputProps } from '../types';
import { useNestedName } from '../../utils/NestedContext';

export default function Checkbox({
  label,
  labelProps,
  name,
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const nestedName = useNestedName({ name });

  return (
    <label {...labelProps} className={cn('flex gap-2 cursor-pointer', labelProps?.className)}>
      <input
        className="inline-block rounded border-gray-400 text-shoob-600
                   placeholder:opacity-70 placeholder:italic top-0.5 relative
                 focus:border-shoob-300 focus:ring-shoob-300"
        {...register(nestedName)}
        {...rest}
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}
