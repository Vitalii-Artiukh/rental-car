import CarsList from '../../components/CarsList/CarsList';
import FormFilter from '../../components/FormFilter/FormFilter';
import css from './CatalogPage.module.css';
import { JSX } from 'react';

const CatalogPage = (): JSX.Element => {
  return (
    <div className={css.catalogWrapper}>
      <FormFilter />
      <CarsList />
      {/* <FormFilter /> */}
    </div>
  );
};

export default CatalogPage;
