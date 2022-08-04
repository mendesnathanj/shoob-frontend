import { cloneElement, ReactNode, useEffect, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  safePolygon
} from '@floating-ui/react-dom-interactions';
import FloatingContent from '../utils/FloatingContent';

interface Props {
  label: string | ReactNode;
  interactive?: boolean;
  placement?: Placement;
  children: string | JSX.Element;
}

export default function Tooltip({
  children,
  label,
  interactive = false,
  placement = 'top'
}: Props) {
  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    refs,
    update
  } = useFloating({
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    onOpenChange: setOpen,
    open,
    placement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: { open: 1000 },
      handleClose: interactive ? safePolygon() : undefined,
      restMs: 40,
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context)
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [refs.reference, refs.floating, update, open]);

  return (
    <>
      {typeof children === 'string' ? (
        <span {...getReferenceProps({ ref: reference })}>{children}</span>
      ) : (
        cloneElement(
          children,
          getReferenceProps({ ref: reference, ...children.props })
        )
      )}
      <FloatingContent
        open={open}
        {...getFloatingProps({
          className: 'shadow px-4 py-2 rounded border',
          ref: floating,
          style: {
            left: x ?? '',
            position: strategy,
            top: y ?? '',
          }
        })}
      >
        {label}
      </FloatingContent>
    </>
  );
}
