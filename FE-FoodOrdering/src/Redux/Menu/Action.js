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
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_AVAILABLE_FAILURE,
  UPDATE_MENU_ITEM_AVAILABLE_REQUEST,
  UPDATE_MENU_ITEM_AVAILABLE_SUCCESS,
} from "./ActionType";

export const createMenuItemAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });

    try {
      const response = axiosAPI.post("/admin/foods", requestData, {
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
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST });

    try {
      const requestURL = `/foods/${requestData.restaurantId}?isVegetarian=${requestData.isVegetarian}&isNonVegetarian=${requestData.isNonVegetarian}&isSeasonal=${requestData.isSeasonal}&foodCategory=${requestData.foodCateogry}`;
      const response = axiosAPI.get(requestURL, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };

export const searchMenuItemByKeywordAction =
  (jwtToken, keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });

    try {
      const response = axiosAPI.get(`/foods/search?keyword=${keyword}`, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

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
      const response = axiosAPI.patch(`/admin/foods/${foodId}/available`, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

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
    const response = axiosAPI.delete(`/admin/foods/${foodId}`, {
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
