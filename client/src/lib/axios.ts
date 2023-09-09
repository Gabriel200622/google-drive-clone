import axios from "axios";

export const axiosClient = axios.create({
  baseURL: `${process.env.SERVER_URL}/api`,
  withCredentials: true,
});
