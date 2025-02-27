import { Suspense } from "react";
import Header from "../Header/Header";
import Container from "./Container/Container";
import { Outlet } from "react-router-dom";
import Loader from "./Loader/Loader";

const SharedLayout = () => {
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

export default SharedLayout;
