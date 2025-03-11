import css from "./Photo.module.css";

const Photo = ({ car }) => {
  //   console.log(photo);
  return <img src={car?.img} alt={car?.description} className={css.imgCar} />;
};

export default Photo;
