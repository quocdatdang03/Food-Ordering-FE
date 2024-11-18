import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_OWNER_ID_FAILURE,
  GET_RESTAURANT_BY_OWNER_ID_REQUEST,
  GET_RESTAURANT_BY_OWNER_ID_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

const initialStates = {
  restaurants: [],
  ownerRestaurant: null,
  restaurant: null,
  isLoading: false,
  error: null,
  success: null,
  events: [],
  restaurantEvents: [],
  categories: [],
};

export const restaurantReducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_ALL_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case CREATE_RESTAURANT_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_OWNER_ID_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_RESTAURANTS_CATEGORY_REQUEST:
    case UPDATE_RESTAURANT_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ownerRestaurant: action.payload,
      };

    case GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: action.payload,
      };

    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurant: action.payload,
      };

    case GET_RESTAURANT_BY_OWNER_ID_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ownerRestaurant: action.payload,
      };

    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurants: state.restaurants.filter(
          (item) => item.id !== action.payload
        ),
        // ownerRestaurant: state.ownerRestaurant.filter(
        //   (item) => item.id !== action.payload
        // ),
      };

    // ----------- EVENTS : LÀM SAU

    // ----------- CATEGORY:
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.payload],
      };

    case GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };

    // FAILURE case:
    case GET_ALL_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case CREATE_RESTAURANT_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_OWNER_ID_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_RESTAURANTS_CATEGORY_FAILURE:
    case UPDATE_RESTAURANT_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
