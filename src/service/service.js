import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

publicRequest.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  config.headers = {
    authorization: `Bearer ${token}`,
  };
  return config;
});

export const login = (userData) => {
  return new Promise((resolve, reject) => {
    publicRequest
      .post("login", userData)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const confirmCode = (userData) => {
  return new Promise((resolve, reject) => {
    publicRequest
      .post("login/verif", userData)
      .then((response) => {
        resolve();
        const userData = response.data.user;
        const token = response.data.token;
        localStorage.setItem("user", userData._id);
        localStorage.setItem("token", `Bearer ${token}`);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
