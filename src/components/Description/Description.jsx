import Icon from "../ui/Icon/Icon";
import css from "./Description.module.css";

const Description = ({ car }) => {
  const city = (city) => {
    if (city?.toLowerCase().trim() === "kiev") {
      return "Kyiv";
    }
    return city;
  };
  const country = car?.address.split(",")[2];
  const mileage = Number(car?.mileage).toLocaleString("uk-UA");
  const index = car?.img.split("/").length - 1;
  const idImg = car?.img.split("/")[index].split("-")[0];

  return (
    <div className={css.descriptionWrapper}>
      <div className={css.titleDescription}>
        <h1 className={css.title}>
          {car?.brand} {car?.model}, {car?.year}{" "}
          <span className={css.idFromPhoto}>id: {idImg}</span>
        </h1>
        <p className={css.locations}>
          <Icon name={"icon-location"} />
          {city(car?.address.split(",")[1])}, {country}{" "}
          {`Mileage: ${mileage} km`}
        </p>
        <p className={css.price}>${car?.rentalPrice}</p>
        <p className={css.conditionsItem}>{car?.description}</p>
      </div>
      {/* <div className={css.notes}> */}
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>Rental Conditions:</h3>
        {car?.rentalConditions.map((opt) => (
          <div key={opt} className={css.conditionsItem}>
            <Icon name={"icon-check-circle"} />
            <p>{opt}</p>
          </div>
        ))}
      </div>
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>Car Specifications:</h3>
        <p className={css.conditionsItem}>
          <Icon name={"icon-calendar"} />
          Year: {car?.year}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={"icon-car"} />
          Type: {car?.type}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={"icon-fuel-pump"} />
          Fuel Consumption: {car?.fuelConsumption}
        </p>
        <p className={css.conditionsItem}>
          <Icon name={"icon-gear"} />
          Engine Size: {car?.engineSize}
        </p>
      </div>
      <div className={css.conditions}>
        <h3 className={css.conditionsTitle}>
          Accessories and functionalities:
        </h3>
        {car?.accessories.map((item) => (
          <p key={item} className={css.conditionsItem}>
            <Icon name={"icon-check-circle"} />
            {item}
          </p>
        ))}
        {car?.functionalities.map((item) => (
          <p key={item} className={css.conditionsItem}>
            <Icon name={"icon-check-circle"} />
            {item}
          </p>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Description;
