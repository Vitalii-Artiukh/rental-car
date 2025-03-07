import { useEffect, useRef, useState } from "react";
import {
  InputCustomSelector,
  InputCustomText,
} from "../ui/InputCustom/InputCustom";
import { selectorBrands } from "../../redux/cars/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarsBrand } from "../../redux/cars/operations";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { setFilter } from "../../redux/filters/slice";
import Button from "../ui/Button/Button";
import css from "./FormFilter.module.css";

const FormFilter = () => {
  const dispatch = useDispatch();
  const optionBrand = useSelector(selectorBrands);

  const [localFilters, setLocalFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  console.log(localFilters);

  const handleChange = (name, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: name.includes("Mileage")
        ? Number(value.replace(/\D/g, "")) || ""
        : value || "",
    }));
  };

  useEffect(() => {
    dispatch(fetchCarsBrand());
  }, [dispatch]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOpenSelect(null);
  //   dispatch(setFilter(localFilters));
  //   dispatch(fetchCars({ page: 1, filters: localFilters }));
  // };

  const optionPrice = [30, 40, 50, 60, 70, 80];
  return (
    <form className={css.formWrapper}>
      <CustomSelect
        className={css.selectBrand}
        placeholder={"Choose a brand"}
        name={"Car brand"}
        options={optionBrand}
        onChange={(val) => handleChange("brand", val)}
        value={localFilters.brand}
      />

      <CustomSelect
        className={css.selectPrice}
        placeholder={"Choose a price"}
        name={"Price/ 1 hour"}
        options={optionPrice}
        onChange={(val) => handleChange("rentalPrice", val)}
        formatValue={(val) => (val ? `To $${val}` : "Choose a price")}
        value={localFilters.rentalPrice}
      />
      <InputCustomText className={css.inputFrom} name="Сar mileage / km" />
      <InputCustomText className={css.inputTo} />

      <Button
        className={css.btnSubmit}
        type="submit"
        // onClick={handleSubmit}
      >
        Search
      </Button>
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
