import * as actionTypes from "./ActionType";

const initialValues = {
  orders: [],
  isLoading: false,
  error: null,
  success: null,
};

export const orderReducer = (state = initialValues, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_REQUEST:
    case actionTypes.GET_CUSTOMER_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: [...state.orders, action.payload],
      };

    case actionTypes.GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };

    case actionTypes.CREATE_ORDER_FAILURE:
    case actionTypes.GET_CUSTOMER_ORDERS_FAILURE:
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
