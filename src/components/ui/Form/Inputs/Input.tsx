import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../NestedContext';

type InputProps = {
  name: string;
};

export default function Input({ name }: InputProps) {
  const { register } = useFormContext();
  const computedName = useNestedName({ name });

  return (
    <input {...register(computedName)} type="text" />
  );
}
