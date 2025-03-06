import clsx from "clsx";
import css from "./InputCustom.module.css";
import Icon from "../icon";
import { useEffect, useRef, useState } from "react";

export const InputCustomSelector = (
  props
  // {
  // isOpenSelect,
  // onChange,
  // value,
  // formatValue,
  // placeholder,
  // name,
  // option,
  // }
) => {
  // console.log(props.list);
  const [isOpen, setIsOpen] = useState(null);
  // const [localFilters, setLocalFilters] = useState({
  //   brand: "",
  //   rentalPrice: "",
  //   minMileage: "",
  //   maxMileage: "",
  // });
  const filterRef = useRef(null);
  // console.log(props.name);

  const handleOpen = () => {
    // const nameValue = (prev) => (prev === name ? null : name);
    // if (name === nameValue) {
    setIsOpen(true);
    // }
  };

  const handleSelect = (option) => {
    onChange(props.name);
    setIsOpen(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <label className={clsx(css.inputWrapper)}>
      <div className={clsx(css.input)} onClick={handleOpen} name={props.name}>
        {props.formatValue
          ? props.formatValue(props.name)
          : props.name || props.placeholder}
        <Icon
          width={16}
          height={16}
          name={"icon-down"}
          className={clsx(css.iconDown)}
        />
      </div>
      {isOpen && (
        <ul className={clsx(css.dropdown)}>
          {props.list?.map((item) => (
            <li key={item} value={item} onClick={handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {/* <label htmlFor={htmlFor}>
        {name}
        <select type={type} id={htmlFor} name={name} placeholder={placeholder}>
          {option?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label> */}
    </label>
  );
};

export const InputCustomText = ({ htmlFor, type, name }) => {
  return <div>InputCustomText</div>;
};
