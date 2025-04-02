import { useEffect, useState } from "react";
import { InputCustomText } from "../ui/InputCustom/InputCustom";
import * as carsSelect from "../../redux/cars/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, fetchCarsBrand } from "../../redux/cars/operations";
import { CustomSelect } from "../ui/CustomSelect/CustomSelect";
import {
  resetFilters,
  setCloseFilter,
  setFilter,
  setOpenFilter,
} from "../../redux/filters/slice";
import Button from "../ui/Button/Button";
import css from "./FormFilter.module.css";
import {
  selectorFilter,
  selectorOpenFilter,
} from "../../redux/filters/selectors";
import { setPage } from "../../redux/cars/slice";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const FormFilter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const openFilter = useSelector(selectorOpenFilter);
  const optionBrand = useSelector(carsSelect.selectorBrands);
  const cars = useSelector(carsSelect.selectorCars);
  const globalFilter = useSelector(selectorFilter);
  const page = useSelector(carsSelect.selectorPage);

  const [localFilter, setLocalFilter] = useState(null);

  const handleChange = (name, value) => {
    setLocalFilter((prev) => ({
      ...prev,
      [name]: name.includes("Mileage")
        ? Number(value.replace(/\D/g, "")) || ""
        : value || "",
    }));
  };

  const openedFilterForm = () => {
    if (!openFilter) {
      dispatch(setOpenFilter());
    }
  };

  const closedFilterForm = () => {
    if (openFilter) {
      dispatch(setOpenFilter());
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPage(1));
    if (localFilter) {
      dispatch(setFilter(localFilter));
      dispatch(fetchCars({ page, ...localFilter }));

      if (cars.length !== 0) {
        dispatch(setCloseFilter());
      }

      return;
    } else {
      dispatch(resetFilters());
    }
  };

  // fetch brands
  useEffect(() => {
    dispatch(fetchCarsBrand());
  }, [dispatch]);

  // generate price
  const generate = () => {
    let number = [];
    for (let i = 20; i <= 130; i += 10) {
      number.push(i);
    }
    return number;
  };
  const optionPrice = generate();

  // fetch cars
  useEffect(() => {
    if (location.pathname === "/catalog") {
      dispatch(fetchCars({ page, ...globalFilter }));
    }
  }, [page, globalFilter, dispatch, location.pathname]);

  useEffect(() => {
    if (cars.length !== 0) {
      dispatch(setCloseFilter());
    } else {
      dispatch(setOpenFilter());
    }
  }, [cars.length, dispatch]);

  // reset all filters
  const reset = () => {
    setLocalFilter(null);
    dispatch(resetFilters());
    dispatch(setPage(1));
    setTimeout(() => {
      window.scrollTo({
        top: -window.innerHeight,
        behavior: "smooth",
      });
    }, 250);
  };

  return (
    <form
      className={clsx(css.formWrapper, openFilter && css.openedFilter)}
      onSubmit={handleSubmit}
    >
      <CustomSelect
        name={"brand"}
        className={css.selectBrand}
        placeholder={"Choose a brand"}
        labelText={"Car brand"}
        options={optionBrand}
        onChange={(name, val) => handleChange(name, val)}
        value={localFilter?.brand}
      />

      <CustomSelect
        name={"rentalPrice"}
        className={css.selectPrice}
        placeholder={"Choose a price"}
        labelText={"Price/ 1 hour"}
        options={optionPrice}
        onChange={(name, val) => handleChange(name, val)}
        value={localFilter?.rentalPrice}
      />
      <div className={css.inputWrapper}>
        <InputCustomText
          name={"minMileage"}
          className={css.inputFrom}
          classNameLabel={css.labelFrom}
          classNameLabelText={css.labelText}
          labelText="Car mileage / km"
          placeholder="From"
          toFilter={
            localFilter?.minMileage
              ? `From ${Number(localFilter?.minMileage).toLocaleString(
                  "en-US"
                )}`
              : ""
          }
          handleChange={(name, val) => handleChange(name, val)}
        />
        <InputCustomText
          name={"maxMileage"}
          classNameLabel={css.labelTo}
          className={css.inputTo}
          placeholder="To"
          toFilter={
            localFilter?.maxMileage
              ? `To ${Number(localFilter?.maxMileage).toLocaleString("en-US")}`
              : ""
          }
          handleChange={(name, val) => handleChange(name, val)}
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

// import { useDispatch, useSelector } from "react-redux";
// import { fetchCarsBrand, fetchCars } from "../../redux/car/operations";
// import { setFilter } from "../../redux/filter/slice";
// import { useEffect, useRef, useState } from "react";
// import { selectorBrands } from "../../redux/car/selectors";

// import CustomSelector from "../ui/CustomSelector/CustomSelector";
// import Button from "../ui/Button/Button";
// import css from "./FilterForm.module.css";

// const FilterForm = () => {
//   const dispatch = useDispatch();
//   const filterRef = useRef(null);

//   const allBrands = useSelector(selectorBrands);

//   const [openSelector, setOpenSelector] = useState(null);
//   const [localFilters, setLocalFilters] = useState({
//     brand: "",
//     rentalPrice: "",
//     minMileage: "",
//     maxMileage: "",
//   });

//   useEffect(() => {
//     dispatch(fetchCarsBrand());
//   }, [dispatch]);

//   //Закриття селекторів
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (filterRef.current && !filterRef.current.contains(e.target)) {
//         setOpenSelector(null);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [setOpenSelector]);

//   const generatePrices = () => {
//     let price = [];
//     for (let i = 30; i <= 100; i += 10) {
//       price.push(i);
//     }
//     return price;
//   };

//   const prices = generatePrices();

//   // Опции для кастомного селекта
//   const brandOptions = allBrands.map((brand) => ({
//     value: brand,
//     label: brand,
//   }));
//   const priceOptions = prices.map((price) => ({
//     value: price,
//     label: price,
//   }));

//   const handleChange = (name, value) => {
//     setLocalFilters((prev) => ({
//       ...prev,
//       [name]: name.includes("Mileage")
//         ? Number(value.replace(/\D/g, "")) || ""
//         : value || "",
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setOpenSelector(null);
//     dispatch(setFilter(localFilters));
//     dispatch(fetchCars({ page: 1, filters: localFilters }));
//   };

//   return (
//     <form className={css.form} onSubmit={handleSubmit} ref={filterRef}>
//       <div>
//         <p className={css.labelText}>Car brand</p>
//         <CustomSelector
//           options={brandOptions}
//           id="brand"
//           value={localFilters.brand}
//           onChange={(val) => handleChange("brand", val)}
//           placeholder="Choose a brand"
//           isOpen={openSelector === "brand"}
//           setOpenSelector={setOpenSelector}
//         />
//       </div>
//       <div>
//         <p className={css.labelText}>Price / 1hour</p>
//         <CustomSelector
//           options={priceOptions}
//           id="price"
//           value={localFilters.rentalPrice}
//           onChange={(val) => handleChange("rentalPrice", val)}
//           placeholder="Choose a price"
//           formatValue={(val) => (val ? `To $${val}` : "Choose a price")}
//           isOpen={openSelector === "price"}
//           setOpenSelector={setOpenSelector}
//         />
//       </div>
//       <div>
//         <p className={css.labelText}>Car mileage / km</p>
//         <div className={css.wrapInputMileage}>
//           <input
//             className={`${css.input} ${css.inputMileage}`}
//             type="text"
//             name="minMileage"
//             value={
//               localFilters.minMileage
//                 ? `From ${Number(localFilters.minMileage).toLocaleString(
//                     "en-US"
//                   )}`
//                 : "From "
//             }
//             onChange={(e) => handleChange("minMileage", e.target.value)}
//           />
//           <input
//             className={`${css.input} ${css.inputMileage}`}
//             type="text"
//             name="maxMileage"
//             value={
//               localFilters.maxMileage
//                 ? `To ${Number(localFilters.maxMileage).toLocaleString(
//                     "en-US"
//                   )}`
//                 : "To "
//             }
//             onChange={(e) => handleChange("maxMileage", e.target.value)}
//           />
//         </div>
//       </div>
//       <Button className={css.btnSearch} type="submit">
//         Search
//       </Button>
//     </form>
//   );
// };

// export default FilterForm;
