import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

export const axiosInstance = axios.create({ baseURL });
export const axiosInstanceSecure = axios.create({ baseURL });

let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};

axiosInstanceSecure.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const unwrap = (promise) => promise.then((res) => res.data);

export const postUser = (user) => unwrap(axiosInstance.post("/users", user));
export const postBid = (bid) => unwrap(axiosInstanceSecure.post("/bids", bid));
export const getLatestProducts = () =>
  unwrap(axiosInstance.get("/products/latest"));
export const getProductWithId = (id) =>
  unwrap(axiosInstance.get(`/products/${id}`));
export const getBidsWithProductId = (id) =>
  unwrap(axiosInstance.get(`/products/bids/${id}`));
export const getBidsByUserEmail = (email) =>
  unwrap(axiosInstanceSecure.get(`/bids?email=${email}`));
export const deleteBid = (id) =>
  unwrap(axiosInstanceSecure.delete(`/bids/${id}`));
