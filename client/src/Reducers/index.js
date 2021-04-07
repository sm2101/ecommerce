import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import cartReducer from "./cartReducer";
import cartDrawerReducer from "./cartDrawerReducer";
import couponReducer from "./couponReducer";
import PODReducer from "./PODReducer";
import loadingReducer from "./loadingReducer";
export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: cartDrawerReducer,
  coupon: couponReducer,
  POD: PODReducer,
  loading: loadingReducer,
});
