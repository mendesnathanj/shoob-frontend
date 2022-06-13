import {
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  flip,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import { motion, Variants } from 'framer-motion';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Calendar from '../../Calendar/Calendar';
import { useNestedName } from '../utils/NestedContext';
import Input from './Input';
import { InputProps } from './types';
import { USER_DATE_FORMAT } from '../../../../utils/constants';

const variants: Variants = {
  closed: { marginTop: -8, opacity: 0, },
  open: { marginTop: 0, opacity: 1, visibility: 'visible' },
};

export default function DateInput(props: InputProps) {
  const { watch, setValue } = useFormContext();
  const nestedName = useNestedName({ name: props.name });
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const watchDate = watch(nestedName);

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
    onOpenChange: () => {},
    open,
    placement: 'bottom-end',
  });

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
      <Input
        containerProps={{ ...getReferenceProps({ ref: reference }) }}
        {...props}
        defaultValue={format(new Date(), USER_DATE_FORMAT)}
        endIcon={(
          <button
            className={`
              flex items-center justify-center w-8 h-8 rounded-full
              transition-colors duration-200 hover:bg-gray-200`}
            onClick={toggle}
            type="button"
          >
            <FontAwesomeIcon icon={faCalendar} />
          </button>
        )}
      />
      <FloatingPortal>
        <FloatingFocusManager context={context}>
          <motion.div
            {...getFloatingProps({
              'aria-describedby': 'description',
              'aria-labelledby': 'label',
              className: 'shadow p-2 rounded border bg-white',
              ref: floating,
              style: {
                left: x ?? '',
                position: strategy,
                top: y ?? '',
              },
            })}
            animate={open ? 'open' : 'closed'}
            initial={{ marginTop: -8, opacity: 0, visibility: 'hidden' }}
            transitionEnd={{ visibility: 'hidden' }}
            variants={variants}
          >
            <Calendar
              value={parse(watchDate, USER_DATE_FORMAT, new Date())}
              onChange={(newDate) => {
                setValue(nestedName, format(newDate, USER_DATE_FORMAT));
                toggle();
              }}
            />
          </motion.div>
        </FloatingFocusManager>
      </FloatingPortal>
    </>
  );
}
