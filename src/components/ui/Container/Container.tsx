import { matchPath, useLocation } from "react-router-dom";
import css from "./Container.module.css";
import clsx from "clsx";

const Container = ({ children }) => {
  const { pathname } = useLocation();

  const isHome = matchPath("/", pathname);
  return (
    <div className={clsx(isHome ? css.homePageContainer : css.container)}>
      {children}
    </div>
  );
};

export default Container;
