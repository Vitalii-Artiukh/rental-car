import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarProps } from '../../types.ts';
import { JSX } from 'react';

const Calendar = ({
  selectedDate,
  onChange,
  className,
  placeholder,
}: CalendarProps): JSX.Element => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd-MM-yyyy"
      minDate={new Date()} // Заборона вибору застарілих дат
      placeholderText={placeholder}
      className={className}
      portalId="root"
    />
  );
};

export default Calendar;
