// import { CarsState } from '../../types.ts';
import { RootState } from '../store.ts';

// interface RootCarsState {
//   cars: CarsState;
// }

// Pagination
export const selectPage = (state: RootState) => state.cars.page;
export const selectTotalPages = (state: RootState) => state.cars.totalPages;

// Cars data
export const selectCars = (state: RootState) => state.cars.items;
export const selectBrands = (state: RootState) => state.cars.brands;
export const selectSelectedCar = (state: RootState) => state.cars.selectedCar;
export const selectFavorite = (state: RootState) => state.cars.favorite;

// Interfaces state
export const selectError = (state: RootState) => state.cars.error;
export const selectOpenMenu = (state: RootState) => state.cars.isOpenMenu;
export const selectIsLoading = (state: RootState) => state.cars.isLoading;
