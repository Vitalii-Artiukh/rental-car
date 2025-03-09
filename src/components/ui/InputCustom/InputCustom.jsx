import clsx from "clsx";
import css from "./InputCustom.module.css";
import Icon from "../icon";
import { useEffect, useRef, useState } from "react";

export const InputCustomText = ({
  className,
  name,
  placeholder,
  labelText,
  localFilters,
  handleChange,
}) => {
  return (
    <label htmlFor={name} className={css.label}>
      <p className={css.labelText}>{labelText}</p>
      <input
        type="text"
        id={name}
        className={className}
        placeholder={placeholder}
        value={
          localFilters
          // ? `From ${Number(localFilters.maxMileage).toLocaleString("en-US")}`
          // : ""
        }
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </label>
  );
};
