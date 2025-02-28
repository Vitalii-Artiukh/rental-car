import clsx from "clsx";
import css from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({
  variant = "default",
  width = "156px",
  className,
  type = "button",
  onClick,
  to,
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
    <Link to={to} className={styles}>
      <button
        type={type}
        style={{ width }}
        onClick={onClick}
        className={css.btn}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
