import { differenceInYears, format, isValid, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Calendar from '../components/ui/Calendar/Calendar';
import DropdownButton from '../components/ui/DropdownButton';
import Tooltip from '../components/ui/Tooltip';
import DateInput from '../components/ui/Form/Inputs/DateInput';
import { Popover } from '../components/ui/Popover';
import { Menu, MenuItem } from '../components/ui/DropdownMenu';

const DATE_FORMAT = 'MM-dd-yyyy';

export default function Admin() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ margin: 400 }}>
      <Popover
        placement="bottom-end"
        render={({ close }) => (
          <Calendar value={date} onChange={(newDate) => { setDate(newDate); close(); }} />
        )}
      >
        my popover
      </Popover>
    </div>
  );
}
