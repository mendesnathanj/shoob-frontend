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
  disabled?: boolean;
  label: string | ReactNode;
  interactive?: boolean;
  offset?: number;
  openDelay?: number;
  placement?: Placement;
  children: string | JSX.Element;
}

export default function Tooltip({
  children,
  disabled = false,
  label,
  interactive = false,
  offset: tooltipOffset = 5,
  openDelay = 1000,
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
    middleware: [offset(tooltipOffset), flip(), shift({ padding: 8 })],
    onOpenChange: setOpen,
    open,
    placement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: { open: openDelay },
      handleClose: interactive ? safePolygon() : undefined,
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
        open={!disabled && open}
        {...getFloatingProps({
          className: 'shadow px-4 py-2 rounded border bg-white',
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
