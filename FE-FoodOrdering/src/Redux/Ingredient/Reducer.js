import * as actionTypes from "./ActionType";

const initialStates = {
  ingredientCategories: [],
  ingredients: [],
  ingredientCategory: null,
  ingredient: null,
  isLoading: false,
  error: null,
  success: null,
};

export const ingredientReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.CREATE_INGREDIENT_REQUEST:
    case actionTypes.CREATE_INGREDIENT_CATEGORY_REQUEST:
    case actionTypes.GET_INGREDIENT_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_REQUEST:
    case actionTypes.GET_INGREDIENT_CATEGORY_BY_ID_REQUEST:
    case actionTypes.UPDATE_STOCK_REQUEST:
    case actionTypes.UPDATE_INGREDIENT_CATEGORY_REQUEST:
    case actionTypes.UPDATE_INGREDIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_INGREDIENT_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload,
      };

    case actionTypes.GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredientCategories: action.payload,
      };

    case actionTypes.GET_INGREDIENT_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredientCategory: action.payload,
      };

    case actionTypes.CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredientCategories: [...state.ingredientCategories, action.payload],
      };

    case actionTypes.CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: [...state.ingredients, action.payload],
      };

    case actionTypes.UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case actionTypes.UPDATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredientCategories: state.ingredientCategories.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case actionTypes.UPDATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredients: state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case actionTypes.GET_INGREDIENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ingredient: action.payload,
      };

    // FAILURE
    case actionTypes.CREATE_INGREDIENT_FAILURE:
    case actionTypes.CREATE_INGREDIENT_CATEGORY_FAILURE:
    case actionTypes.GET_INGREDIENT_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.GET_INGREDIENT_CATEGORY_BY_RESTAURANT_ID_FAILURE:
    case actionTypes.GET_INGREDIENT_CATEGORY_BY_ID_FAILURE:
    case actionTypes.GET_INGREDIENT_BY_ID_FAILURE:
    case actionTypes.UPDATE_STOCK_FAILURE:
    case actionTypes.UPDATE_INGREDIENT_CATEGORY_FAILURE:
    case actionTypes.UPDATE_INGREDIENT_FAILURE:
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
