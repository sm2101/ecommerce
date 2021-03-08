import { ADD_COUPON } from "../Actions/types";
const couponReducer = (state = false, action) => {
  switch (action.type) {
    case ADD_COUPON:
      return action.payload;
    default:
      return state;
  }
};

export default couponReducer;
