import { useEffect } from 'react';
import { FormProvider, useForm, ValidationMode } from 'react-hook-form';
import { object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RequiredObjectSchema, TypeOfShape } from 'yup/lib/object';
import { AnyObject } from 'yup/lib/types';
import { ValidationErrors } from 'spraypaint/lib-esm/validation-errors';
import { ChildrenProps } from '../../../types';
import AutoSave from './AutoSave';
import Section from '../../common/Section';
import NestedFields from './utils/NestedFields';

export type FormProps = {
  autoSave?: boolean | { delay: number };
  defaultValues?: object;
  onSubmit: (values: object) => any;
  schema?: RequiredObjectSchema<{}, AnyObject, TypeOfShape<any>>;
  validateOn?: keyof ValidationMode;
  serverErrors?: ValidationErrors<any>;
} & ChildrenProps & Omit<React.HTMLProps<HTMLFormElement>, 'autoSave'>;

function Form({
  autoSave = false,
  children,
  defaultValues = {},
  onSubmit,
  schema = object({}).required(),
  serverErrors = {},
  validateOn = 'onSubmit',
  ...rest
}: FormProps) {
  const methods = useForm({
    defaultValues,
    mode: validateOn,
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  useEffect(() => methods.reset(defaultValues), [JSON.stringify(defaultValues)]);
  useEffect(() => {
    const errorKeys = Object.keys(serverErrors);
    if (errorKeys.length === 0) return;

    console.log('we moving');

    errorKeys.forEach((key) => {
      const error = serverErrors[key];

      if (!error?.attribute) return;

      methods.setError(error.attribute as never, { message: error.fullMessage, type: 'custom' });
    });
  }, [Object.keys(serverErrors).length]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {autoSave && <AutoSave delay={typeof autoSave === 'object' ? autoSave.delay : 0} onSubmit={onSubmit} />}
        {children}
      </form>
    </FormProvider>
  );
}

Form.NestedFields = NestedFields;
Form.Section = Section;

export default Form;
