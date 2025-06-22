import { useDispatch, useSelector } from 'react-redux';
import Photo from '../Photo/Photo';
import css from './Details.module.css';
import * as carsSelect from '../../redux/cars/selectors';
import { useEffect } from 'react';
import Description from '../Description/Description';
import FormOrder from '../FormOrder/FormOrder';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../redux/cars/operations';
import { CarProps } from '../../types.ts';
// import { useAppDispatch } from '../ui/hooks.ts';

type Params = {
  id?: string;
};

const Details = () => {
  const { id }: Params = useParams();
  const dispatch = useDispatch();
  const car = useSelector(carsSelect.selectSelectedCar);
  // const IsLoading = useSelector(carsSelect.selectIsLoading);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  return (
    <div className={css.detailWrapper}>
      <div className={css.photoFormWrapper}>
        <Photo car={car} />
        <FormOrder />
      </div>
      <div className={css.descriptionWrapper}>
        <Description car={car as CarProps} />
      </div>
    </div>
  );
};

export default Details;
