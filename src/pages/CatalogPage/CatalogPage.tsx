import CarsList from '../../components/CarsList/CarsList.tsx';
import FormFilter from '../../components/FormFilter/FormFilter.tsx';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  return (
    <div className={css.catalogWrapper}>
      <FormFilter />
      <CarsList />
      {/* <FormFilter /> */}
    </div>
  );
};

export default CatalogPage;
