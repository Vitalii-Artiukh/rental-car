import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  SerializedError,
  AsyncThunk,
} from '@reduxjs/toolkit';
import * as operations from './operations';
import { CarProps, Filters } from '../../types.ts';
import CarsList from '../../components/CarsList/CarsList.tsx';

type PendingAction = ReturnType<AsyncThunk<any, any, any>['pending']>;
type RejectedAction = ReturnType<AsyncThunk<any, any, any>['rejected']>;

interface FetchCarsAction {
  cars: CarProps[];
}

interface FulfilledAction {
  fetchCars: PayloadAction<
    { cars: CarProps[]; totalPages: number },
    string,
    { arg: Filters }
  >;
  fetchCarById: PayloadAction<CarProps>;
  fetchCarsBrand: PayloadAction<string[]>;
}

interface FetchCarsFulfilledAction {
  payload: CarsState;
  type: string;
}

const handlePending = (state: CarsState): void => {
  state.isLoading = true;
  state.error = null;
};

const handleReject = (
  state: CarsState,
  action: PayloadAction<unknown, string, unknown, SerializedError>,
): void => {
  state.isLoading = false;
  state.error = action.error.message || 'Unknown error';
};

export interface CarsState {
  items?: CarProps[];
  brands?: string[];
  favorite?: string[];
  selectedCar?: CarProps | null;
  page?: number;
  totalPages?: number | null | undefined;
  isLoading?: boolean;
  error?: string | null;
  isOpenMenu?: boolean;
}

const initialState = {
  items: [],
  brands: [],
  favorite: [],
  selectedCar: null,
  page: 1,
  totalPages: null,
  isLoading: false,
  error: null,
  isOpenMenu: false,
} satisfies CarsState as CarsState;

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    favoriteToggle(state, action: PayloadAction<string>): void {
      // const favorites = state.favorite;
      if (!action.payload || action.payload === '') return;
      const carId = action.payload;
      // if (!carId || carId === '') return;
      if (!state.favorite) return;
      const index = state.favorite.indexOf(carId);
      // const index = favorites.indexOf(carId);
      if (index !== -1) {
        state.favorite.splice(index, 1);
      } else {
        state.favorite.push(carId);
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setOpenMenu(state) {
      state.isOpenMenu = true;
    },
    setCloseMenu(state) {
      state.isOpenMenu = false;
    },
  },
  extraReducers: (
    builder,
    // : ActionReducerMapBuilder<CarsState>
  ) =>
    builder
      //   fetchCars
      .addCase(operations.fetchCars.pending, handlePending)
      .addCase(
        operations.fetchCars.fulfilled,
        (
          state,
          action: PayloadAction<
            { items: CarProps[]; totalPages: number },
            string,
            {
              arg: Filters;
              requestId: string;
              requestStatus: 'fulfilled';
            }
          >,
        ) => {
          state.isLoading = false;
          state.error = null;
          // const newCars: CarProps = action.payload.cars || [];
          state.totalPages = action.payload.totalPages;
          if (action.meta.arg.page === 1) {
            state.items = [];
          }
          state.items = [
            ...(state.items || []),
            ...(action.payload.items || []),
          ];
        },
      )
      .addCase(operations.fetchCars.rejected, handleReject)
      .addCase(operations.fetchCarById.pending, handlePending)
      .addCase(
        operations.fetchCarById.fulfilled,
        (state, action: PayloadAction<CarProps>) => {
          state.isLoading = false;
          state.selectedCar = action.payload;
        },
      )
      .addCase(operations.fetchCarById.rejected, handleReject)
      .addCase(operations.fetchCarsBrand.pending, handlePending)
      .addCase(
        operations.fetchCarsBrand.fulfilled,
        (state, action: PayloadAction<CarsState>) => {
          state.brands = action.payload as string[];
          state.error = null;
        },
      )
      .addCase(operations.fetchCarsBrand.rejected, handleReject),
});

export const carsReducer = carSlice.reducer;
export const { favoriteToggle, setPage, setOpenMenu, setCloseMenu } =
  carSlice.actions;
