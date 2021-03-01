import { combineReducers } from "redux";
import userReducer from "./userReducer";
import utilReducer from "./utilReducer";
import transactionReducer from "./transactionReducer";
import registartionReducer from "./registrationReducer";
import peopleReucer from "./peopleReducer";

const mainReducer = combineReducers({
  user: userReducer,
  utils: utilReducer,
  register: registartionReducer,
  transaction: transactionReducer,
  people: peopleReucer,
});

export default mainReducer;
