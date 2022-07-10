import { useEffect } from 'react';
import { FormProvider, useForm, ValidationMode } from 'react-hook-form';
import { object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequiredObjectSchema, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';
import { ChildrenProps } from '../../../types';
import AutoSave from './AutoSave';
import Section from './Section';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  autoSave?: boolean;
  defaultValues?: object;
  onSubmit: (values: object) => any;
  schema?: RequiredObjectSchema<{}, AnyObject, TypeOfShape<any>>;
  validateOn?: keyof ValidationMode;
} & ChildrenProps & Omit<React.HTMLProps<HTMLFormElement>, 'autoSave'>;

function Form({
  autoSave = false,
  children,
  defaultValues = {},
  onSubmit,
  schema = object({}).required(),
  validateOn = 'onSubmit',
  ...rest
}: FormProps) {
  const methods = useForm({ defaultValues, mode: validateOn, resolver: yupResolver(schema), });

  useEffect(() => methods.reset(defaultValues), [JSON.stringify(defaultValues)]);

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
