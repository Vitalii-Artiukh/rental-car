import { useState } from 'react';
import Calendar from '../Calendar/Calendar.js';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Button from '../ui/Button/Button.tsx';
import css from './FormOrder.module.css';

const FormOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: null,
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e) => {
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
            value={formData?.name}
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
            value={formData?.email}
            onChange={handleChange}
            required
          />
        </label>

        <Calendar
          className={css.inputText}
          selectedDate={formData?.date}
          onChange={handleDateChange}
          placeholder="Booking date"
        />

        <label htmlFor="comment">
          <textarea
            type="textarea"
            name="comment"
            id="comment"
            className={clsx(css.comment, css.inputText)}
            placeholder="Comment"
            onChange={handleChange}
            value={formData?.comment}
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
