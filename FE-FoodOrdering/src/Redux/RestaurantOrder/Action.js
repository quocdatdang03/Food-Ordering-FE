import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getRestaurantOrdersAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RESTAURANT_ORDERS_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/admin/order/restaurant/${requestData.restaurantId}`,
        {
          params: {
            order_status: requestData.orderStatus,
          },
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: actionTypes.GET_RESTAURANT_ORDERS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_RESTAURANT_ORDERS_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };

export const updateOrderStatusAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ORDER_STATUS_REQUEST });

    try {
      const response = await axiosAPI.patch(
        `/admin/order/${requestData.orderId}/${requestData.orderStatus}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      dispatch({
        type: actionTypes.UPDATE_ORDER_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ORDER_STATUS_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };

export const getRestaurantOrderDetailAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_RESTAURANT_ORDER_DETAIL_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/admin/order/${requestData.orderId}/restaurant/${requestData.restaurantId}`,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_RESTAURANT_ORDER_DETAIL_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_RESTAURANT_ORDER_DETAIL_FAILURE,
        payload: error,
      });
      console.log(error);
    }
  };
