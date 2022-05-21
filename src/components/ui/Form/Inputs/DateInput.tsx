import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, parse } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import Calendar from '../../Calendar/Calendar';
import { Popover } from '../../Popover';
import Input from './Input';

const DATE_FORMAT = 'MM-dd-yyyy';

export default function DateInput() {
  const { getValues, setValue } = useFormContext();
  // const computedName = useNestedName({ name });

  return (
    <Popover
      placement="bottom-end"
      render={({ close }) => (
        <Calendar
          value={parse(getValues('date'), DATE_FORMAT, new Date())}
          onChange={(newDate) => {
            setValue('date', format(newDate, DATE_FORMAT));
            close();
          }}
        />
      )}
    >
      <span>
        <Input
          defaultValue={format(new Date(), DATE_FORMAT)}
          endIcon={<FontAwesomeIcon icon={faCalendar} />}
          label="Date"
          name="date"
        />
      </span>
    </Popover>
  );
}
