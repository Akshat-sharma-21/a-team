import { myFirebase, myFirestore, myStorage } from "../FirebaseConfig";
import {
  setLoadingTrue,
  setLoadingFalse,
  setErrors,
  setReload,
} from "./utilActions";
import {
  addTransactionFunction,
  removeAllTransactionsFunction,
} from "./transactionActions";
export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store
export const EDIT_USER = "EDIT_USER"; // Action to edit the user
export const CHANGE_PHOTO = "CHANGE_PHOTO"; // Action to change the photo of the user

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
        myFirestore
          .collection("Portal_Users")
          .doc(localStorage.Id)
          .get()
          .then((doc) => {
            if (
              // If the user has verified his phone and email
              doc.data().emailVerified === true &&
              doc.data().phoneVerified === true
            ) {
              dispatch(setLoadingFalse());
              window.location.href = "/transactions"; // redirection to transactions
            } else {
              //TODO: Add an error message to show user that he hasn't registered his email or phone
              let err = { code: "verification-error" };
              dispatch(setErrors(err));
            }
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function fetchUser() {
  // Action to fetch the user
  let counter = 0; // To correctly set the loading state
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    if (localStorage.Id) {
      // If Id is present
      myFirestore
        .collection("Portal_Users")
        .doc(localStorage.Id)
        .get()
        .then((doc) => {
          dispatch(addUserAction(doc.data())); // Dispatching an action to add the user
          if (
            doc.data().Transactions_List &&
            doc.data().Transactions_List.length !== 0
          ) {
            // If the Transaction List is Present and has data
            dispatch(removeAllTransactionsFunction());
            doc.data().Transactions_List.forEach((transaction) => {
              myFirestore
                .collection("Transactions")
                .doc(transaction)
                .get()
                .then((trans) => {
                  counter++; // Incrementing the counter
                  dispatch(
                    // Saving the data of the Transaction in the Redux store
                    addTransactionFunction({
                      id: transaction,
                      ...trans.data(),
                    })
                  );
                })
                .then(() => {
                  if (counter === doc.data().Transactions_List.length) {
                    // When all the transactions are fetched
                    dispatch(setLoadingFalse());
                    dispatch(setReload(false));
                  }
                });
            });
          } else {
            dispatch(setLoadingFalse()); // Dispatching an action to set loading to false
            dispatch(setReload());
          }
        });
    } else {
      dispatch(setErrors("Internal Error, No User Id Found"));
    }
  };
}

export function editUser(user) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    if (localStorage.Id) {
      // If the Id is stored in the localStorage
      myFirestore
        .collection("Portal_Users")
        .doc(localStorage.Id)
        .update({
          // Updating the User Id
          FirstName: user.firstName,
          LastName: user.lastName,
          Phone: user.phone,
          Email: user.email,
        })
        .then(() => {
          dispatch(setLoadingFalse());
          dispatch(editUserFunction(user));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else {
      // If the User Id is not found
      dispatch(setErrors("Internal Error, Id not found"));
    }
  };
}

export function updateProfilePicture() {
  // function to get the user's photo url and update it
  return new Promise((resolve, reject) => {
    let fileRef = myStorage.ref().child(`users/${localStorage.Id}`); // getting the file ref
    fileRef
      .getDownloadURL()
      .then((url) => {
        myFirestore
          .collection("Portal_Users")
          .doc(localStorage.Id)
          .update({
            PhotoUrl: url,
          })
          .then(() => {
            resolve(url);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function addUserAction(payload) {
  // Pure Action to add user to Redux
  return {
    type: ADD_USER,
    payload,
  };
}

function editUserFunction(payload) {
  // pure reducer function
  return {
    type: EDIT_USER,
    FirstName: payload.firstName,
    LastName: payload.lastName,
    Email: payload.email,
    Phone: payload.phone,
  };
}

export function updatePhotoAction(url) {
  // pure Action to update the user's profile picture
  return {
    type: CHANGE_PHOTO,
    url,
  };
}
