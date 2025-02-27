import clsx from "clsx";
import css from "./Button.module.css";

const Button = ({
  variant = "default",
  width = "156px",
  className,
  type = "button",
  onClick,
  children,
}) => {
  const styles = clsx(
    css.button,
    variant === "default" && css.default,
    variant === "long" && css.long,
    variant === "transparent" && css.transparent,
    className && className
  );
  return (
    <button type={type} className={styles} style={{ width }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
