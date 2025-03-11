import { Route, Routes } from "react-router-dom";

import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import GeneralWrapper from "../ui/Layout.jsx";
// import * as operations from "../../redux/cars/operations.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GeneralWrapper />}>
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
