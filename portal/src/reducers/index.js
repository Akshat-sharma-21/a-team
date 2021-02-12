import { combineReducers } from "redux";
import userReducer from "./userReducer";
import utilReducer from "./utilReducer";

const mainReducer = combineReducers({ user: userReducer, utils: utilReducer });

export default mainReducer;
