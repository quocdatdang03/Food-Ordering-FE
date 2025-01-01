import { axiosAPI } from "../../config/api";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  CLEAR_AUTH_ERROR,
  CLEAR_AUTH_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESEND_CODE_FAILURE,
  RESEND_CODE_REQUEST,
  RESEND_CODE_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from "./ActionType";

export const registerUserAction = (requestData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  try {
    const response = await axiosAPI.post(
      "/auth/register",
      requestData.userData
    );

    const jwtToken = response.data.accessToken;

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {
        registerEmail: requestData.userData.email,
        jwtToken,
        messageSuccess: response.data.message,
      },
    });
    console.log("REGISTER SUCCESS: " + response.data);

    if (response.data && !requestData.isAuthLoading)
      requestData.navigate("/account/verify-email");
  } catch (error) {
    const messageError = error.response.data.message;
    dispatch({ type: REGISTER_USER_FAILURE, payload: messageError });
  }
};

// export const loginUserAction = (requestData) => async (dispatch) => {
//   dispatch({ type: LOGIN_USER_REQUEST });

//   try {
//     const response = await axiosAPI.post("/auth/login", requestData.userData);
//     const jwtToken = response.data.accessToken;

//     // if jwtToken is present -> save it to localStorage
//     if (jwtToken) {
//       localStorage.setItem("jwtToken", jwtToken);
//     }

//     if (response.data.role === "ROLE_CUSTOMER") requestData.navigate("/");

//     if (response.data.role === "ROLE_RESTAURANT_OWNER")
//       requestData.navigate("/admin/restaurants");

//     dispatch({ type: LOGIN_USER_SUCCESS, payload: jwtToken });
//     console.log("LOGIN SUCCESS: ");
//     console.log(response.data);
//   } catch (error) {
//     const messageError = "Username or password is not correct";
//     dispatch({ type: LOGIN_USER_FAILURE, payload: messageError });
//   }
// };

export const loginUserAction = (requestData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    console.log(requestData);
    const response = await axiosAPI.post("/auth/login", requestData.userData);
    const jwtToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    // if jwtToken is present -> save it to localStorage
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (response.data.role === "ROLE_CUSTOMER" && !requestData.isAuthLoading)
      requestData.navigate("/");

    if (
      response.data.role === "ROLE_RESTAURANT_OWNER" &&
      !requestData.isAuthLoading
    )
      requestData.navigate("/admin/restaurants");

    dispatch({ type: LOGIN_USER_SUCCESS, payload: jwtToken });
    console.log("LOGIN SUCCESS: ");
    console.log(response.data);
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: LOGIN_USER_FAILURE, payload: errorMessage });
  }
};

// Action để làm mới accessToken
export const refreshAccessTokenAction = (refreshToken) => async (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_REQUEST });

  try {
    const response = await axiosAPI.post("/auth/refreshToken", {
      refreshToken,
    });

    const newJwtToken = response.data.accessToken;

    // Nếu có accessToken mới, lưu vào localStorage
    if (newJwtToken) {
      localStorage.setItem("jwtToken", newJwtToken); // Lưu lại accessToken mới
      dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: newJwtToken,
      });

      // Trả lại jwtToken mới để interceptor sử dụng
      return newJwtToken;
    }

    // Nếu không có accessToken mới, yêu cầu người dùng đăng nhập lại
    throw new Error("Failed to refresh token.");
  } catch (error) {
    dispatch({
      type: REFRESH_TOKEN_FAILURE,
      payload: error.message || "Error refreshing token.",
    });

    // Nếu refreshToken hết hạn, xoá cả jwtToken và refreshToken và yêu cầu đăng nhập lại
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Chuyển hướng đến trang login
    throw new Error("Refresh token expired. Please log in again.");
  }
};

// export const getUserAction = (jwtToken) => async (dispatch) => {
//   dispatch({ type: GET_USER_REQUEST });
//   console.log(`Bearer ${jwtToken}`);
//   try {
//     const response = await axiosAPI.get("/users/profile", {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });

//     console.log(response);

//     console.log("USER PROFILE: " + response.data);
//     dispatch({ type: GET_USER_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: GET_USER_FAILURE, payload: error });
//     console.log(error);
//   }
// };

export const getUserAction = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axiosAPI.get("/users/profile");

    console.log(response);

    console.log("USER PROFILE: " + response.data);
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.log(error);
  }
};

export const addToFavoritesAction = (restaurantId) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const response = await axiosAPI.put(
      "/restaurants/" + restaurantId + "/favorites"
    );

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: response.data });
    console.log("ADD TO FAVORITES SUCCESS", response.data);
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
    console.log(error);
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    // remove jwtToken from localStorage :
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");

    dispatch({ type: LOGOUT });
    console.log("LOGOUT SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const clearAuthError = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_AUTH_ERROR });
    console.log("CLEAR AUTH ERROR SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const clearAuthSuccess = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_AUTH_SUCCESS });
    console.log("CLEAR AUTH SUCCESS SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmailAction = (requestData) => async (dispatch) => {
  dispatch({ type: VERIFY_EMAIL_REQUEST });
  try {
    const response = await axiosAPI.post("/auth/verification", requestData);

    console.log(response.data);

    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: response.data });

    if (response.data && !requestData.isAuthLoading)
      requestData.navigate("/account/login");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: VERIFY_EMAIL_FAILURE, payload: errorMessage });
    console.log(error);
  }
};

export const resendCodeAction = (requestData) => async (dispatch) => {
  dispatch({ type: RESEND_CODE_REQUEST });

  try {
    const response = await axiosAPI.post(
      "/auth/resendVerification",
      {},
      {
        params: {
          email: requestData.email,
        },
      }
    );

    console.log(response.data);

    dispatch({ type: RESEND_CODE_SUCCESS, payload: response.data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: RESEND_CODE_FAILURE, payload: errorMessage });
    console.log(error);
  }
};
