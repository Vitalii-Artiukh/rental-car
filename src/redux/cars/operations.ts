import { createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { fetchAllCars, fetchByIdCar, fetchBrand } from '../../Api/axiosSet';
import { CarProps, Filters } from '../../types.ts';

export interface Data {
  cars?: Promise<object>[] | CarProps[];
  totalCars?: number;
  totalPages?: number;
  page?: number;
}

interface FetchCarsParams {
  page: number;
  brand: string;
  rentalPrice: number;
  minMileage: number;
  maxMileage: number;
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',

  async ({ ...filters }: Filters, thunkApi) => {
    try {
      const data: Data = await fetchAllCars({ filters });
      return { items: data.cars, totalPages: data.totalPages };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchCarById = createAsyncThunk<CarProps, string>(
  'cars/fetchById',
  async (cardId: string, thunkApi): Promise<CarProps> => {
    try {
      return await fetchByIdCar(cardId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchCarsBrand = createAsyncThunk(
  'filters/fetchFilters',

  async (_, thunkApi) => {
    try {
      return await fetchBrand();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);
