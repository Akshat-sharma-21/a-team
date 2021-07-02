import jwtDecode from "jwt-decode";
import { myFirebase } from "./FirebaseConfig";

export function getAuth() {
  // function to check whether the user has the access to the procted routes
  if (localStorage.Token) {
    // if the token is not null
    const decode = jwtDecode(localStorage.Token);
    if (decode.exp * 1010 < myFirebase.firestore.Timestamp.now().toMillis()) {
      // if the token has expired
      return false;
    } else {
      return true;
    }
  } else {
    return false; // return false if the token is absent
  }
}

export function signout() {
  // function to signout the user
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "/"; // redirecting to the signup page
    })
    .catch((err) => {
      console.error(err); // logging the error
    });
  localStorage.clear();
}
