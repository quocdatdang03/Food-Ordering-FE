import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const createOrderAction =
  (jwtToken, requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });
    try {
      const response = await axiosAPI.post("/order", requestData, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      });

      dispatch({
        type: actionTypes.CREATE_ORDER_SUCCESS,
        payload: response.data,
      });

      console.log("CREATE ORDER SUCCESS: " + response.data);
    } catch (error) {
      dispatch({ type: actionTypes.CREATE_ORDER_FAILURE, payload: error });
      console.log(error);
    }
  };

export const getCustomerOrdersAction = (jwtToken) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_CUSTOMER_ORDERS_REQUEST });

  try {
    const response = await axiosAPI.get("/order/customer", {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    dispatch({
      type: actionTypes.GET_CUSTOMER_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CUSTOMER_ORDERS_FAILURE, payload: error });
    console.log(error);
  }
};
