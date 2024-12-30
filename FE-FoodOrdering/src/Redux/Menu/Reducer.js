// ------------- FOODS :

import * as actionTypes from "./ActionType";

const initialStates = {
  menuItems: [],
  menuItem: null,
  isLoading: false,
  error: null,
  success: null,
  menuItemsSearch: [],
};

export const menuItemReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.CREATE_MENU_ITEM_REQUEST:
    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.DELETE_MENU_ITEM_REQUEST:
    case actionTypes.UPDATE_MENU_ITEM_REQUEST:
    case actionTypes.SEARCH_MENU_ITEM_REQUEST:
    case actionTypes.GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.CREATE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: [...state.menuItems, action.payload],
        success: "Food Created Successfully!",
      };

    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: action.payload,
      };

    case actionTypes.GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItem: action.payload,
      };

    case actionTypes.DELETE_MENU_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: state.menuItems.filter((item) => item.id !== action.payload),
      };

    case actionTypes.UPDATE_MENU_ITEM_SUCCESS:
    case actionTypes.UPDATE_MENU_ITEM_AVAILABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItems: state.menuItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        menuItemsSearch: action.payload,
      };

    // FAILURE :
    case actionTypes.CREATE_MENU_ITEM_FAILURE:
    case actionTypes.GET_MENU_ITEM_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.DELETE_MENU_ITEM_FAILURE:
    case actionTypes.UPDATE_MENU_ITEM_AVAILABLE_FAILURE:
    case actionTypes.UPDATE_MENU_ITEM_FAILURE:
    case actionTypes.SEARCH_MENU_ITEM_FAILURE:
    case actionTypes.GET_MENU_ITEM_OF_CURRENT_RESTAURANT_BY_ID_FAILURE:
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
