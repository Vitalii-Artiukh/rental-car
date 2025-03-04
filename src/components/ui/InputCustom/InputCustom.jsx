import clsx from "clsx";
import css from "./InputCustom.module.css";
import Icon from "../icon";

export const InputCustomSelector = ({
  isOpenSelect,
  value,
  formatValue,
  htmlFor,
  placeholder,
  name,
  type,
  option,
}) => {
  return (
    <label className={clsx(css.inputWrapper)}>
      <div className={clsx(css.input)}>
        {formatValue ? formatValue(value) : value || placeholder}
        <Icon
          width={16}
          height={16}
          name={"icon-down"}
          className={clsx(css.iconDown)}
        />
      </div>
      {isOpenSelect && (
        <ul className={clsx(css.dropdown)}>
          {option?.map((opt) => (
            <li key={opt} value={opt}>
              {opt}
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
