import cn from 'classnames';
import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import Select from './Select';

type OmitRegisterProps = Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'onBlur' | 'onChange' | 'ref'>;

type InputProps = {
  name: string;
  label: string;
  shouldShowLabel?: boolean;
} & OmitRegisterProps;

function Input({ label, name, shouldShowLabel = true, type = 'text', ...rest }: InputProps) {
  const { register } = useFormContext();
  const computedName = useNestedName({ name });

  return (
    <label htmlFor={computedName}>
      <span
        className={cn({
          hidden: !shouldShowLabel
        })}
      >
        {label}
      </span>
      <input id={computedName} {...register(computedName)} type={type} />
    </label>
  );
}

Input.Select = Select;

export default Input;