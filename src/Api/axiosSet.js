import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAllCars = async (filters) => {
  const response = await axiosInstance.get("/cars", {
    params: { ...filters },
  });
  const data = response.data;
  return data;
};

// fetchAllCars({ page: 2 });

export const fetchByIdCar = async (id) => {
  const response = await axiosInstance.get(`/cars/${id}`);
  const data = response.data;
  return data;
};

export const fetchBrands = async () => {
  const response = await axiosInstance.get("/brands");
  const data = response.data;
  return data;
};
