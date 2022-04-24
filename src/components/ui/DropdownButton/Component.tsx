import { AnimatePresence, motion } from 'framer-motion';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import Button from '../Button';
import { DropdownButtonContext } from './DropdownButtonContext';
import { useMinWidth, usePositioning } from './hooks';

export type DropdownButtonProps = {
  content: JSX.Element | React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

type ItemProps = {
  children: JSX.Element | React.ReactNode;
  closeWhenClicked?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const itemClasses = `
  block text-left min-w-full px-6 py-2 text-gray-700
  hover:bg-gray-100 transition-colors duration-150
  disabled:cursor-not-allowed disabled:bg-gray-200 disaabled:opacity-75 disabled:text-gray-500
`;

export function Item({ children, closeWhenClicked = true, disabled = false, onClick }: ItemProps) {
  const { toggle } = useContext(DropdownButtonContext);

  return (
    <button
      className={itemClasses}
      disabled={disabled}
      onClick={() => {
        onClick();
        if (closeWhenClicked) toggle();
      }}
      onKeyDown={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type LinkProps = {
  children: React.ReactNode;
  to: string;
}

export function Link({ children, to }: LinkProps) {
  return (
    <a className={itemClasses} href={to}>
      {children}
    </a>
  );
}

export default function Component({ content, children }: DropdownButtonProps) {
  const { open, setOpen } = useContext(DropdownButtonContext);
  const {
    floating, getFloatingProps, getReferenceProps, reference, refs, strategy, x, y
  } = usePositioning({ open, setOpen });
  const minWidth = useMinWidth({ ref: refs.reference });

  return (
    <>
      <Button
        {...getReferenceProps({
          onClick: () => setOpen(!open),
          ref: reference,
        })}
        endIcon={<FontAwesomeIcon icon={faCaretDown} />}
        variant="primary"
      >
        {content}
      </Button>
      <FloatingPortal>
        {open && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className="box-border bg-white border-slate-100 shadow-md rounded overflow-hidden"
              {...getFloatingProps({
                ref: floating,
                style: {
                  left: x ?? '',
                  minWidth,
                  position: strategy,
                  top: y ?? '',
                }
              })}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
      </FloatingPortal>
    </>
  );
}
