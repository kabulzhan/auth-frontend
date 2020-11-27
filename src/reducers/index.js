import { combineReducers } from "redux";
import auth from "./auth";
import news from "./news";

export default combineReducers({ auth, news });
