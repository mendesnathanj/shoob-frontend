import { useEffect, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  ReferenceType,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { DropdownButtonContextType } from './DropdownButtonContext';

type usePositioningProps = Omit<DropdownButtonContextType, 'toggle'>;

export const usePositioning = ({ open, setOpen }: usePositioningProps) => {
  const { x, y, reference, floating, strategy, update, refs, context } = useFloating({
    middleware: [
      flip(),
      shift(),
    ],
    onOpenChange: setOpen,
    open,
    placement: 'bottom-end',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions(
    [
      useClick(context),
      useRole(context, { role: 'menu' }),
      useDismiss(context),
    ]
  );

  useEffect(() => {
    if (!open || !refs.reference.current || !refs.floating.current) return;

    autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [open, refs.reference, refs.floating, update]);

  return { floating, getFloatingProps, getReferenceProps, reference, refs, strategy, x, y };
};

type useMinWidthProps = {
  ref: React.MutableRefObject<ReferenceType | null>;
}

export const useMinWidth = ({ ref }: useMinWidthProps) => {
  const [minWidth, setMinWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    setMinWidth((ref.current as HTMLButtonElement).offsetWidth * 1.25);
  }, [ref]);

  return minWidth;
};
