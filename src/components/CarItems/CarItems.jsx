import Button from "../ui/Button/Button";
import css from "./CarItems.module.css";
import Icon from "../ui/Icon/Icon";
import clsx from "clsx";

const CarItems = ({ car, onToggle, isFavorite }) => {
  const city = (city) => {
    if (city?.toLowerCase().trim() === "kiev") {
      return "Kyiv";
    }
    return city;
  };
  const country = car?.address.split(",")[2];
  const mileage = Number(car?.mileage).toLocaleString("uk-UA");

  return (
    <div className={css.carItemsWrapper}>
      <button className={css.heartBtn} type="button" onClick={onToggle}>
        <Icon
          name={isFavorite ? "icon-active" : "icon-default"}
          className={clsx(isFavorite ? css.iconFavorites : css.iconHeart)}
        />
      </button>

      <img
        className={css.imgCar}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />
      <div className={css.titleItem}>
        <p>
          {car.brand} <span className={css.colorBlue}>{car.model}, </span>
          {car.year}
        </p>
        <p style={{ marginLeft: "auto" }}>{`$${car.rentalPrice}`}</p>
      </div>
      <div className={css.addressItem}>
        <p className={css.city}>{city(car?.address.split(",")[1])}</p>
        <p className={css.country}>{country}</p>
        <p className={css.company}>{car.rentalCompany}</p>
      </div>
      <div className={css.lastString}>
        <p className={css.city}>{car.type}</p>
        <p className={css.country}>{mileage} km</p>
      </div>
      <Button
        variant="long"
        type="button"
        className={css.readMoreBtn}
        to={`/details/${car.id}`}
      >
        Read more
      </Button>
    </div>
  );
};

export default CarItems;

// const ItemsCar = ({ car, isFavorite, onToggle }) => {
//   const navigate = useNavigate();
//   const addressParts = car.address.split(", ");
//   const city = addressParts[1];
//   const country = addressParts[2];
//   const carType = car.type;
//   const formatCarType =
//     carType.charAt(0).toUpperCase() + carType.slice(1).toLowerCase();
//   const carModel = car.model.split("-").join(" ").split(" ");
//   let modifiedCarModal;
//   if (carModel.length === 1) {
//     modifiedCarModal = carModel[0];
//   } else {
//     modifiedCarModal = `${carModel[0]}  ${carModel[1]}`;
//   }

//   const handleClickBtn = () => {
//     navigate(`/catalog/${car.id}`);
//   };

//   return (
//     <div className={css.card}>
//       <div className={css.imageContainer}>
//         <img src={car.img} alt={car.description} className={css.img} />
//         <button onClick={onToggle} type="button" className={css.btnIcon}>
//           {/* <HeartIcon isFavorite={isFavorite} /> */}
//         </button>
//       </div>
//       <div className={css.wrapperTitle}>
//         <p className={css.title}>
//           {car.brand} <span className={css.model}>{modifiedCarModal}</span>,
//           {car.year}
//         </p>
//         <p className={css.title}>{car.rentalPrice} $</p>
//       </div>

//       <div className={css.wrapperDetails}>
//         <div className={css.details}>
//           <span className={css.span}>{city}</span>
//           <span className={css.span}>{country}</span>
//           <span className={css.span}>{car.rentalCompany}</span>
//         </div>
//         <div className={css.details}>
//           <span className={css.span}>{formatCarType}</span>
//           <span>{car.mileage.toLocaleString("uk-UA")} km</span>
//         </div>
//       </div>
//       <Button
//         className={css.btnReadMore}
//         type="button"
//         onClick={handleClickBtn}
//       >
//         Read more
//       </Button>
//     </div>
//   );
// };

// export default ItemsCar;
