import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getCartAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_CART_REQUEST });
  try {
    const response = await axiosAPI.get("/cart", {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({ type: actionTypes.GET_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CART_FAILURE, payload: error });
    console.log(error);
  }
};

export const getAllCartItemsAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_CART_ITEMS_REQUEST });

  try {
    const response = await axiosAPI.get("/cart");

    dispatch({
      type: actionTypes.GET_ALL_CART_ITEMS_SUCCESS,
      payload: response.data.cartItems,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ALL_CART_ITEMS_FAILURE, payload: error });
    console.log(error);
  }
};

export const addItemToCartAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_ITEM_TO_CART_REQUEST });

    try {
      const response = await axiosAPI.post("/cart", requestData, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: actionTypes.ADD_ITEM_TO_CART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: actionTypes.ADD_ITEM_TO_CART_FAILURE, payload: error });
      console.log(error);
    }
  };

export const updateCartItemAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_CARTITEM_QUANTITY_REQUEST });

    try {
      const response = await axiosAPI.put("/cart/item", requestData, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: actionTypes.UPDATE_CARTITEM_QUANTITY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_CARTITEM_QUANTITY_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };

export const removeItemFromCartAction =
  (jwtToken, cartItemId) => async (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_CARTITEM_FROM_CART_REQUEST });

    try {
      const response = await axiosAPI.delete(`/cart/item/${cartItemId}`, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: actionTypes.REMOVE_CARTITEM_FROM_CART_SUCCESS,
        payload: cartItemId,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.REMOVE_CARTITEM_FROM_CART_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };

export const clearCartAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_CART_REQUEST });

  try {
    const response = await axiosAPI.delete("/cart", {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({
      type: actionTypes.CLEAR_CART_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.CLEAR_CART_FAILURE, payload: error });
    console.log(error);
  }
};
