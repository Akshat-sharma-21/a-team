import { myFirebase, myFirestore } from "../FirebaseConfig";
import {
  setLoadingTrue,
  setLoadingFalse,
  setErrors,
  setReload,
} from "./utilActions";
export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store

export function login(user) {
  // Function to login the user
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password) // signing the user
      .then((userCredentials) => {
        localStorage.setItem("Id", userCredentials.user.uid); // storing the uid of the user locally
        return userCredentials.user.getIdToken();
      })
      .then((token) => {
        localStorage.setItem("Token", token); // storing the token locally
        dispatch(setLoadingFalse());
        window.location.href = "/transactions"; // redirection to transactions
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function fetchUser() {
  // Action to fetch the user
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    if (localStorage.Id) {
      myFirestore.collection("Portal_Users").onSnapshot((snapshot) => {
        // Iterating through the collection
        snapshot.forEach((doc) => {
          if (doc.data().id === localStorage.Id) {
            // When the user is found
            dispatch(addUserAction(doc.data()));
            dispatch(setLoadingFalse());
            dispatch(setReload());
          }
        });
      });
    } else {
      dispatch(setErrors("Error, No Id found in Local storage"));
    }
  };
}

function addUserAction(payload) {
  // Pure Action to add user to Redux
  return {
    type: ADD_USER,
    id: payload.id,
    Name: payload.Name,
    Email: payload.Email,
    Phone: payload.Phone,
    Role: payload.Role,
    Company: payload.Company,
    Transactions: payload.Transactions_List,
    leadsTo: payload.Leads_To,
    leadsFrom: payload.Leads_From,
  };
}
