import { combineReducers } from "redux";
import utilsReducer from "./utilsReducer";
import questionsReducer from "./questionsReducer";
import userReducer from "./userReducer";
import roadmapReducer from "./roadmapReducer";
import documentsReducer from "./documentsReducer";
import tasksReducer from "./tasksReducer";

const mainReducer = combineReducers({
  utils: utilsReducer,
  questions: questionsReducer,
  user: userReducer,
  roadmap: roadmapReducer,
  documents: documentsReducer,
  tasks: tasksReducer,
});

export default mainReducer;
