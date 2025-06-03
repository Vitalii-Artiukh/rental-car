import { Link, matchPath, NavLink, useLocation } from 'react-router-dom';
import { RiMenuFoldLine } from 'react-icons/ri';
import { TbFilterPlus } from 'react-icons/tb';
import clsx from 'clsx';
import css from './Header.module.css';
import Icon from '../ui/Icon/Icon.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectorOpenFilter } from '../../redux/filters/selectors';
import { setCloseFilter, setOpenFilter } from '../../redux/filters/slice';
import { selectorOpenMenu } from '../../redux/cars/selectors';
import { setCloseMenu, setOpenMenu } from '../../redux/cars/slice';
import { useEffect, useRef } from 'react';

const activeClasses = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
  const openFilter = useSelector(selectorOpenFilter);
  const openMenu = useSelector(selectorOpenMenu);
  const dispatch = useDispatch();
  const refModal = useRef(null);
  const { pathname } = useLocation();

  const isCatalog = matchPath('/catalog', pathname);

  // window width control
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // useEffect(() => {
  //   const handleResize = () => setScreenWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        refModal.current &&
        !refModal.current.contains(e.target) &&
        !e.target.closest('.menuBtn') &&
        openMenu
      ) {
        // if (openMenu) {
        setTimeout(() => {
          dispatch(setCloseMenu());
        }, 50);
        // }
      }

      // if (
      //   refModal.current &&
      //   !refModal.current.contains(e.target) &&
      //   !e.target.closest(".formWrapper") &&
      //   // !e.target(".formWrapper") &&
      //   openFilter
      // ) {
      //   // if (openMenu) {
      //   // setTimeout(() => {
      //   dispatch(setCloseFilter());
      //   // }, 50);
      //   // }
      // }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch, openMenu]);

  const handleMenuOpen = () => {
    if (!openMenu) {
      dispatch(setOpenMenu());
    }

    dispatch(setCloseFilter());
  };

  const handleMenuClosed = () => {
    if (openMenu) {
      setTimeout(() => {
        dispatch(setCloseMenu());
      }, 50);
    }
  };

  // open/close filter form button filter
  const handleFilter = () => {
    if (!openFilter) {
      dispatch(setOpenFilter());
    } else {
      dispatch(setCloseFilter());
    }
  };

  return (
    <header className={clsx(css.header)}>
      <div className={clsx(css.headerContainer)} ref={refModal}>
        <Link to="/" className={clsx(css.logo)}>
          <Icon width={104} name={'icon-logo'} className={clsx(css.iconLogo)} />
        </Link>
        {!openMenu && isCatalog && (
          <button
            type="button"
            onClick={handleFilter}
            className={css.filterBtn}
            title="Open filters"
          >
            <TbFilterPlus className={css.iconFilter} />
          </button>
        )}
        <div className={clsx(css.linkWrapper, openMenu && css.openedMenu)}>
          <NavLink to="/" className={activeClasses} onClick={handleMenuClosed}>
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

        <button
          type="button"
          onClick={openMenu ? handleMenuClosed : handleMenuOpen}
          className={css.menuBtn}
          title="Open menu"
        >
          <RiMenuFoldLine
            className={clsx(css.iconMenu, openMenu && css.opened)}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
