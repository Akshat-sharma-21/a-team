import { combineReducers } from "redux";
import utilsReducer from "./utilsReducer";

const mainReducer = combineReducers({
  utils: utilsReducer,
});

export default mainReducer;
