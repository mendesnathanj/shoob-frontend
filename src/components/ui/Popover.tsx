import React, { cloneElement, useEffect, useState } from 'react';
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
} from '@floating-ui/react-dom-interactions';
import FloatingContent from '../utils/FloatingContent';

interface Props {
  animated?: boolean;
  render: (data: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  placement?: Placement;
  children: string | JSX.Element;
}

export function Popover({ animated = true, children, render, placement = 'top' }: Props) {
  const [open, setOpen] = useState(false);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    refs,
    update,
    context
  } = useFloating({
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    onOpenChange: setOpen,
    open,
    placement
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

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
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context}>
            <FloatingContent
              animated={animated}
              open={open}
              {...getFloatingProps({
                'aria-describedby': descriptionId,
                'aria-labelledby': labelId,
                className: 'shadow p-2 rounded border',
                ref: floating,
                style: {
                  left: x ?? '',
                  position: strategy,
                  top: y ?? '',
                },
              })}
            >
              {render({
                close: () => {
                  setOpen(false);
                },
                descriptionId,
                labelId,
              })}
            </FloatingContent>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
}
