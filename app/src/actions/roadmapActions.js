import axios from "axios";
import { setErrors } from "./utilsActions";

export const SET_TRANSACTION = "SET_TRANSACTION";
export const SET_PROFESSIONAL = "SET_PROFESSIONAL";

export function setupTasks(tid, step) {
  return (dispatch) => {
    let url = "";
    if (step === "FindHome") url = "/find-home";
    else if (step === "EscrowTitle") url = "/escrow-title";
    else if (step === "HomeInspection") url = "/home-inspection";
    else if (step === "HomeInsurance") url = "/home-insurance";
    else if (step === "Closing") url = "/closing";
    axios
      .post(url, {
        tid: tid,
      })
      .then((res) => {
        if (res.data.completed === true)
          window.location.href = "/tasks_summary";
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function setTransactionAction(Transaction) {
  let transaction = {
    PreApproval: Transaction.PreApproval,
    FindAgent: Transaction.FindAgent,
    FindHome: Transaction.FindHome,
    EscrowTitle: Transaction.EscrowTitle,
    HomeInspection: Transaction.HomeInspection,
    HomeInsurance: Transaction.HomeInsurance,
    Closing: Transaction.Closing,
  };
  return {
    type: SET_TRANSACTION,
    transaction,
  };
} // pure Action

export function setActiveProfessionalAction(professional) {
  // pure Action
  return {
    type: SET_PROFESSIONAL,
    professional,
  };
}
