import { combineReducers } from "redux";
import userReducer from "./userReducer";
import utilReducer from "./utilReducer";
import registartionReducer from "./registrationReducer";

const mainReducer = combineReducers({
  user: userReducer,
  utils: utilReducer,
  register: registartionReducer,
});

export default mainReducer;
