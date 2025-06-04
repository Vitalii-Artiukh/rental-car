import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as carsSelect from '../../redux/cars/selectors';
import { setPage, favoriteToggle } from '../../redux/cars/slice';
import CarItems from '../CarItems/CarItems';
import Button from '../ui/Button/Button';
import css from './CarsList.module.css';
// import { useLocation } from "react-router-dom";

import Loader from '../ui/Loader/Loader';
import FormFilter from '../FormFilter/FormFilter';
import { setOpenFilter } from '../../redux/filters/slice';
import { selectorOpenFilter } from '../../redux/filters/selectors';

const CarsList = () => {
  const dispatch = useDispatch();
  const openFilter = useSelector(selectorOpenFilter);
  const cars = useSelector(carsSelect.selectorCars);
  const favorite = useSelector(carsSelect.selectorFavorite);
  const page = useSelector(carsSelect.selectorPage);
  const totalPages = useSelector(carsSelect.selectorTotalPages);
  const isLoading = useSelector(carsSelect.selectorIsLoading);
  const error = useSelector(carsSelect.selectorError);

  const handleToggleFavorite = (id) => {
    dispatch(favoriteToggle(id));
  };

  const handleMore = () => {
    dispatch(setPage(page + 1));
  };

  // array with unique keys
  const keyCars = Array.from(
    new Map(cars.map((car) => [car.id, car])).values(),
  );

  useEffect(() => {
    // if (keyCars.length === 0) {
    //   if (!openFilter) {
    //     dispatch(setOpenFilter());
    //   }
    // }
    if (page > 1) {
      const itemsHeight = 400;
      const gap = 48;
      setTimeout(() => {
        window.scrollBy({
          top: itemsHeight + gap,
          behavior: 'smooth',
        });
      }, 350);
    }
  }, [page, dispatch, openFilter, keyCars.length]);

  return (
    <div>
      {/* <FormFilter /> */}

      <ul className={css.carListWrapper}>
        {keyCars?.map((car) => (
          <li key={car.id}>
            <CarItems
              car={car}
              onToggle={() => handleToggleFavorite(car.id)}
              isFavorite={Array.isArray(favorite) && favorite.includes(car.id)}
            />
          </li>
        ))}
      </ul>
      {!error && isLoading ? (
        <div className={css.loaderList}>
          <Loader />
        </div>
      ) : (
        page < totalPages && (
          <div className={css.loaderList}>
            <Button
              type="button"
              variant="transparent"
              className={css.moreBtn}
              onClick={handleMore}
            >
              Load more
            </Button>
          </div>
        )
      )}
    </div>
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
//     const itemsHeight = 276;
//     const rows = 2;
//     const gap = 90;
//     window.scrollBy({
//       top: itemsHeight * rows + gap,
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
