import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type AutoSaveProps = {
  onSubmit: (values: object) => any;
};

export default function AutoSave({ onSubmit }: AutoSaveProps) {
  const { formState, handleSubmit, watch } = useFormContext();

  const formData = watch();

  useEffect(() => {
    if (!formState.isDirty) return;

    console.log('Form is dirty...');
    handleSubmit(onSubmit)();
  }, [JSON.stringify(formData)]);

  return null;
}
