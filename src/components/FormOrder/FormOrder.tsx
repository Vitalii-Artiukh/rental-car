import { ChangeEvent, FC, FormEvent, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Button from '../ui/Button/Button';
import css from './FormOrder.module.css';

interface FormDataState {
  name: string;
  email: string;
  date: Date | null;
  comment: string;
}

const FormOrder: FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    date: null,
    comment: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormDataState]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      date: null,
      comment: '',
    });
    toast.success('You successfully rented a car!');
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formDescription}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={css.formWrapper} onSubmit={handleSubmit}>
        <label htmlFor="name" className={css.inputLabel}>
          <input
            type="text"
            name="name"
            id="name"
            className={css.inputText}
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className={css.inputText}
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <Calendar
          className={css.inputText}
          selectedDate={formData.date || undefined}
          onChange={handleDateChange}
          placeholder="Booking date"
        />

        <label htmlFor="comment">
          <textarea
            maxLength={500}
            rows={4}
            // type="textarea"
            name="comment"
            id="comment"
            className={clsx(css.comment, css.inputText)}
            placeholder="Comment"
            onChange={handleChange}
            value={formData.comment}
          />
        </label>

        <Button className={css.submitBtn} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default FormOrder;
