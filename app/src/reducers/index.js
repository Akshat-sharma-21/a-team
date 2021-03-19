import { combineReducers } from "redux";
import utilsReducer from "./utilsReducer";
import questionsReducer from "./questionsReducer";
import userReducer from "./userReducer";

const mainReducer = combineReducers({
  utils: utilsReducer,
  questions: questionsReducer,
  user: userReducer,
});

export default mainReducer;
