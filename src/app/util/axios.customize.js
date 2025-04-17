import axios from "axios";
import { getSession } from "next-auth/react";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL 
});

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
  // Get the session
  const session = await getSession();
  
  // Add the token to the request if it exists
  if (session?.jwt) {
    config.headers.Authorization = `Bearer ${session.jwt}`;
  }
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lies within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response && response.data) return response.data;
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error && error.response && error.response.data) return error.response.data;
  return Promise.reject(error);
});

export default instance;