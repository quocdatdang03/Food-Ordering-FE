import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import { restaurantReducer } from "./Restaurant/Reducer";
import { menuItemReducer } from "./Menu/Reducer";
import { ingredientReducer } from "./Ingredient/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./order/Reducer";
import { restaurantOrderReducer } from "./RestaurantOrder/Reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  restaurantReducer: restaurantReducer,
  menuItemReducer: menuItemReducer,
  ingredientReducer: ingredientReducer,
  cartReducer: cartReducer,
  orderReducer: orderReducer,
  restaurantOrderReducer: restaurantOrderReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
