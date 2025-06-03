import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import Layout from '../ui/Layout.js';
import ToastProp from '../ui/ToastProp/ToastProp.js';
const DetailsPage = lazy(
  () => import('../../pages/DetailsPage/DetailsPage.js'),
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage.js'),
);
const CatalogPage = lazy(
  () => import('../../pages/CatalogPage/CatalogPage.js'),
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.tsx'));

function App() {
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
}

export default App;
