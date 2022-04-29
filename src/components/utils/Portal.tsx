import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useMinWidth, usePositioning } from '../ui/DropdownButton/hooks';

type PortalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
} & React.HTMLProps<HTMLDivElement>;

export default function Portal({ children, open, setOpen }: PortalProps) {
  const {
    floating, getFloatingProps, getReferenceProps, reference, refs, strategy, x, y
  } = usePositioning({ open, setOpen });
  const minWidth = useMinWidth({ ref: refs.reference });

  return (
    <FloatingPortal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ marginTop: 0, opacity: 0 }}
            animate={{ marginTop: 5, opacity: 1 }}
            exit={{ marginTop: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
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
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}
