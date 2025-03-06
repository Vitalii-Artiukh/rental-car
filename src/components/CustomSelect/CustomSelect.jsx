import { useEffect, useState } from "react";
import css from "./CustomSelect.module.css";
import clsx from "clsx";

export const CustomSelect = ({ options, placeholder, name }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(null);
    setFocusedOptionIndex(-1);
  };

  const selectedKeyDown = (option) => {
    setSelectedOption(option);
  };

  const optionsValueLabel = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setFocusedOptionIndex(
        (prevIndex) => (prevIndex + 1) % optionsValueLabel.length
      );
    } else if (e.key === "ArrowUp") {
      setFocusedOptionIndex(
        (prevIndex) =>
          (prevIndex - 1 + optionsValueLabel.length) % optionsValueLabel.length
      );
    }
    // else if (e.key === "Enter" && focusedOptionIndex >= 0) {
    //   handleSelect(optionsValueLabel[focusedOptionIndex]);
    // }
  };

  useEffect(() => {
    selectedKeyDown(optionsValueLabel[focusedOptionIndex]);
  }, [focusedOptionIndex]);

  console.log(showOptions);
  console.log(selectedOption);
  console.log(focusedOptionIndex);

  return (
    <div className={css.customSelect} tabIndex="0" onKeyDown={handleKeyDown}>
      <div
        className={css.selectBox}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      <div className={clsx(css.options, showOptions ? css.show : "")}>
        {optionsValueLabel?.map((option, index) => (
          <div
            key={option.value}
            className={clsx(
              css.option,
              index === focusedOptionIndex ? css.focused : ""
            )}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};
