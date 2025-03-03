import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllCars, fetchByIdCar, fetchBrands } from "../../Api/axiosSet";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",

  async ({ filters = {} }, thunkApi) => {
    try {
      const data = await fetchAllCars(filters);
      console.log(data);
      return { cars: data.cars, totalPages: data.totalPages };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchById",

  async (cardId, thunkApi) => {
    try {
      const data = await fetchByIdCar(cardId);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchBrand = createAsyncThunk(
  "filters/fetchFilters",
  async (_, thunkAPI) => {
    try {
      const data = await fetchBrands();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
