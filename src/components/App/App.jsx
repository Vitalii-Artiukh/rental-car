import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from "./App.module.css";
import Container from "../ui/Container/Container";
import Loader from "../ui/Loader/Loader";
import SharedLayout from "../ui/SharedLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/details/:carId" element={<DetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
