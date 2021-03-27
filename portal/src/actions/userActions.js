import { myFirebase, myFirestore } from "../FirebaseConfig";
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
import { setTasksAction } from "./taskActions";
export const ADD_USER = "ADD_USER"; // Action to add the user to the redux store
export const EDIT_USER = "EDIT_USER"; // Action to edit the user

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
  let counter = 0; // counter to set the loading state
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    if (localStorage.Id) {
      myFirestore.collection("Portal_Users").onSnapshot((snapshot) => {
        // Iterating through the collection
        snapshot.forEach((doc) => {
          if (doc.data().id === localStorage.Id) {
            // When the user is found
            dispatch(addUserAction(doc.data())); // dispatching an action to add the user
            if (
              doc.data().Transactions_List &&
              doc.data().Transactions_List.length !== 0
            ) {
              // if transactions are present for the user
              dispatch(removeAllTransactionsFunction()); // dispatching an action to remove all the intially stored transactions
              doc.data().Transactions_List.forEach((transaction) => {
                // getting all transactions and storing it
                myFirestore
                  .collection("Transactions")
                  .doc(transaction)
                  .get()
                  .then((doc) => {
                    counter++; // incrementing the counter once a document is fetched
                    dispatch(
                      // storing the transactions in the redux store
                      addTransactionFunction({
                        id: transaction,
                        Buyer: doc.data().Buyer,
                        Completion: doc.data().Completion,
                        Paperwork: doc.data().Paperwork,
                        People: doc.data().People,
                        Stage: doc.data().Stage,
                        Address: doc.data().Address,
                        Tasks: doc.data().Tasks,
                        Name: doc.data().Name,
                      })
                    );
                    dispatch(setTasksAction(doc.data()));
                  })
                  .then(() => {
                    if (counter === doc.data().Transactions_List.length) {
                      // if the counter is equal to number of transactions
                      dispatch(setLoadingFalse()); // dispatching an action to set state to false once all the transactions are fetched
                      dispatch(setReload());
                    }
                  });
              });
            } else {
              // No transactions for the user
              dispatch(setLoadingFalse());
              dispatch(setReload());
            }
          }
        });
      });
    } else {
      dispatch(setErrors("Error, No Id found in Local storage"));
    }
  };
}

export function editUser(user) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    myFirestore.collection("Portal_Users").onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().id === localStorage.getItem("Id")) {
          // When the user is found
          myFirestore
            .collection("Portal_Users")
            .doc(doc.id)
            .update({
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
        }
      });
    });
  };
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
