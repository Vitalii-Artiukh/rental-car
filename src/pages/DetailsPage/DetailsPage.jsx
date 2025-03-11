import { useParams } from "react-router-dom";
import Details from "../../components/Details/Details";
import css from "./DetailsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorIsLoading,
  selectorSelectedCar,
} from "../../redux/cars/selectors";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/cars/operations";

const DetailsPage = () => {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const isLoading = useSelector(selectorIsLoading);

  // useEffect(() => {
  //   dispatch(fetchCarById(id));
  // }, [dispatch, id]);

  return (
    <div>
      <Details />
    </div>
  );
};

export default DetailsPage;
