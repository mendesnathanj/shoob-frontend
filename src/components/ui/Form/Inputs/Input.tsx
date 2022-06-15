import cn from 'classnames';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { useNestedName } from '../utils/NestedContext';
import Checkbox from './Checkboxes/Checkbox';
import Checkboxes from './Checkboxes/Checkboxes';
import DateInput from './DateInput';
import BaseInput from './BaseInput';
import Radio from './Radio';
import Select from './Select';
import Textarea from './Textarea';
import { InputProps } from './types';

function Input({
  name,
  registerOptions = {},
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  const nestedName = useNestedName({ name });

  return <BaseInput {...rest} {...register(nestedName)} />;
}

Input.Checkboxes = Checkboxes;
Input.Checkbox = Checkbox;
Input.Date = DateInput;
Input.Radio = Radio;
Input.Select = Select;
Input.Textarea = Textarea;

export default Input;
