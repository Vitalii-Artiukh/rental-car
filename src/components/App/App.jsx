import { Route, Routes } from "react-router-dom";

import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
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
