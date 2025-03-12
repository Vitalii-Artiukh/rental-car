import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import GeneralWrapper from "../ui/Layout.jsx";
const DetailsPage = lazy(() => import("../../pages/DetailsPage/DetailsPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GeneralWrapper />}>
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
