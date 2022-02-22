import axios from "axios";

const dbUrl = process.env.REACT_APP_DATA_BASE_URL;
export const axiosReq = axios.create({
  baseURL: dbUrl,
});
axiosReq.interceptors.request.use((config) => {
  const TokenData = JSON.parse(localStorage.getItem("token"));
  config.headers = {
    authorization: `Bearer ${TokenData?.value}`,
  };
  return config;
});

export const curentUser = JSON.parse(localStorage.getItem("User"));
export const login = (userData) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post("/api/login", userData)
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
    axiosReq
      .post("/api/login/verif", userData)
      .then((response) => {
        resolve();
        const userData = response.data.user;
        const now = new Date();
        const ttl = 86400000;
        const token = {
          value: response.data.token,
          expiry: now.getTime() + ttl,
        };
        localStorage.setItem("User", JSON.stringify(userData));
        localStorage.setItem("user", userData._id);
        localStorage.setItem("token", JSON.stringify(token));
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getRoom = () => {
  return new Promise((resolve, reject) => {
    axiosReq
      .get("/api/room")
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const getMessages = (id) => {
  return new Promise((resolve, reject) => {
    id &&
      axiosReq
        .get(`/api/message/${id}`)
        .then((data) => {
          resolve(data.data);
        })
        .catch((error) => reject(error.response));
  });
};

export const sendMessages = (msg, roomId) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post(`/api/message`, {
        roomId: roomId,
        msg: msg,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const newRoom = (subAdminEmail, romName) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .post(`/api/room`, {
        subAdminEmail: subAdminEmail,
        romName: romName,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const updateRoom = (assistentEmail, roomId) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .put(`/api/room`, {
        assistentEmail: assistentEmail,
        roomId: roomId,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};

export const deleteRoom = (id) => {
  return new Promise((resolve, reject) => {
    axiosReq
      .delete(`/api/room/${id}`)
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => reject(error.response));
  });
};
