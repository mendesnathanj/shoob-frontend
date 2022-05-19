import { FormProvider, useForm } from 'react-hook-form';
import { ChildrenProps } from '../../../types';
import Section from './Section';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  defaultValues?: object;
  onSubmit: (values: object) => any;
} & ChildrenProps;

function Form({ children, defaultValues = {}, onSubmit }: FormProps) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form className="grid gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.NestedFields = NestedFields;
Form.Section = Section;

export default Form;
