import { FormProvider, useForm } from 'react-hook-form';
import { ChildrenProps } from '../../../types';
import Section from './Section';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  defaultValues?: object;
  onSubmit: (values: object) => any;
} & ChildrenProps & React.HTMLProps<HTMLFormElement>;

function Form({ children, defaultValues = {}, onSubmit, ...rest }: FormProps) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
}

Form.NestedFields = NestedFields;
Form.Section = Section;

export default Form;
