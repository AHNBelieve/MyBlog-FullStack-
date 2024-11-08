import { combineReducers } from "redux";
import user from "./user_reducer";
import post from "./post_reducers";
import config from "./config_reducers";

const rootReducer = combineReducers({
  user,
  post,
  config,
});

export default rootReducer;
