import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCars, fetchByIdCar, fetchBrand } from '../../Api/axiosSet';
import { CarProps, Filters } from '../../types.ts';

export interface Data {
  cars?: Promise<object>[] | CarProps[];
  totalCars?: number;
  totalPages?: number;
  page?: number;
}

interface FetchCarsResponse {
  cars: CarProps[];
  totalPages: number;
}

export const fetchCars = createAsyncThunk<
  { items: CarProps[]; totalPages: number },
  Filters
  // {
  //   rejectValue: string | unknown;
  // }
>(
  'cars/fetchCars',

  async (filters: Filters, thunkApi) => {
    try {
      const data = await fetchAllCars({ filters });
      return { items: data.cars, totalPages: data.totalPages };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const fetchCarById = createAsyncThunk<
  CarProps, // Тип успішного результату
  string, // Тип параметра (id)
  {
    // Конфігурація
    rejectValue: string | unknown; // Тип значення помилки
  }
>('cars/fetchById', async (id: string, thunkApi) => {
  try {
    return await fetchByIdCar(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue(error);
  }
});

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
