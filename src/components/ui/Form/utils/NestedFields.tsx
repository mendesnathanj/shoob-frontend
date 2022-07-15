import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Button, { ButtonProps } from '../../Button';
import { NestedContextProvider, useNestedName } from './NestedContext';

type BaseProps = {
  addText?: string;
  buttonProps?: ButtonProps;
  newItemDefaults: object;
  scope: string;
}
type NestedFieldsProps = React.PropsWithChildren<BaseProps>;

export default function NestedFields({
  addText = 'Add Item',
  buttonProps = {},
  children,
  newItemDefaults,
  scope,
}: NestedFieldsProps) {
  const { control } = useFormContext();
  const computedScope = useNestedName({ name: scope });
  const { fields, append } = useFieldArray({ control, name: computedScope });

  return (
    <>
      {fields.map((item, i) => (
        <React.Fragment key={item.id}>
          <NestedContextProvider index={i} scope={computedScope}>
            {children}
          </NestedContextProvider>
        </React.Fragment>
      ))}
      <Button
        {...buttonProps}
        onClick={(e) => {
          append(newItemDefaults);
          if (buttonProps.onClick) buttonProps.onClick(e);
        }}
      >
        {addText}
      </Button>
    </>
  );
}
