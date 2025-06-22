import { matchPath, useLocation } from 'react-router-dom';
import css from './Container.module.css';
import clsx from 'clsx';
import { ChildrenProps } from '../../../types.ts';
import { JSX } from 'react';

interface LocationType {
  pathname: string;
}

const Container = ({ children }: ChildrenProps): JSX.Element => {
  const { pathname }: LocationType = useLocation();

  const isHome = matchPath('/', pathname);
  return (
    <div className={clsx(isHome ? css.homePageContainer : css.container)}>
      {children}
    </div>
  );
};

export default Container;
