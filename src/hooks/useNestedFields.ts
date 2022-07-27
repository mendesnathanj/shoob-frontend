import { useFormContext, useFieldArray } from 'react-hook-form';

export default function useNestedFields({ name }: { name: string }) {
  const { control } = useFormContext();
  const methods = useFieldArray({ control, keyName: `${name}Id`, name });

  return { name, ...methods };
}
