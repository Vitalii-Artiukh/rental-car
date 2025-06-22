import css from './Photo.module.css';
import { CarProps } from '../../types.ts';
import { FC } from 'react';

interface PhotoProps {
  car: CarProps;
}

const Photo: FC<PhotoProps> = ({ car }) => {
  return <img src={car?.img} alt={car?.description} className={css.imgCar} />;
};

export default Photo;
