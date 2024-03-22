import axios from "axios";

// const baseUrl = "https://ai.kkbt.dev/";
const baseURL = import.meta.env.VITE_CORE_API_BASE_URL;

export const https = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

https.interceptors.request.use((config: any) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-type": "application/json",
  };
  return config;
});

https.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    /* eslint-disable */
    const statusCode = error.response.status;
    if (statusCode === 401) {
      await https
        .get("/refresh-token")
        .then((res: any) => {
          res.data.data.token &&
            localStorage.setItem("token", res.data.data.token);
        })
        .then(() => {
          error.config.headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-type": "application/json",
          };
        });
      return axios.request(error.config);
    }
    /* eslint-enable */
  }
);
