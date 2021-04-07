import { P_O_D } from "../Actions/types";
const PODReducer = (state = false, action) => {
  switch (action.type) {
    case P_O_D:
      return action.payload;
    default:
      return state;
  }
};

export default PODReducer;
