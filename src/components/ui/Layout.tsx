import { Suspense } from 'react';
import Header from '../Header/Header.js';
import Container from './Container/Container.tsx';
import { Outlet } from 'react-router-dom';
import Loader from './Loader/Loader.tsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
};

export default Layout;
