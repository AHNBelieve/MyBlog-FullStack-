import { LOAD_POST, NEW_POST, DELETE_POST, EDIT_POST } from "../_actions/types";

export default function (
  state = { post: [], isLastPage: false, totalPosts: 0 },
  action
) {
  switch (action.type) {
    case `${LOAD_POST}_FULFILLED`:
      console.log(action.payload);
      return {
        post: action.payload.posts,
        isLastPage: action.payload.isLastPage,
        totalPosts: action.payload.totalPosts,
      };
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
