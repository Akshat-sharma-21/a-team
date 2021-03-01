import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilActions";

export const ADD_PEOPLE = "ADD_PEOPLE";

export function fetchPeople(tid) {
  return (dispatch) => {};
}

function addPeopleFunction(payload) {
  // pure Reducer function
  return {
    type: ADD_PEOPLE,
    payload,
  };
}
