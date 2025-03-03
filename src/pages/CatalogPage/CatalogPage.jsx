import FormFilter from "../../components/FormFilter/FormFilter";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <div className={css.catalogWrapper}>
      <FormFilter />
    </div>
  );
};

export default CatalogPage;
