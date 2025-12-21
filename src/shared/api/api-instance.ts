import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3333";

export const apiInstance = axios.create({
  baseURL: `${BASE_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
