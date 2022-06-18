import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { ChildrenProps } from '../../../types';
import AutoSave from './AutoSave';
import Section from './Section';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  autoSave?: boolean;
  defaultValues?: object;
  onSubmit: (values: object) => any;
} & ChildrenProps & Omit<React.HTMLProps<HTMLFormElement>, 'autoSave'>;

function Form({ autoSave = false, children, defaultValues = {}, onSubmit, ...rest }: FormProps) {
  const methods = useForm({ defaultValues });

  useEffect(() => {
    console.log('i am resetting...');
    methods.reset(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {autoSave && <AutoSave onSubmit={onSubmit} />}
        {children}
      </form>
    </FormProvider>
  );
}

Form.NestedFields = NestedFields;
Form.Section = Section;

export default Form;
