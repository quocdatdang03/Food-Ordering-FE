import { isPresentInFavorites } from "../../config/logic";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  CLEAR_AUTH_ERROR,
  CLEAR_AUTH_SUCCESS,
  GET_RESET_PASSWORD_INFO_FAILURE,
  GET_RESET_PASSWORD_INFO_REQUEST,
  GET_RESET_PASSWORD_INFO_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESEND_CODE_FAILURE,
  RESEND_CODE_REQUEST,
  RESEND_CODE_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL_FAILURE,
  SEND_RESET_PASSWORD_EMAIL_REQUEST,
  SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  registerUser: null,
  registerEmail: null,
  resetPasswordEmail: null,
  resetPasswordInfo: null,
  favorites: [],
  jwtToken: null,
  success: null,
  error: null,
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case GET_USER_REQUEST:
    case ADD_TO_FAVORITE_REQUEST:
    case REFRESH_TOKEN_REQUEST:
    case VERIFY_EMAIL_REQUEST:
    case RESEND_CODE_REQUEST:
    case SEND_RESET_PASSWORD_EMAIL_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        sucess: null,
      };

    case GET_RESET_PASSWORD_INFO_REQUEST:
      return {
        ...state,
        isVerifyResetPasswordInfoLoading: true,
        error: null,
        success: null,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        registerEmail: action.payload.registerEmail,
        success: action.payload.messageSuccess,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
        success: "Login user success",
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favorites: action.payload.favorites,
      };

    case ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id) // remove from favorites
          : [action.payload, ...state.favorites], // add to favorites
      };

    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: action.payload,
      };

    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "Verification code has been sent successfully",
      };

    case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        resetPasswordEmail: action.payload.resetPasswordEmail,
        success: action.payload.messageSuccess,
      };

    case GET_RESET_PASSWORD_INFO_SUCCESS:
      return {
        ...state,
        isVerifyResetPasswordInfoLoading: false,
        error: null,
        resetPasswordInfo: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: action.payload,
      };

    case LOGOUT:
      return initialState;

    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
    case GET_USER_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
    case REFRESH_TOKEN_FAILURE:
    case VERIFY_EMAIL_FAILURE:
    case RESEND_CODE_FAILURE:
    case SEND_RESET_PASSWORD_EMAIL_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

    case GET_RESET_PASSWORD_INFO_FAILURE:
      return {
        ...state,
        isVerifyResetPasswordInfoLoading: false,
        error: action.payload,
        success: null,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_AUTH_SUCCESS:
      return {
        ...state,
        success: null,
      };
    default:
      return state;
  }
};
