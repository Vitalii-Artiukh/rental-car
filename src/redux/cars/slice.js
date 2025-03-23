import { createSlice } from "@reduxjs/toolkit";
import * as operations from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleReject = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
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
  name: "cars",
  initialState: INITIAL_STATE,
  reducers: {
    favoriteToggle(state, action) {
      const carId = action.payload;
      const index = state.favorite.indexOf(carId);
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
      state.isOpenMenu = !state.isOpenMenu;
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

export const reducerCars = carSlice.reducer;
export const { favoriteToggle, setPage, setOpenMenu } = carSlice.actions;
