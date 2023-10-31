import axios from "axios";
import { renewToken } from "../api/auth/auth";
import { getObject, storeObject } from "../helpers/asyncStorage";

export const api = axios.create({
  baseURL: "http://localhost:3000", // store in env
});

// Axios interceptor handle access token authentication
api.interceptors.request.use(
  async function (config) {
    const token = await getObject("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Handle refreshToken
// Resource: https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await renewToken();
      // Store access token
      await storeObject("access-token", token.accessToken);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token?.accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
