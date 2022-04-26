import { FormProvider, useForm } from 'react-hook-form';
import { ChildrenProps } from '../../../types';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  defaultValues?: object;
  onSubmit: (values: object) => any;
} & ChildrenProps;

function Form({ children, defaultValues = {}, onSubmit }: FormProps) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.NestedFields = NestedFields;

export default Form;