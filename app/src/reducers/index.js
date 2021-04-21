import { combineReducers } from "redux";
import utilsReducer from "./utilsReducer";
import questionsReducer from "./questionsReducer";
import userReducer from "./userReducer";
import roadmapReducer from "./roadmapReducer";

const mainReducer = combineReducers({
  utils: utilsReducer,
  questions: questionsReducer,
  user: userReducer,
  roadmap: roadmapReducer,
});

export default mainReducer;
