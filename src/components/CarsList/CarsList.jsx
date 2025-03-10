import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as carsSelect from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/operations";
import { setPage, favoriteToggle } from "../../redux/cars/slice";
import CarItems from "../CarItems/CarItems";
import Button from "../ui/Button/Button";
import FilterForm from "../FormFilter/FormFilter";
import css from "./CarsList.module.css";
import { useLocation } from "react-router-dom";
import { selectorFilter } from "../../redux/filters/selectors";

import React from "react";

const CarsList = () => {
  const cars = useSelector(carsSelect.selectorCars);

  console.log(cars);

  return (
    <ul className={css.carListWrapper}>
      {cars.map((car) => (
        <li key={car.id}>
          <CarItems car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarsList;

// const CarsList = () => {
// const dispatch = useDispatch();
// const location = useLocation();

// const page = useSelector(carsSelect.selectorPage);
// const cars = useSelector(carsSelect.selectorCars);
// const favoriteCars = useSelector(carsSelect.selectorFavoriteCars);
// const totalPages = useSelector(carsSelect.selectorTotalPages);
// const error = useSelector(carsSelect.selectorError);
// const isLoading = useSelector(carsSelect.selectorIsLoading);

// const filters = useSelector(selectorFilter);

// useEffect(() => {
//   if (location.pathname === "/catalog") {
//     dispatch(fetchCars({ page, filters }));
//   }
// }, [dispatch, page, filters, location.pathname]);

// const uniqueCars = Array.from(
//   new Map(cars.map((car) => [car.id, car])).values()
// );

// const handleToggleFavorite = (id) => {
//   dispatch(favoriteToggle(id));
// };

// const handleLoadMore = () => {
//   if (page < totalPages) {
//     dispatch(setPage(page + 1));
//   }
// };

// useEffect(() => {
//   if (page > 1) {
//     const cardHeight = 276;
//     const rows = 2;
//     const gap = 90;
//     window.scrollBy({
//       top: cardHeight * rows + gap,
//       behavior: "smooth",
//     });
//   }
// }, [cars]);

// return (
// <div className={css.wrapper}>
{
  /* <FilterForm /> */
}
{
  /* <ul className={css.list}> */
}
{
  /* {!error && isLoading && page === 1 ? (
          <></>
        ) : uniqueCars.length > 0 ? (
          uniqueCars.map((car) => (
            <li key={car.id} className={css.item}>
              <CarCard
                car={car}
                isFavorite={
                  Array.isArray(favoriteCars) && favoriteCars.includes(car.id)
                }
                onToggle={() => handleToggleFavorite(car.id)}
              />
            </li>
          ))
        ) : (
          <p className={css.errorMessage}>
            No cars found. Try changing the filters.
          </p>
        )} */
}
{
  /* </ul> */
}
{
  /* {!isLoading && !error && uniqueCars.length > 0 && page < totalPages && (
        <Button
          className={css.btnLoadMore}
          variant="loadmore"
          type="button"
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )} */
}
{
  /* </div> */
}
// );
// };

// export default CarsList;
