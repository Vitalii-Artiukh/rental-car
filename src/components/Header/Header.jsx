import { Link, NavLink } from "react-router-dom";
import { RiMenuFoldLine } from "react-icons/ri";
import { TbFilterPlus } from "react-icons/tb";
import clsx from "clsx";
import css from "./Header.module.css";
import Icon from "../ui/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
import { selectorOpenFilter } from "../../redux/filters/selectors";
import { setOpenFilter } from "../../redux/filters/slice";
import { selectorOpenMenu } from "../../redux/cars/selectors";
import { setOpenMenu } from "../../redux/cars/slice";

const activeClasses = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
  const openFilter = useSelector(selectorOpenFilter);
  const openMenu = useSelector(selectorOpenMenu);
  const dispatch = useDispatch();
  const handleMenu = () => {
    dispatch(setOpenMenu());
  };

  const handleFilter = () => {
    dispatch(setOpenFilter());
  };

  console.log(openMenu);

  return (
    <header className={clsx(css.header)}>
      <div className={clsx(css.headerContainer)}>
        <Link to="/" className={clsx(css.logo)}>
          <Icon name={"icon-logo"} className={clsx(css.iconLogo)} />
        </Link>
        <div className={clsx(css.linkWrapper)}>
          <NavLink to="/" className={activeClasses}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={activeClasses}>
            Catalog
          </NavLink>
          <button type="button" onClick={handleFilter}>
            <TbFilterPlus className={css.iconFilter} />
          </button>
          <button type="button" onClick={handleMenu}>
            <RiMenuFoldLine className={css.iconMenu} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
