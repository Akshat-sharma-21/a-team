import { setLoadingFalse, setLoadingTrue, setErrors } from "./utilActions";
import axios from "axios";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const REMOVE_ALL_TRANSACTIONS = "REMOVE_ALL_TRANSACTIONS";

export function addTransactionFunction(payload) {
  // pure reducer
  return {
    type: ADD_TRANSACTION,
    payload,
  };
}

export function removeAllTransactionsFunction() {
  // pure reducer
  return {
    type: REMOVE_ALL_TRANSACTIONS,
  };
}

export function sendInvitation(email, phone, user) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    axios
      .post("/send-invitation", {
        email: email,
        phone: phone,
        user: {
          Id: localStorage.getItem("Id"),
          Role: user.Role,
          Name: user.FirstName + " " + user.LastName,
        },
      })
      .then((res) => {
        // add a snack alert to notify the user about the status of the invitation
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}
