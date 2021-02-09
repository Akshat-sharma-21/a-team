import { setAccess, denyAccess } from "./utilActions";

export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store

export function checkUser(email) {
  // To check if the user is authorized to create an account
  return (dispatch) => {
    if (email === "abc@gmail.com") {
      // If the user has the email registered
      dispatch(setAccess());
    } else {
      dispatch(denyAccess());
    }
  };
}

export function addUser(payload) {
  // Pure Reducer
  return {
    type: ADD_USER,
    id: payload.id,
    Name: payload.Name,
  };
}
