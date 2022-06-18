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
import InputMask from 'react-input-mask';
import { motion, Variants } from 'framer-motion';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isMatch, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Calendar from '../../Calendar/Calendar';
import { useNestedName } from '../utils/NestedContext';
import { InputProps } from './types';
import { SERVER_DATE_FORMAT, USER_DATE_FORMAT } from '../../../../utils/constants';
import BaseInput from './BaseInput';
import { clientFormattedDate } from '../../../../utils/functions';

const variants: Variants = {
  closed: { marginTop: -8, opacity: 0, },
  open: { marginTop: 0, opacity: 1, visibility: 'visible' },
};

export default function DateInput(props: InputProps) {
  const { watch, setValue, register } = useFormContext();
  const nestedName = useNestedName({ name: props.name });
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const watchDate = watch(nestedName);

  useEffect(() => {
    if (isMatch(watchDate, SERVER_DATE_FORMAT)) {
      setValue(nestedName, clientFormattedDate(watchDate));
    }
  }, [watchDate]);

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

  const registerDate = register(nestedName);

  return (
    <>
      <InputMask
        alwaysShowMask
        mask="99/99/9999"
        maskPlaceholder="dd/mm/yyyy"
        onBlur={registerDate.onBlur}
        onChange={registerDate.onChange}
      >
        <BaseInput
          label={props.label}
          {...registerDate}
          endIcon={(
            <button
              className={`
                flex items-center justify-center w-8 h-8 rounded-full
                transition-colors duration-200 hover:bg-gray-200`}
              onClick={toggle}
              type="button"
              {...getReferenceProps({ ref: reference })}
            >
              <FontAwesomeIcon icon={faCalendar} />
            </button>
          )}
        />
      </InputMask>
      <FloatingPortal>
        {open && (
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
        )}
      </FloatingPortal>
    </>
  );
}
