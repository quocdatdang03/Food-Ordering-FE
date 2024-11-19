import { axiosAPI } from "../../config/api";
import {
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_OWNER_ID_FAILURE,
  GET_RESTAURANT_BY_OWNER_ID_REQUEST,
  GET_RESTAURANT_BY_OWNER_ID_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurantAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

  try {
    const response = await axiosAPI.get("/restaurants", {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error });
  }
};

export const getRestaurantByIdAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.get(`/restaurants/${restaurantId}`, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
  };

export const getRestaurantByOwnerIdAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_OWNER_ID_REQUEST });

  try {
    const response = await axiosAPI.get(`/admin/restaurants/user`, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({
      type: GET_RESTAURANT_BY_OWNER_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_RESTAURANT_BY_OWNER_ID_FAILURE, payload: error });
  }
};

export const createRestaurantAction = (requestData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });

  try {
    const response = await axiosAPI.post(
      "/admin/restaurants",
      requestData.restaurantData,
      {
        headers: {
          Authorization: "Bearer " + requestData.jwtToken,
        },
      }
    );

    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
  }
};

export const updateRestaurantAction = (requestData) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/admin/restaurants/${requestData.restaurantId}`,
      requestData.restaurantData,
      {
        headers: {
          Authorization: "Bearer " + requestData.jwtToken,
        },
      }
    );

    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
  }
};

export const deleteRestaurantAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });

    try {
      const response = await axiosAPI.delete(
        `/admin/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (error) {
      console.log(error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };

export const updateRestaurantStatusAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const response = await axiosAPI.patch(
        `/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };

// ------------ EVENTS :
// ------------ CATEGORY:
// export const createCategory = (requestData, jwtToken) => async (dispatch) => {};
