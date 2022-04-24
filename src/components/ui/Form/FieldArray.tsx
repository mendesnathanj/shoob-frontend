import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ChildrenProps } from '../../../types';
import Button from '../Button';
import { NestedContextProvider, useNestedName } from './NestedContext';

type FieldArrayProps = {
  newItemDefaults: object;
  scope: string;
} & ChildrenProps;

export default function FieldArray({ children, newItemDefaults, scope }: FieldArrayProps) {
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
      <Button variant="primary" onClick={() => append(newItemDefaults)}>Add Element</Button>
    </div>
  );
}
