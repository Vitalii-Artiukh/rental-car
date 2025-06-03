import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({
  variant = "default",
  className,
  type = "button",
  onClick,
  children,
}) => {
  const styles = clsx(
    css.button,
    variant === "default" && clsx(css.default),
    variant === "long" && clsx(css.long),
    variant === "transparent" && clsx(css.transparent),
    className && className
  );
  return (
    <button type={type} onClick={onClick} className={clsx(css.btn, styles)}>
      {children}
    </button>
  );
};

export default Button;
