import { useSelector } from 'react-redux';
import Photo from '../Photo/Photo';
import css from './Details.module.css';
import * as carsSelect from '../../redux/cars/selectors';
import { useEffect } from 'react';
import Description from '../Description/Description';
import FormOrder from '../FormOrder/FormOrder';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../redux/cars/operations';
import { useAppDispatch } from '../ui/hooks.ts';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const car = useSelector(carsSelect.selectSelectedCar);
  // const IsLoading = useSelector(carsSelect.selectIsLoading);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) {
    return null; // або компонент завантаження
  }

  return (
    <div className={css.detailWrapper}>
      <div className={css.photoFormWrapper}>
        <Photo car={car} />
        <FormOrder />
      </div>
      <div className={css.descriptionWrapper}>
        <Description car={car} />
      </div>
    </div>
  );
};

export default Details;
