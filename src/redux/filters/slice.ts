import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  filter: null,
  isOpenFilter: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: INITIAL_STATE,
  reducers: {
    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    resetFilters(state) {
      state.filter = INITIAL_STATE.filter;
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
