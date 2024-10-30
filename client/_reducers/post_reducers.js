import { LOAD_POST, NEW_POST, DELETE_POST, EDIT_POST } from "../_actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case `${LOAD_POST}_FULFILLED`:
      return [...action.payload];
    case `${NEW_POST}_FULFILLED`:
      return state;
    case `${EDIT_POST}_FULFILLED`:
      return state;
    case `${DELETE_POST}_FULFILLED`:
      return state;
    default:
      return state;
  }
}
