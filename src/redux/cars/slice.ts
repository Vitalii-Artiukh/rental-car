import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as operations from './operations';
import { CarsState } from '../../types.ts';

// interface FavoriteSlice {
//   state: Pick<CarsState, 'favorite'>;
// }

const handlePending = (state: CarsState): void => {
  state.isLoading = true;
  state.error = null;
};

const handleReject = (
  state: CarsState,
  action: PayloadAction<string[]>,
): void => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE: CarsState = {
  items: [],
  brands: [],
  favorite: [],
  selectedCar: null,
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
  isOpenMenu: false,
};

const carSlice = createSlice({
  name: 'cars',
  initialState: INITIAL_STATE,
  reducers: {
    favoriteToggle(state, action: PayloadAction<string>): void {
      // const favorites = state.favorite;
      if (!action.payload || action.payload === '') return;
      const carId = action.payload;
      // if (!carId || carId === '') return;
      const index = state.favorite.indexOf(carId);
      // const index = favorites.indexOf(carId);
      if (index !== -1) {
        state.favorite.splice(index, 1);
      } else {
        state.favorite.push(carId);
      }
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setOpenMenu(state) {
      state.isOpenMenu = true;
    },
    setCloseMenu(state) {
      state.isOpenMenu = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(operations.fetchCars.pending, handlePending)
      .addCase(operations.fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPages = action.payload.totalPages;
        if (action.meta.arg.page === 1) {
          state.items = [];
        }
        state.items = [...state.items, ...action.payload.cars];
      })
      .addCase(operations.fetchCars.rejected, handleReject)
      .addCase(operations.fetchCarById.pending, handlePending)
      .addCase(operations.fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(operations.fetchCarById.rejected, handleReject)
      .addCase(operations.fetchCarsBrand.pending, handlePending)
      .addCase(operations.fetchCarsBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.error = null;
      })
      .addCase(operations.fetchCarsBrand.rejected, handleReject),
});

export const carsReducer = carSlice.reducer;
export const { favoriteToggle, setPage, setOpenMenu, setCloseMenu } =
  carSlice.actions;
