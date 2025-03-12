import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";
import Icon from "../ui/Icon/Icon";

const activeClasses = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
  return (
    <header className={clsx(css.header)}>
      <div className={clsx(css.headerContainer)}>
        <Link to="/" className={clsx(css.logo)}>
          <Icon name={"icon-logo"} width={104} className={clsx(css.iconLogo)} />
        </Link>
        <div className={clsx(css.linkWrapper)}>
          <NavLink to="/" className={activeClasses}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={activeClasses}>
            Catalog
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
