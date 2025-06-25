import Icon from '../ui/Icon/Icon';
import css from './Description.module.css';
import { CarProps } from '../../types.ts';

export interface Car {
  car: CarProps;
}

const Description = ({ car }: Car) => {
  const city = (city: string): string => {
    if (city?.toLowerCase().trim() === 'kiev') {
      return 'Kyiv';
    }
    return city;
  };

  const img = car?.img ?? 'default-img-url';
  const address = car?.address ?? 'no-address';

  const index = img.split('/').length - 1;
  const idImg = img.split('/')[index].split('-')[0];
  const mileage = Number(car?.mileage).toLocaleString('uk-UA');
  const myCity = city(address.split(',')[1]);
  const country = address.split(',')[2];
  const rentalConditions = car?.rentalConditions;
  const functionalities = car?.functionalities;
  const fuelConsumption = car?.fuelConsumption;
  const rentalPrice = car?.rentalPrice;
  const accessories = car?.accessories;
  const description = car?.description;
  const engineSize = car?.engineSize;
  const brand = car?.brand;
  const model = car?.model;
  const year = car?.year;
  const type = car?.type;

  return (
    <div className={css.descriptionWrapper}>
      <div className={css.titleDescription}>
        <h1 className={css.title}>
          {brand} {model}, {year}{' '}
          <span className={css.idFromPhoto}>id: {idImg}</span>
        </h1>
        <p className={css.locations}>
          <Icon name={'icon-location'} />
          {myCity}, {country} {`Mileage: ${mileage} km`}
        </p>
        <p className={css.price}>${rentalPrice}</p>
        <p className={css.conditionsItem}>{description}</p>
      </div>
      {/* <div className={css.notes}> */}
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>Rental Conditions:</h3>
        {rentalConditions?.map((opt) => (
          <div key={opt} className={css.conditionsItem}>
            <Icon name={'icon-check-circle'} />
            <p>{opt}</p>
          </div>
        ))}
      </div>
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>Car Specifications:</h3>
        <p className={css.conditionsItem}>
          <Icon name={'icon-calendar'} />
          Year: {year}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={'icon-car'} />
          Type: {type}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={'icon-fuel-pump'} />
          Fuel Consumption: {fuelConsumption}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={'icon-gear'} />
          Engine Size: {engineSize}
        </p>
      </div>
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>
          Accessories and functionalities:
        </h3>
        {accessories?.map((item) => (
          <p key={item} className={css.conditionsItem}>
            <Icon name={'icon-check-circle'} />
            {item}
          </p>
        ))}
        {functionalities?.map((item) => (
          <p key={item} className={css.conditionsItem}>
            <Icon name={'icon-check-circle'} />
            {item}
          </p>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Description;
