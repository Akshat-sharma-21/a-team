import { myFirebase, myFirestore } from "../FirebaseConfig";
import {
  setLoadingTrue,
  setLoadingFalse,
  setErrors,
  setReload,
} from "./utilActions";
import { addTransactionFunction } from "./transactionActions";
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
            dispatch(addUserAction(doc.data())); // dispatching an action to add the user
            if (
              doc.data().Transactions_List &&
              doc.data().Transactions_List.length !== 0
            ) {
              // if transactions are present for the user
              doc.data().Transactions_List.forEach((transaction) => {
                // getting all transactions and storing it
                myFirestore
                  .collection("Transactions")
                  .doc(transaction)
                  .get()
                  .then((doc) => {
                    dispatch(
                      // storing the transactions in the redux store
                      addTransactionFunction({
                        id: transaction,
                        Buyer: doc.data().Buyer,
                        Completion: doc.data().Completion,
                        Paperwork: doc.data().Paperwork,
                        Professionals: doc.data().Professionals,
                        Stage: doc.data().Stage,
                        Address: doc.data().Address,
                        Tasks: doc.data().Tasks,
                        Name: doc.data().Name,
                      })
                    );
                  })
                  .then(() => {
                    dispatch(setLoadingFalse()); // only setting loading to false once the transactions have been fetched and added
                    dispatch(setReload());
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
