import { FormProvider, useForm } from 'react-hook-form';
import { ChildrenProps } from '../../../types';

export type FormProps = {
  defaultValues?: object;
  onSubmit: (values: object) => any;
} & ChildrenProps;

export default function Form({ children, defaultValues = {}, onSubmit }: FormProps) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
