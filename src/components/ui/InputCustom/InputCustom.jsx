import clsx from "clsx";
import css from "./InputCustom.module.css";

export const InputCustomSelector = ({ htmlFor, name, type }) => {
  return (
    <div>
      <label htmlFor={htmlFor} className={clsx(css.inputWrapper)}>
        Car brand
        <input type={type} id={htmlFor} name={name} />
      </label>
    </div>
  );
};

export const InputCustomText = ({ htmlFor, type, name }) => {
  return <div>InputCustomText</div>;
};
