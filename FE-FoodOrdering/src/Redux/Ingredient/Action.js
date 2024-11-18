import { axiosAPI } from "../../config/api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_BY_RESTAURANT_ID_FAILURE,
  GET_INGREDIENT_BY_RESTAURANT_ID_REQUEST,
  GET_INGREDIENT_BY_RESTAURANT_ID_SUCCESS,
  GET_INGREDIENT_CATEGORY_BY_ID_FAILURE,
  GET_INGREDIENT_CATEGORY_BY_ID_REQUEST,
  GET_INGREDIENT_CATEGORY_BY_ID_SUCCESS,
  GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_FAILURE,
  GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_REQUEST,
  GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_SUCCESS,
  UPDATE_STOCK_FAILURE,
  UPDATE_STOCK_REQUEST,
  UPDATE_STOCK_SUCCESS,
} from "./ActionType";

export const getIngredientsOfRestaurantAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_BY_RESTAURANT_ID_REQUEST });

    try {
      const response = axiosAPI.get(
        `/admin/ingredients/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: GET_INGREDIENT_BY_RESTAURANT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_INGREDIENT_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };

export const getIngredientCategoryByIdAction =
  (jwtToken, categoryId) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_BY_ID_REQUEST });

    try {
      const response = axiosAPI.get(
        `/admin/ingredients/category/${categoryId}`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: GET_INGREDIENT_CATEGORY_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_BY_ID_FAILURE,
        payload: error,
      });
    }
  };

export const getIngredientCategoriesOfRestaurantAction =
  (jwtToken, restaurantId) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_REQUEST });

    try {
      const response = axiosAPI.get(
        `/admin/ingredients/restaurant/${restaurantId}/category`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };

export const createIngredientAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });

    try {
      const response = axiosAPI.post(`/admin/ingredients`, requestData, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_INGREDIENT_FAILURE,
        payload: error,
      });
    }
  };

export const createIngredientCategoryAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });

    try {
      const response = axiosAPI.post(
        `/admin/ingredients/category`,
        requestData,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };

export const updateStockOfIngredientAction =
  (jwtToken, ingredientId) => async (dispatch) => {
    dispatch({ type: UPDATE_STOCK_REQUEST });

    try {
      const response = axiosAPI.patch(
        `/admin/ingredients/${ingredientId}/stock`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: UPDATE_STOCK_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_STOCK_FAILURE,
        payload: error,
      });
    }
  };
