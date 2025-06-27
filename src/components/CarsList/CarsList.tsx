import { useDispatch, useSelector } from 'react-redux';
import { JSX, useEffect, useMemo } from 'react';
import * as carsSelect from '../../redux/cars/selectors';
import { setPage, favoriteToggle } from '../../redux/cars/slice';
import CarItems from '../CarItems/CarItems';
import Button from '../ui/Button/Button';
import css from './CarsList.module.css';
import Loader from '../ui/Loader/Loader';
import { selectOpenFilter } from '../../redux/filters/selectors';
import { CarProps } from '../../types.ts';

const CarsList = (): JSX.Element => {
  const dispatch = useDispatch();
  const openFilter = useSelector(selectOpenFilter);
  const cars = useSelector(carsSelect.selectCars);
  const favorite = useSelector(carsSelect.selectFavorite);
  const page = useSelector(carsSelect.selectPage);
  const totalPages = useSelector(carsSelect.selectTotalPages);
  const isLoading = useSelector(carsSelect.selectIsLoading);
  const error = useSelector(carsSelect.selectError);

  const handleToggleFavorite = (id: string) => {
    if (!id) return;
    dispatch(favoriteToggle(id));
  };

  const isLoadMore =
    typeof page === 'number' &&
    typeof totalPages === 'number' &&
    page < totalPages;

  const handleMore = () => {
    if (typeof page !== 'number') return;
    dispatch(setPage(page + 1));
  };

  // array with unique keys
  const keyCars = useMemo(
    () =>
      Array.from(new Map(cars?.map((car: CarProps) => [car.id, car])).values()),
    [cars],
  );

  useEffect(() => {
    if (typeof page !== 'number') return;
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
        {keyCars.map((car: CarProps) => (
          <li key={car.id}>
            <CarItems
              car={car}
              onToggle={() => handleToggleFavorite(car.id!)}
              isFavorite={
                Array.isArray(favorite) && favorite?.includes(car.id!)
              }
            />
          </li>
        ))}
      </ul>
      {!error && isLoading ? (
        <div className={css.loaderList}>
          <Loader />
        </div>
      ) : (
        isLoadMore && (
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
