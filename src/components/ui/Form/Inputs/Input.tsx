import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import Checkbox from './Checkboxes/Checkbox';
import Checkboxes from './Checkboxes/Checkboxes';
import DateInput from './DateInput';
import BaseInput from './BaseInput';
import Radio from './Radio';
import Select from './Select';
import Textarea from './Textarea';
import { InputProps } from './types';
import CurrencyInput from './CurrencyInput';

function Input({
  name,
  ...rest
}: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const nestedName = useNestedName({ name });

  return (
    <BaseInput {...rest} errors={errors[nestedName]?.message} {...register(nestedName)} />
  );
}

Input.Checkboxes = Checkboxes;
Input.Checkbox = Checkbox;
Input.Currency = CurrencyInput;
Input.Date = DateInput;
Input.Radio = Radio;
Input.Select = Select;
Input.Textarea = Textarea;

export default Input;
