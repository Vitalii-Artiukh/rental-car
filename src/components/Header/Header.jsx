import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { RiMenuFoldLine } from "react-icons/ri";
import { TbFilterPlus } from "react-icons/tb";
import clsx from "clsx";
import css from "./Header.module.css";
import Icon from "../ui/Icon/Icon";
import { useDispatch, useSelector } from "react-redux";
// import { selectorOpenFilter } from "../../redux/filters/selectors";
import { setOpenFilter } from "../../redux/filters/slice";
import { selectorOpenMenu } from "../../redux/cars/selectors";
import { setOpenMenu } from "../../redux/cars/slice";
import { useEffect, useRef, useState } from "react";

const activeClasses = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
  // const openFilter = useSelector(selectorOpenFilter);
  const openMenu = useSelector(selectorOpenMenu);
  const dispatch = useDispatch();
  const refModal = useRef(null);
  const { pathname } = useLocation();

  const isHome = matchPath("/", pathname);

  const openedClasses = () => {
    return clsx(css.iconMenu, openMenu && css.opened);
  };

  // window width control
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        refModal.current &&
        !refModal.current.contains(e.target) &&
        !e.target.closest(".menuBtn") &&
        openMenu
      ) {
        handleMenuClosed();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openMenu]);

  const handleMenuOpen = () => {
    if (!openMenu) {
      dispatch(setOpenMenu());
    }
  };

  const handleMenuClosed = () => {
    if (openMenu) {
      setTimeout(() => {
        dispatch(setOpenMenu());
      }, 250);
    }
  };

  console.log(openMenu);

  const handleFilter = () => {
    dispatch(setOpenFilter());
  };

  return (
    <header className={clsx(css.header)}>
      <div className={clsx(css.headerContainer)} ref={refModal}>
        <Link to="/" className={clsx(css.logo)}>
          <Icon name={"icon-logo"} className={clsx(css.iconLogo)} />
        </Link>
        {!openMenu && !isHome && (
          <button
            type="button"
            onClick={handleFilter}
            className={css.filterBtn}
            title="Open filters"
          >
            <TbFilterPlus className={css.iconFilter} />
          </button>
        )}

        {screenWidth > 767 || openMenu ? (
          <div className={clsx(css.linkWrapper)}>
            <NavLink
              to="/"
              className={activeClasses}
              onClick={handleMenuClosed}
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={activeClasses}
              onClick={handleMenuClosed}
            >
              Catalog
            </NavLink>
          </div>
        ) : (
          ""
        )}

        <button
          type="button"
          onClick={openMenu ? handleMenuClosed : handleMenuOpen}
          className={css.menuBtn}
        >
          <RiMenuFoldLine className={openedClasses()} />
        </button>
      </div>
    </header>
  );
};

export default Header;
