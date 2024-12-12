import * as actionTypes from "./ActionType";

const initialValues = {
  orders: [],
  orderDetail: null,
  isLoading: false,
  error: null,
  success: null,
};

export const restaurantOrderReducer = (state = initialValues, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANT_ORDERS_REQUEST:
    case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
    case actionTypes.GET_RESTAURANT_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_RESTAURANT_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: state.orders.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case actionTypes.GET_RESTAURANT_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderDetail: action.payload,
      };

    case actionTypes.GET_RESTAURANT_ORDERS_FAILURE:
    case actionTypes.GET_RESTAURANT_ORDER_DETAIL_FAILURE:
    case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

    default:
      return state;
  }
};
