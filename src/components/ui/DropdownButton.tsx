import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

type DropdownButtonProps = {
  content: JSX.Element | React.ReactNode
} & React.HTMLProps<HTMLDivElement>;

const dropdown = createPortal(<div>Hello!</div>, document.body);

export default function DropdownButton({
  content,
}: DropdownButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={ref}
        variant="primary"
        endIcon={<FontAwesomeIcon icon={faCaretDown} />}
      >
        {content}
      </Button>
      {dropdown}
    </>
  );
}
