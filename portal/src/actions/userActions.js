import { myFirebase } from "../FirebaseConfig";
export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store

export function login(user) {
  // Function to login the user
  return (dispatch) => {
    dispatch(addUserAction(user));
  };
}

function addUserAction(payload) {
  // Pure Action to add user to Redux
  return {
    type: ADD_USER,
    email: payload.email,
  };
}
