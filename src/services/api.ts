import axios from 'axios';

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api'
    : import.meta.env.NEXT_PUBLIC_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
