import { FC } from 'react';
import { InputCustomProps } from '../../../types.ts';

export const InputCustomText: FC<InputCustomProps> = ({
  className,
  classNameLabel,
  classNameLabelText,
  name,
  placeholder,
  labelText,
  toFilter,
  handleChange,
}) => {
  return (
    <label htmlFor={name} className={classNameLabel}>
      <p className={classNameLabelText}>{labelText}</p>
      <input
        type="text"
        id={name}
        className={className}
        placeholder={placeholder}
        value={toFilter}
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </label>
  );
};
