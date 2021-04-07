import { SET_LOADING } from "./types";

export const loadingAction = (dispatch, payload) => {
  dispatch({
    type: SET_LOADING,
    payload,
  });
};
