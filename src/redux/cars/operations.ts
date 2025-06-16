import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCars, fetchByIdCar, fetchBrand } from '../../Api/axiosSet';
import { Filters } from '../../types.ts';

export interface Data {
  cars?: Promise<object>[];
  totalCars?: number;
  totalPages?: number;
  page?: number;
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',

  async ({ ...filters }: Filters, thunkApi) => {
    try {
      const data: Data = await fetchAllCars({ filters });
      console.log(data);
      return { cars: data.cars, totalPages: data.totalPages };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',

  async (cardId: string, thunkApi) => {
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
