import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-rental-api.goit.global/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    limit: 12,
  },
});

export const fetchAllCars = async ({ filters }) => {
  console.log(filters);
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

export const fetchBrand = async () => {
  const response = await axiosInstance.get("/brands");
  const data = response.data;
  return data;
};
