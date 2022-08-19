import axios, { AxiosInstance } from "axios";

const createInstance = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_HOST_API ?? `https://satangcorp.com/api/`,
    timeout: 1000 * 30
  });

export const axiosClient = createInstance();
