import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  authReducer: authReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
