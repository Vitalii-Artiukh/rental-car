import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button/Button';
import Icon from '../ui/Icon/Icon';
import clsx from 'clsx';
import css from './CarItems.module.css';
import { CarItemsProps } from '../../types.ts';
import { FC } from 'react';

const CarItems: FC<CarItemsProps> = ({ car, onToggle, isFavorite }) => {
  const navigate = useNavigate();
  const city = (city: string) => {
    if (city?.toLowerCase().trim() === 'kiev') {
      return 'Kyiv';
    }
    return city;
  };
  const country = car?.address.split(',')[2];
  const mileage = Number(car?.mileage).toLocaleString('uk-UA');

  return (
    <div className={css.carItemsWrapper}>
      <button className={css.heartBtn} type="button" onClick={onToggle}>
        <Icon
          name={isFavorite ? 'icon-active' : 'icon-default'}
          className={clsx(isFavorite ? css.iconFavorites : css.iconHeart)}
        />
      </button>

      <img
        className={css.imgCar}
        src={car?.img}
        alt={`${car?.brand} ${car?.model}`}
      />
      <div className={css.titleItem}>
        <p>
          {car?.brand} <span className={css.colorBlue}>{car?.model}, </span>
          {car?.year}
        </p>
        <p style={{ marginLeft: 'auto' }}>{`$${car?.rentalPrice}`}</p>
      </div>
      <div className={css.addressItem}>
        <p className={css.city}>{city(car?.address.split(',')[1])}</p>
        <p className={css.country}>{country}</p>
        <p className={css.company}>{car?.rentalCompany}</p>
      </div>
      <div className={css.lastString}>
        <p className={css.city}>{car?.type}</p>
        <p className={css.country}>{mileage} km</p>
      </div>
      <Button
        variant="long"
        type="button"
        className={css.readMoreBtn}
        onClick={() => navigate(`/details/${car?.id}`)}
      >
        Read more
      </Button>
    </div>
  );
};

export default CarItems;
