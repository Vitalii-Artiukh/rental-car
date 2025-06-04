import { Route, Routes } from 'react-router-dom';
import { lazy, FC } from 'react';

import Layout from '../ui/Layout';
import ToastProp from '../ui/ToastProp/ToastProp';
const DetailsPage = lazy(() => import('../../pages/DetailsPage/DetailsPage'));
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage'),
);
const CatalogPage = lazy(() => import('../../pages/CatalogPage/CatalogPage'));
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

const App: FC = () => {
  return (
    <>
      <ToastProp />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
