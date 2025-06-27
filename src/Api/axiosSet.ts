import axios, { AxiosInstance } from 'axios';
import { CarProps, FetchFiltersType } from '../types.ts';

export interface APIResponse {
  cars: CarProps[];
  totalPages: number;
  totalCars: number;
  page: number;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAllCars = async ({
  filters,
}: FetchFiltersType): Promise<APIResponse> => {
  const response = await axiosInstance.get('/cars', {
    params: { ...filters, limit: 12 },
  });

  return response.data;
};

export const fetchByIdCar = async (id: string): Promise<object> => {
  const response = await axiosInstance.get(`/cars/${id}`);

  return response.data;
};

export const fetchBrand = async (): Promise<object> => {
  const response = await axiosInstance.get('/brands');

  return response.data;
};
