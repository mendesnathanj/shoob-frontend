import { useFormContext } from 'react-hook-form';

type InputProps = {
  name: string;
};

export default function Input({ name }: InputProps) {
  const { register } = useFormContext();

  return (
    <input {...register(name)} type="text" />
  );
}
