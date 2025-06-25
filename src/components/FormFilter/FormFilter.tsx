import { FormEvent, useEffect, useMemo, useState } from 'react';
import { InputCustomText } from '../ui/InputCustom/InputCustom';
import * as carsSelect from '../../redux/cars/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, fetchCarsBrand } from '../../redux/cars/operations';
import { CustomSelect } from '../ui/CustomSelect/CustomSelect';
import * as filtersSlice from '../../redux/filters/slice';
import Button from '../ui/Button/Button';
import css from './FormFilter.module.css';
import { selectFilter, selectOpenFilter } from '../../redux/filters/selectors';
import { setPage } from '../../redux/cars/slice';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '../ui/hooks.ts';
import { Filters } from '../../types.ts';
import { AppDispatch } from '../../redux/store.ts';

export interface LocalFilter {
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
}

// interface GlobalFilter {
//   globalFilter: Filters;
// }

const FormFilter = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const openFilter = useSelector(selectOpenFilter);
  const optionBrand = useSelector(carsSelect.selectBrands) ?? [];

  const cars = useSelector(carsSelect.selectCars);
  const globalFilter = useSelector(selectFilter);
  const page = useSelector(carsSelect.selectPage);
  // const optionBrand = typeof optionBrandState === 'string';

  const [localFilter, setLocalFilter] = useState<LocalFilter | null>(null);

  const handleChange = (name: keyof LocalFilter, value: string) => {
    setLocalFilter((prev) => ({
      ...prev,
      [name]: name.includes('Mileage')
        ? Number(value.replace(/\D/g, '')) || ''
        : value || '',
    }));
  };

  // const openedFilterForm = () => {
  //   if (!openFilter) {
  //     dispatch(setOpenFilter());
  //   }
  // };

  // const closedFilterForm = () => {
  //   if (openFilter) {
  //     dispatch(setOpenFilter());
  //   }
  // };

  // submit form
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setPage(1));
    if (!localFilter) {
      dispatch(filtersSlice.resetFilters());
      return;
    }
    dispatch(filtersSlice.setFilter(localFilter as string[]));
    dispatch(fetchCars({ page, ...localFilter }));
    //   if (localFilter) {
    //     //   dispatch(filtersSlice.setFilter(localFilter));
    //     //   dispatch(fetchCars({ page, ...localFilter }));
    //
    //     //   if (cars?.length !== 0) {
    //     //     dispatch(filtersSlice.setCloseFilter());
    //     //   }
    //     //
    //     //   return;
    //     // }
  };

  // fetch brands
  useEffect(() => {
    dispatch(fetchCarsBrand());
  }, [dispatch]);

  // generate price
  const optionPrice = useMemo(() => {
    const number: string[] = [];
    for (let i = 20; i <= 130; i += 10) {
      number.push(i.toString());
    }
    return number;
  }, []);

  // fetch cars
  useEffect(() => {
    if (location.pathname === '/catalog') {
      dispatch(fetchCars({ page, ...globalFilter }));
    }
  }, [page, globalFilter, dispatch, location.pathname]);

  useEffect(() => {
    if (cars?.length !== 0) {
      dispatch(filtersSlice.setCloseFilter());
    } else {
      dispatch(filtersSlice.setOpenFilter());
    }
  }, [cars?.length, dispatch]);

  // reset all filters
  const reset = () => {
    setLocalFilter(null);
    dispatch(filtersSlice.resetFilters());
    dispatch(setPage(1));
    setTimeout(() => {
      window.scrollTo({
        top: -window.innerHeight,
        behavior: 'smooth',
      });
    }, 250);
  };

  return (
    <form
      className={clsx(css.formWrapper, openFilter && css.openedFilter)}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        name={'brand'}
        className={css.selectBrand}
        placeholder={'Choose a brand'}
        labelText={'Car brand'}
        options={optionBrand}
        onChange={(name, val) => handleChange(name as keyof LocalFilter, val)}
        value={localFilter?.brand ?? ''}
      />

      <CustomSelect
        name={'rentalPrice'}
        className={css.selectPrice}
        placeholder={'Choose a price'}
        labelText={'Price/ 1 hour'}
        options={optionPrice}
        onChange={(name, val) => handleChange(name as keyof LocalFilter, val)}
        value={localFilter?.rentalPrice ?? ''}
      />
      <div className={css.inputWrapper}>
        <InputCustomText
          name={'minMileage'}
          className={css.inputFrom}
          classNameLabel={css.labelFrom}
          classNameLabelText={css.labelText}
          labelText="Car mileage / km"
          placeholder="From"
          toFilter={
            localFilter?.minMileage
              ? `From ${Number(localFilter?.minMileage).toLocaleString(
                  'en-US',
                )}`
              : ''
          }
          handleChange={(name, val) =>
            handleChange(name as keyof LocalFilter, val)
          }
        />
        <InputCustomText
          name="maxMileage"
          classNameLabel={css.labelTo}
          className={css.inputTo}
          classNameLabelText={css.labelText}
          labelText="Car mileage / km"
          placeholder="To"
          toFilter={
            localFilter?.maxMileage
              ? `To ${Number(localFilter?.maxMileage).toLocaleString('en-US')}`
              : ''
          }
          handleChange={(name, val) =>
            handleChange(name as keyof LocalFilter, val)
          }
        />
      </div>

      {localFilter ? (
        <Button className={css.btnSubmit} type="submit">
          Search
        </Button>
      ) : (
        <Button
          type="button"
          variant="transparent"
          className={css.resetBtn}
          onClick={reset}
        >
          Reset filters
        </Button>
      )}
    </form>
  );
};

export default FormFilter;
