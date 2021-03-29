import { myFirebase, myFirestore } from "../FirebaseConfig";
import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilsActions";

export const SET_TASKS = "SET_TASKS"; // To set the tasks in the redux store

export function fetchTasks(transactionId) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .get()
      .then((doc) => {
        dispatch(setTasks(doc.data()));
      })
      .then((doc) => {
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

function setTasks(payload) {
  // pure user action
  return {
    type: SET_TASKS,
    payload,
  };
}
