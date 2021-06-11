import { setLoadingFalse, setLoadingTrue, setErrors } from "./utilActions";
import axios from "axios";
import { myFirestore, baseUrl } from "../FirebaseConfig";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const REMOVE_ALL_TRANSACTIONS = "REMOVE_ALL_TRANSACTIONS";
export const ADD_PREAPPROVAL_TASK = "ADD_PREAPPROVAL_TASK";
export const ADD_FINDAGENT_TASK = "ADD_FINDAGENT_TASK";
export const ADD_FINDHOME_TASK = "ADD_FINDHOME_TASK";
export const ADD_HOMEINSPECTION_TASK = "ADD_HOMEINSPECTION_TASK";
export const ADD_ESCROWTITLE_TASK = "ADD_ESCROWTITLE_TASK";
export const ADD_HOMEINSURANCE_TASK = "ADD_HOMEINSURANCE_TASK";
export const ADD_CLOSING_TASK = "ADD_CLOSING_TASK";
export const ADD_BUYER_INFO = "ADD_BUYER_INFO";

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
      .post(
        `${baseUrl}/send-invitation`,
        {
          email: email,
          phone: phone,
          user: {
            Id: localStorage.getItem("Id"),
            Role: user.Role,
            Name: user.FirstName + " " + user.LastName,
          },
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then(() => {
        // add a snack alert to notify the user about the status of the invitation
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function answerAgentQuestions(tid, answer) {
  myFirestore
    .collection("Transactions")
    .doc(tid)
    .update({
      ClosingDate: answer.closingDate,
      Floors: answer.floors,
      Address: answer.address,
      Pool: answer.pool,
      SquareFt: answer.sqft,
      HomeInspectionVoided: answer.homeInspectionVoided,
    })
    .catch((err) => {
      console.error(err); // logging the error
    });
}

export function fetchBuyerInfo(buyerId, tid) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    myFirestore
      .collection("Users")
      .doc(buyerId)
      .get()
      .then((doc) => {
        dispatch(addBuyerInfo({ tid: tid, buyerData: doc.data() }));
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function addTask(tid, task, step, stepObj) {
  return (dispatch) => {
    stepObj.Tasks.push(task);
    if (step === "Pre-approval") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({
          PreApproval: stepObj,
        })
        .then(() => {
          dispatch(addPreapprovalFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Find Agent") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({
          FindAgent: stepObj,
        })
        .then(() => {
          dispatch(addFindAgentFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Find Home") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({
          FindHome: stepObj,
        })
        .then(() => {
          dispatch(addFindHomeFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Home Inspection") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({ HomeInspection: stepObj })
        .then(() => {
          dispatch(addHomeInspectionFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Escrow & Title") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({ EscrowTitle: stepObj })
        .then(() => {
          dispatch(addEscrowTitleFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Home Insurance") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({ HomeInsurance: stepObj })
        .then(() => {
          dispatch(addHomeInsuranceFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else if (step === "Closing") {
      myFirestore
        .collection("Transactions")
        .doc(tid)
        .update({ Closing: stepObj })
        .then(() => {
          dispatch(addClosingFunction({ tid: tid, step: stepObj }));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    } else {
      dispatch(setErrors("Error in Add task"));
    }
  };
}

function addPreapprovalFunction(payload) {
  return {
    type: ADD_PREAPPROVAL_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addFindAgentFunction(payload) {
  return {
    type: ADD_FINDAGENT_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addFindHomeFunction(payload) {
  return {
    type: ADD_FINDHOME_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addHomeInspectionFunction(payload) {
  return {
    type: ADD_HOMEINSPECTION_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addEscrowTitleFunction(payload) {
  return {
    type: ADD_ESCROWTITLE_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addHomeInsuranceFunction(payload) {
  return {
    type: ADD_HOMEINSURANCE_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}

function addClosingFunction(payload) {
  return {
    type: ADD_CLOSING_TASK,
    tid: payload.tid,
    step: payload.step,
  };
}
function addBuyerInfo(payload) {
  return {
    type: ADD_BUYER_INFO,
    tid: payload.tid,
    buyerData: payload.buyerData,
  };
}
