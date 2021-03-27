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

export function addClosingTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ Closing: newList })
      .then(
        dispatch(addClosing(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addEscrowTitleTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ EscrowTitle: newList })
      .then(
        dispatch(addEscrowTitle(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addFindAgentTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ FindAgent: newList })
      .then(
        dispatch(addFindAgent(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addHomeInspectionTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ HomeInspection: newList })
      .then(
        dispatch(addHomeInspection(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addHomeInsuranceTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ HomeInsurance: newList })
      .then(
        dispatch(addHomeInsurance(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addLoanApprovalTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ LoanApproval: newList })
      .then(
        dispatch(addLoanApproval(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addPreApprovalTask(list, newTask, transactionId) {
  let newTasks = list.Tasks;
  newTasks[newTasks.length] = newTask;
  let newList = { ...list, Tasks: newTasks };
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(transactionId)
      .update({ PreApproval: newList })
      .then(
        dispatch(addPreApproval(newList)),
        dispatch(setLoadingFalse()) // dispatching an action to set loading to false
      )
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function setTasksAction(payload) {
  // Pure Action to add fetched tasks to Redux
  return {
    type: FETCH_TASKS,
    payload,
  };
}

// Pure Action to add new tasks to Redux
function addClosing(payload) {
  return {
    type: ADD_CLOSING_TASKS,
    payload,
  };
}

function addEscrowTitle(payload) {
  return {
    type: ADD_ESCROWTITLE_TASKS,
    payload,
  };
}

function addFindAgent(payload) {
  return {
    type: ADD_FINDAGENT_TASKS,
    payload,
  };
}

function addHomeInspection(payload) {
  return {
    type: ADD_HOMEINSPECTION_TASKS,
    payload,
  };
}

function addHomeInsurance(payload) {
  return {
    type: ADD_HOMEINSURANCE_TASKS,
    payload,
  };
}

function addLoanApproval(payload) {
  return {
    type: ADD_LOANAPPROVAL_TASKS,
    payload,
  };
}

function addPreApproval(payload) {
  return {
    type: ADD_PREAPPROVAL_TASKS,
    payload,
  };
}
