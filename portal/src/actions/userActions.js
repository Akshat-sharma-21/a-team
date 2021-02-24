import { myFirebase } from "../FirebaseConfig";
import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilActions";
export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store

export function login(user) {
  // Function to login the user
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password) // signing the user
      .then((userCredentials) => {
        return userCredentials.user.getIdToken();
      })
      .then((token) => {
        localStorage.setItem("Token", token); // storing the token locally
        dispatch(setLoadingFalse());
        dispatch(addUserAction(user));
        window.location.href = "/transactions"; // redirection to transactions
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

function addUserAction(payload) {
  // Pure Action to add user to Redux
  return {
    type: ADD_USER,
    email: payload.email,
  };
}
