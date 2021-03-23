import { myFirestore } from "../FirebaseConfig";
import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilActions";

export const FETCH_TASKS = "FETCH_TASKS";
export const ADD_CLOSING_TASKS = "ADD_CLOSING_TASKS";
export const ADD_ESCROWTITLE_TASKS = "ADD_ESCROWTITLE_TASKS";
export const ADD_FINDAGENT_TASKS = "ADD_FINDAGENT_TASKS";
export const ADD_HOMEINSPECTION_TASKS = "ADD_HOMEINSPECTION_TASKS";
export const ADD_HOMEINSURANCE_TASKS = "ADD_HOMEINSURANCE_TASKS";
export const ADD_LOANAPPROVAL_TASKS = "ADD_LOANAPPROVAL_TASKS";
export const ADD_PREAPPROVAL_TASKS = "ADD_PREAPPROVAL_TASKS";

// export function fetchTasks(transactionId) {
//   // Action to fetch the tasks
//   return (dispatch) => {
//     dispatch(setLoadingTrue()); // dispatching an action to set loading to true
//     if (localStorage.Id) {
//       myFirestore
//         .collection("Transactions")
//         .doc(transactionId)
//         .get()
//         .then((doc) => {
//           if (doc.exists) {
//             dispatch(fetchTasksAction(doc.data()));
//           }
//         })
//         .then(
//           dispatch(setLoadingFalse()) // dispatching an action to set loading to false
//         );
//     } else {
//       dispatch(setErrors("Error, No Id found in Local storage"));
//     }
//   };
// }

export function fetchTasksAction(payload) {
  // Pure Action to add tasks to Redux
  return {
    type: FETCH_TASKS,
    payload,
  };
}
