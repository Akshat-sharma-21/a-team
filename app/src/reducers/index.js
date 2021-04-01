import { combineReducers } from "redux";
import utilsReducer from "./utilsReducer";
import questionsReducer from "./questionsReducer";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";
import roadmapReducer from "./roadmapReducer";

const mainReducer = combineReducers({
  utils: utilsReducer,
  questions: questionsReducer,
  user: userReducer,
  tasks: taskReducer,
  roadmap: roadmapReducer,
});

export default mainReducer;
