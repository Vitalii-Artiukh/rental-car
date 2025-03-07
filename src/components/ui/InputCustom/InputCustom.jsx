import clsx from "clsx";
import css from "./InputCustom.module.css";
import Icon from "../icon";
import { useEffect, useRef, useState } from "react";

export const InputCustomText = ({ className, name }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>
        <input type="text" id={name} />
      </label>
      <p>{name}</p>
      InputCustomText
    </div>
  );
};
