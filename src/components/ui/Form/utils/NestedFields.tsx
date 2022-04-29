import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ChildrenProps } from '../../../../types';
import Button from '../../Button';
import { NestedContextProvider, useNestedName } from './NestedContext';

type NestedFieldsProps = {
  addText?: string;
  newItemDefaults: object;
  scope: string;
} & ChildrenProps;

export default function NestedFields({ addText = 'Add Item', children, newItemDefaults, scope }: NestedFieldsProps) {
  const { control } = useFormContext();
  const computedScope = useNestedName({ name: scope });
  const { fields, append } = useFieldArray({ control, name: computedScope });

  return (
    <div>
      {fields.map((item, i) => (
        <React.Fragment key={item.id}>
          <NestedContextProvider index={i} scope={computedScope}>
            {children}
          </NestedContextProvider>
        </React.Fragment>
      ))}
      <Button onClick={() => append(newItemDefaults)}>a</Button>
    </div>
  );
}
