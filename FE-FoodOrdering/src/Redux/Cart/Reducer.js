import { isCartItemPresentInCart } from "../../config/logic";
import * as actionTypes from "./ActionType";

const initialStates = {
  cart: null,
  cartItems: [],
  isLoading: false,
  error: null,
  success: null,
};

export const cartReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.GET_CART_REQUEST:
    case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
    case actionTypes.ADD_ITEM_TO_CART_REQUEST:
    case actionTypes.REMOVE_CARTITEM_FROM_CART_REQUEST:
    case actionTypes.CLEAR_CART_REQUEST:
    case actionTypes.UPDATE_CARTITEM_QUANTITY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_CART_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: action.payload,
        error: null,
      };

    case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: isCartItemPresentInCart(action.payload, state.cartItems)
          ? state.cartItems.map((item) =>
              item.id === action.payload.id ? action.payload : item
            )
          : [...state.cartItems, action.payload],
      };

    case actionTypes.UPDATE_CARTITEM_QUANTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };

    case actionTypes.REMOVE_CARTITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        error: null,
      };

    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        cartItems: [],
        error: null,
      };

    // CASE FAILURE :
    case actionTypes.GET_CART_FAILURE:
    case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
    case actionTypes.ADD_ITEM_TO_CART_FAILURE:
    case actionTypes.REMOVE_CARTITEM_FROM_CART_FAILURE:
    case actionTypes.CLEAR_CART_FAILURE:
    case actionTypes.UPDATE_CARTITEM_QUANTITY_FAILURE:
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
