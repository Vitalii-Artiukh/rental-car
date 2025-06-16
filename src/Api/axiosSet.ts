import axios, { AxiosInstance } from 'axios';
import { FetchFiltersType } from '../types.ts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllCars = async ({
  filters,
}: FetchFiltersType): Promise<object> => {
  const response = await axiosInstance.get('/cars', {
    params: { ...filters, limit: 12 },
  });
  // const data = response.data;

  return response.data;
};

export const fetchByIdCar = async (id: string): Promise<object> => {
  const response = await axiosInstance.get(`/cars/${id}`);
  // const data = response.data;
  return response.data;
};

export const fetchBrand = async (): Promise<object> => {
  const response = await axiosInstance.get('/brands');
  // const data = response.data;
  return response.data;
};
