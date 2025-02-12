// ------------- FOODS :

import { axiosAPI } from "../../config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
  GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_FAILURE,
  GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_REQUEST,
  GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_AVAILABLE_FAILURE,
  UPDATE_MENU_ITEM_AVAILABLE_REQUEST,
  UPDATE_MENU_ITEM_AVAILABLE_SUCCESS,
  UPDATE_MENU_ITEM_FAILURE,
  UPDATE_MENU_ITEM_REQUEST,
  UPDATE_MENU_ITEM_SUCCESS,
} from "./ActionType";

export const createMenuItemAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });

    try {
      const response = await axiosAPI.post("/admin/foods", requestData, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };

// THIS IS ALSO USE FOR FILTERING
export const getMenuItemsByRestaurantIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST });

    try {
      const requestURL = `/foods/restaurant/${requestData.restaurantId}?isVegetarian=${requestData.isVegetarian}&isNonVegetarian=${requestData.isNonVegetarian}&isSeasonal=${requestData.isSeasonal}&foodCategory=${requestData.foodCategory}`;
      console.log(requestURL);
      const response = await axiosAPI.get(requestURL);

      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
        payload: response.data,
      });

      console.log("GET ALL FOODS OF RESTAURANT SUCCESS");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };

export const searchMenuItemByKeywordAction = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

  try {
    const response = await axiosAPI.get(`/foods/search?keyword=${keyword}`);

    dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
  }
};

export const updateMenuItemAvailableAction =
  (jwtToken, foodId) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_AVAILABLE_REQUEST });

    try {
      const response = await axiosAPI.patch(
        `/admin/foods/${foodId}/available`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: UPDATE_MENU_ITEM_AVAILABLE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_MENU_ITEM_AVAILABLE_FAILURE, payload: error });
    }
  };

export const deleteMenuItemAction = (jwtToken, foodId) => async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });

  try {
    const response = await axiosAPI.delete(`/admin/foods/${foodId}`, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({
      type: DELETE_MENU_ITEM_SUCCESS,
      payload: foodId,
    });

    console.log("DELETE MENU ITEM SUCCESS: " + response.data);
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
  }
};

export const getMenuItemOfCurrentRestaurantByIdAction =
  (jwtToken, foodId) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.get(`/admin/foods/${foodId}`, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_SUCCESS,
        payload: response.data,
      });

      console.log("DELETE MENU ITEM SUCCESS: " + response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_FAILURE,
        payload: error,
      });
    }
  };

export const updateMenuItemByIdAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_REQUEST });

    try {
      const response = await axiosAPI.put(
        `/admin/foods/${requestData.id}`,
        requestData,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: UPDATE_MENU_ITEM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_MENU_ITEM_FAILURE,
        payload: error,
      });
    }
  };
