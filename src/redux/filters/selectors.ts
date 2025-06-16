import { FiltersState } from '../../types.ts';

interface RootFiltersState {
  filters: FiltersState;
}

export const selectFilter = (state: RootFiltersState) => state.filters.filter;
export const selectError = (state: RootFiltersState) => state.filters.error;
export const selectOpenFilter = (state: RootFiltersState) =>
  state.filters.isOpenFilter;
