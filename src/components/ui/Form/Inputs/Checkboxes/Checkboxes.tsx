import { useFormContext } from 'react-hook-form';
import { useNestedName } from '../../utils/NestedContext';
import { InputProps } from '../types';
import Checkbox from './Checkbox';

type Option = Omit<InputProps, 'name'>;

type CheckboxesProps = {
  canSelectAll?: boolean;
  selectAllText?: string;
  name: string;
  options: Option[];
};

export default function Checkboxes({
  canSelectAll = false,
  name,
  options,
  selectAllText = 'Select All'
}: CheckboxesProps) {
  const nestedName = useNestedName({ name });
  const { watch, setValue } = useFormContext();
  const watchedName = watch(nestedName);

  const changeHandler = () => {
    if (watchedName && watchedName.length === options.length) {
      setValue(nestedName, []);
    }
    else {
      setValue(nestedName, options.map((option) => option.value));
    }
  };

  const checkboxesContainerClasses = `${canSelectAll ? 'ml-2' : ''}`;

  return (
    <div>
      {canSelectAll && (
        <label className="flex gap-2">
          <input
            checked={watchedName ? watchedName.length === options.length : false}
            className="inline-block rounded border-gray-400 text-shoob-600
                   placeholder:opacity-70 placeholder:italic top-0.5 relative
                 focus:border-shoob-300 focus:ring-shoob-300"
            onChange={changeHandler}
            type="checkbox"
          />
          <span>{selectAllText}</span>
        </label>
      )}
      <div className={checkboxesContainerClasses}>
        {options.map((option) => (
          <Checkbox key={option.label} name={nestedName} {...option} />
        ))}
      </div>
    </div>
  );
}
