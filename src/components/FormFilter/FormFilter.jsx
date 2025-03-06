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

const FormFilter = () => {
  const dispatch = useDispatch();
  const optionBrand = useSelector(selectorBrands);
  // console.log(optionBrand);

  const [openSelect, setOpenSelect] = useState(null);

  const [localFilters, setLocalFilters] = useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenSelect(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openSelect]);

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
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOpenSelect(null);
  //   dispatch(setFilter(localFilters));
  //   dispatch(fetchCars({ page: 1, filters: localFilters }));
  // };

  const optionPrice = [30, 40, 50, 60, 70, 80];
  return (
    <form>
      <CustomSelect
        placeholder={"Choose a brand"}
        name={"Car brand"}
        options={optionBrand}
      />
      <CustomSelect
        placeholder={"Choose a price"}
        name={"Price/ 1 hour"}
        options={optionPrice}
      />
      {/* <InputCustomSelector
        placeholder={"Choose a brand"}
        // htmlFor={"brand"}
        name={"Car brand"}
        list={optionBrand}
        isOpenSelect={optionBrand === "brand"}
        // onChange={(val) => handleChange("brand", val)}
      />
      <InputCustomSelector
        placeholder={"Choose a price"}
        htmlFor={"price"}
        name={"Price/ 1 hour"}
        list={optionPrice}
        formatValue={(val) => (val ? `To $${val}` : "Choose a price")}
        // onChange={(val) => handleChange("brand", val)}
      /> */}
      <InputCustomText />
      <InputCustomText />
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
