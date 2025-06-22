import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersState } from '../../types.ts';

const initialState: FiltersState = {
  filter: null,
  isOpenFilter: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string[]>) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    resetFilters(state) {
      state.filter = initialState.filter;
    },
    setOpenFilter(state) {
      state.isOpenFilter = true;
    },
    setCloseFilter(state) {
      state.isOpenFilter = false;
    },
  },
});

export const { resetFilters, setFilter, setOpenFilter, setCloseFilter } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
