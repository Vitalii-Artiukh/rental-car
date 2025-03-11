import { useEffect, useState } from "react";
import { InputCustomText } from "../ui/InputCustom/InputCustom";
import * as carsSelect from "../../redux/cars/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, fetchCarsBrand } from "../../redux/cars/operations";
import { CustomSelect } from "../ui/CustomSelect/CustomSelect";
import { setFilter } from "../../redux/filters/slice";
import Button from "../ui/Button/Button";
import css from "./FormFilter.module.css";
import { selectorFilter } from "../../redux/filters/selectors";
import { setPage } from "../../redux/cars/slice";

const FormFilter = () => {
  const dispatch = useDispatch();
  const optionBrand = useSelector(carsSelect.selectorBrands);
  const globalFilter = useSelector(selectorFilter);
  const page = useSelector(carsSelect.selectorPage);

  const [cleanFilters, setCleanFilters] = useState({});

  const handleChange = (name, value) => {
    const dataValue = (prev) => ({
      ...prev,
      [name]: name.includes("Mileage")
        ? Number(value.replace(/\D/g, "")) || ""
        : value || "",
    });
    dispatch(setFilter(dataValue()));
  };
  // clean filters for fetch cars
  const filtersClean = () => {
    if (globalFilter.brand !== "") {
      setCleanFilters((prev) => ({ ...prev, brand: globalFilter.brand }));
    }
    if (globalFilter.rentalPrice !== "") {
      setCleanFilters((prev) => ({
        ...prev,
        rentalPrice: globalFilter.rentalPrice,
      }));
    }
    if (globalFilter.minMileage !== "") {
      setCleanFilters((prev) => ({
        ...prev,
        minMileage: globalFilter.minMileage,
      }));
    }
    if (globalFilter.maxMileage !== "") {
      setCleanFilters((prev) => ({
        ...prev,
        maxMileage: globalFilter.maxMileage,
      }));
    }
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    filtersClean();
    dispatch(setPage(1));
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
    dispatch(fetchCars({ page, ...cleanFilters }));
  }, [cleanFilters, dispatch, page]);

  // reset all filters
  const resetFilters = () => {
    setCleanFilters({});
    dispatch(
      setFilter({
        brand: "",
        rentalPrice: "",
        minMileage: "",
        maxMileage: "",
      })
    );
    dispatch(setPage(1));
    setTimeout(() => {
      window.scrollTo({
        top: -window.innerHeight,
        behavior: "smooth",
      });
    }, 250);
  };

  return (
    <form className={css.formStopped}>
      <Button
        type="button"
        variant="transparent"
        className={css.resetBtn}
        onClick={resetFilters}
      >
        Reset all filters
      </Button>
      <div className={css.formWrapper}>
        <CustomSelect
          name={"brand"}
          className={css.selectBrand}
          placeholder={"Choose a brand"}
          labelText={"Car brand"}
          options={optionBrand}
          onChange={(name, val) => handleChange(name, val)}
          value={globalFilter.brand}
        />

        <CustomSelect
          name={"rentalPrice"}
          className={css.selectPrice}
          placeholder={"Choose a price"}
          labelText={"Price/ 1 hour"}
          options={optionPrice}
          onChange={(name, val) => handleChange(name, val)}
          value={globalFilter.rentalPrice}
        />
        <InputCustomText
          name={"minMileage"}
          className={css.inputFrom}
          labelText="Car mileage / km"
          placeholder="From"
          toFilter={
            globalFilter?.minMileage
              ? `From ${Number(globalFilter.minMileage).toLocaleString("gb")}`
              : ""
          }
          handleChange={(name, val) => handleChange(name, val)}
        />
        <InputCustomText
          name={"maxMileage"}
          className={css.inputTo}
          placeholder="To"
          toFilter={
            globalFilter?.maxMileage
              ? `To ${Number(globalFilter.maxMileage).toLocaleString("gb")}`
              : ""
          }
          handleChange={(name, val) => handleChange(name, val)}
        />
        <Button className={css.btnSubmit} type="submit" onClick={handleSubmit}>
          Search
        </Button>
      </div>
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
