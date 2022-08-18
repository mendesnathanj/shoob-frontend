import { HTMLProps } from 'react';

type LabeledItemProps = {
  containerProps?: HTMLProps<HTMLDivElement>;
  isLoading?: boolean;
  label?: string;
  value?: React.ReactNode;
  placeholder?: string;
}

export default function LabeledItem({
  containerProps = {},
  isLoading = false,
  label,
  value,
  placeholder = 'N/A'
}: LabeledItemProps) {
  return (
    <div {...containerProps}>
      <p className="font-semibold">{label}</p>
      {!isLoading && <p className="break-words">{value || placeholder}</p>}
    </div>
  );
}
