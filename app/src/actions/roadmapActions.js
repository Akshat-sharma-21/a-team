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
    PreApproval: {
      Professional: Transaction.PreApproval.Professional,
      Locked: Transaction.PreApproval.Locked,
      Asked: Transaction.PreApproval.Asked,
    },
    FindAgent: {
      Professional: Transaction.FindAgent.Professional,
      Locked: Transaction.FindAgent.Locked,
      Asked: Transaction.FindAgent.Asked,
    },

    FindHome: {
      Asked: Transaction.FindHome.Asked,
      Locked: Transaction.FindHome.Locked,
    },
    EscrowTitle: {
      Asked: Transaction.EscrowTitle.Asked,
      Professional: Transaction.EscrowTitle.Professional,
      Locked: Transaction.EscrowTitle.Locked,
    },
    HomeInspection: {
      Professional: Transaction.HomeInspection.Professional,
      Locked: Transaction.HomeInspection.Locked,
      Asked: Transaction.HomeInspection.Asked,
    },
    HomeInsurance: {
      Professional: Transaction.HomeInsurance.Professional,
      Locked: Transaction.HomeInsurance.Locked,
      Asked: Transaction.HomeInsurance.Asked,
    },
    Closing: {
      Locked: Transaction.Closing.Locked,
      Asked: Transaction.Closing.Asked,
    },
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
