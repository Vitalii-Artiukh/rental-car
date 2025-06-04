import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllCars, fetchByIdCar, fetchBrand } from '../../Api/axiosSet';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',

  async ({ ...filters }, thunkApi) => {
    try {
      const data = await fetchAllCars({ filters });
      return { cars: data.cars, totalPages: data.totalPages };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',

  async (cardId, thunkApi) => {
    try {
      const data = await fetchByIdCar(cardId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchCarsBrand = createAsyncThunk(
  'filters/fetchFilters',

  async (_, thunkApi) => {
    try {
      const data = await fetchBrand();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
