import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { addMonths, getMonth, subMonths, getYear } from 'date-fns';
import React from 'react';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function HeaderButton({ children, onClick }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className="rounded-full inline-flex justify-center items-center h-9 w-9 hover:bg-gray-200"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function LeftIcon() {
  return <FontAwesomeIcon icon={faAngleLeft} />;
}

function RightIcon() {
  return <FontAwesomeIcon icon={faAngleRight} />;
}

type HeaderProps = {
  firstDayOfMonth: Date,
  setFirstDayOfMonth: (date: Date) => void;
};

export default function Header({ firstDayOfMonth, setFirstDayOfMonth }: HeaderProps) {
  return (
    <div className="flex justify-between align-center items-center tracking-wide mb-4">
      <HeaderButton onClick={() => setFirstDayOfMonth(subMonths(firstDayOfMonth, 1))}>
        <LeftIcon />
      </HeaderButton>
      <span className="font-semibold font-display">
        {`${MONTHS[getMonth(firstDayOfMonth)]} ${getYear(firstDayOfMonth)}`}
      </span>
      <HeaderButton onClick={() => setFirstDayOfMonth(addMonths(firstDayOfMonth, 1))}>
        <RightIcon />
      </HeaderButton>
    </div>
  );
}
