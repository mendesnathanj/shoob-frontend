import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import debounce from 'debounce';
import useDeepCompareEffect from 'use-deep-compare-effect';

type AutoSaveProps = {
  delay?: number;
  onSubmit: (values: object) => any;
};

export default function AutoSave({ delay = 0, onSubmit }: AutoSaveProps) {
  const { formState, handleSubmit, watch } = useFormContext();
  const formData = watch();
  const debouncedSave = useCallback(debounce(() => handleSubmit(onSubmit)(), delay), []);

  useDeepCompareEffect(() => {
    if (!formState.isDirty) return;

    debouncedSave();
  }, [formData]);

  return null;
}
