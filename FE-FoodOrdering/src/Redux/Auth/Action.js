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
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
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
      payload: { jwtToken, messageSuccess: response.data.message },
    });
    console.log("REGISTER SUCCESS: " + response.data);
  } catch (error) {
    const messageError = error.response.data.message;
    dispatch({ type: REGISTER_USER_FAILURE, payload: messageError });
  }
};

export const loginUserAction = (requestData) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const response = await axiosAPI.post("/auth/login", requestData.userData);
    const jwtToken = response.data.accessToken;

    // if jwtToken is present -> save it to localStorage
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
    }

    if (response.data.role === "ROLE_CUSTOMER") requestData.navigate("/");

    if (response.data.role === "ROLE_RESTAURANT_OWNER")
      requestData.navigate("/admin/restaurant");

    dispatch({ type: LOGIN_USER_SUCCESS, payload: jwtToken });
    console.log("LOGIN SUCCESS: ");
    console.log(response.data);
  } catch (error) {
    const messageError = "Username or password is not correct";
    dispatch({ type: LOGIN_USER_FAILURE, payload: messageError });
  }
};

export const getUserAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  console.log(`Bearer ${jwtToken}`);
  try {
    const response = await axiosAPI.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    console.log(response);

    console.log("USER PROFILE: " + response.data);
    dispatch({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.log(error);
  }
};

export const addToFavoritesAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST });
    try {
      const response = await axiosAPI.put(
        "/restaurants/" + restaurantId + "/favorites",
        {},
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
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
