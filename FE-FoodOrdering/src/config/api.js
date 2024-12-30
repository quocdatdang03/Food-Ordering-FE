import axios from "axios";

export const BASE_API_URL = "http://localhost:7979/api";

// Tạo instance axios chính
export const axiosAPI = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tạo instance axios riêng để refresh token để tránh vòng lặp vô tận
const axiosRefresh = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Taking old session to refresh
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axiosRefresh.post("/auth/refreshToken", {
          refreshToken: refreshToken,
        });

        const newToken = response.data.accessToken;

        // Lưu token mới
        localStorage.setItem("jwtToken", newToken);

        // Cập nhật header cho request gốc
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosAPI(originalRequest);
      } catch (error) {
        // Clear auth data
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login
        if (window.location.pathname !== "/account/login") {
          window.location.href = "/account/login";
        }

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// // Biến để kiểm soát refresh token
// let isRefreshing = false;
// let refreshSubscribers = [];

// // Request Interceptor
// axiosAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("jwtToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosAPI.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Nếu không phải lỗi 401 hoặc request đã retry -> reject luôn
//     if (error.response?.status !== 401 || originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // Đánh dấu request này đã retry
//     originalRequest._retry = true;

//     // Nếu đang trong quá trình refresh -> đợi và retry với token mới
//     if (isRefreshing) {
//       try {
//         const token = await new Promise((resolve, reject) => {
//           refreshSubscribers.push({ resolve, reject });
//         });
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axiosAPI(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }

//     // Bắt đầu quá trình refresh
//     isRefreshing = true;

//     try {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         throw new Error("No refresh token available");
//       }

//       const response = await axiosRefresh.post("/auth/refreshToken", {
//         refreshToken: refreshToken,
//       });

//       const newToken = response.data.accessToken;

//       // Lưu token mới
//       localStorage.setItem("jwtToken", newToken);

//       // Cập nhật header cho request gốc
//       originalRequest.headers.Authorization = `Bearer ${newToken}`;

//       // Thông báo cho tất cả các subscribers
//       refreshSubscribers.forEach(({ resolve }) => resolve(newToken));
//       refreshSubscribers = [];

//       return axiosAPI(originalRequest);
//     } catch (refreshError) {
//       // Nếu refresh thất bại -> reject tất cả subscribers và clear auth
//       refreshSubscribers.forEach(({ reject }) => reject(refreshError));
//       refreshSubscribers = [];

//       // Clear auth data
//       localStorage.removeItem("jwtToken");
//       localStorage.removeItem("refreshToken");

//       // Redirect to login
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/account/login";
//       }

//       return Promise.reject(refreshError);
//     } finally {
//       isRefreshing = false;
//     }
//   }
// );

// Hàm helper để kiểm tra token hết hạn
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expiryTime;
  } catch {
    return true;
  }
};

// Hàm setup axios instance với token mới
export const setupAxiosInterceptors = (token) => {
  if (token) {
    axiosAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosAPI.defaults.headers.common["Authorization"];
  }
};
