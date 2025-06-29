import { FC, useEffect, useRef, useState } from 'react';
import css from './CustomSelect.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

interface CustomSelectProps {
  name: string;
  options: string[];
  placeholder: string;
  labelText: string;
  onChange: (name: string, option: string) => void;
  value: string;
  className: string;
}

export const CustomSelect: FC<CustomSelectProps> = ({
  name,
  options,
  placeholder,
  labelText,
  onChange,
  value,
  className,
}) => {
  // const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState<boolean | null>(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const filterRef = useRef<HTMLLabelElement>(null);

  const handleSelect = (option: string) => {
    onChange(name, option);
    // setSelectedOption(option);
    setShowOptions(null);
    setFocusedOptionIndex(-1);
  };

  // const selectedKeyDown = (name, option) => {
  //   // onChange(name, option);
  // };

  const optionsValueLabel = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  // const handleKeyDown = (e) => {
  //   if (e.key === "ArrowDown") {
  //     setFocusedOptionIndex(
  //       (prevIndex) => (prevIndex + 1) % optionsValueLabel.length
  //     );
  //   } else if (e.key === "ArrowUp") {
  //     setFocusedOptionIndex(
  //       (prevIndex) =>
  //         (prevIndex - 1 + optionsValueLabel.length) % optionsValueLabel.length
  //     );
  //   } else if (e.key === "Enter" && focusedOptionIndex >= 0) {
  //     handleSelect(optionsValueLabel[focusedOptionIndex]);
  //   }
  // };

  // useEffect(() => {
  //   selectedKeyDown(optionsValueLabel[focusedOptionIndex]);
  // }, [focusedOptionIndex, optionsValueLabel]);

  // closed dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowOptions(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setShowOptions]);

  return (
    <label
      ref={filterRef}
      className={clsx(css.customSelect, className)}
      tabIndex={0}
      // onKeyDown={handleKeyDown}
    >
      <p className={css.labelName}>{labelText}</p>
      <div
        className={css.input}
        onClick={() => setShowOptions(!showOptions)}
        data-name={name}
      >
        {value ? (
          name === 'rentalPrice' && value !== '' ? (
            <p>
              <span>To $</span>
              <span className={css.fontWeight}>{value}</span>
            </p>
          ) : (
            value || placeholder
          )
        ) : (
          value || placeholder
        )}
        <Icon
          width={16}
          height={16}
          name={'icon-down'}
          className={clsx(css.iconDown, showOptions ? css.iconUpper : '')}
        />
        <div
          id={labelText}
          className={clsx(css.dropdown, showOptions ? css.show : '')}
        >
          {optionsValueLabel?.map((option, index) => (
            <div
              key={option.value}
              className={clsx(
                css.dropdownItem,
                index === focusedOptionIndex ? css.focused : '',
              )}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </label>
  );
};
