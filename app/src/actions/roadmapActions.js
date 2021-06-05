import axios from "axios";
import { baseUrl } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilsActions";

export const SET_TRANSACTION = "SET_TRANSACTION";
export const SET_PROFESSIONAL = "SET_PROFESSIONAL";

export function setupTasks(tid, step) {
  return (dispatch) => {
    let url = "";
    if (step === "FindHome") url = "find-home";
    else if (step === "EscrowTitle") url = "escrow-title";
    else if (step === "HomeInspection") url = "home-inspection";
    else if (step === "HomeInsurance") url = "home-insurance";
    else if (step === "Closing") url = "closing";
    axios
      .post(`${baseUrl}/${url}`, {
        tid: tid,
      })
      .then((res) => {
        if (res.data.completed === true)
          window.location.href = `${url}/tasks_summary`;
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function assignAgent(tid, name, email, phone) {
  // function to assign the agent
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    axios
      .post(`${baseUrl}/assign-agent`, {
        tid: tid,
        user: {
          name: name,
          email: email,
          phone: phone,
        },
      })
      .then(() => {
        dispatch(setLoadingFalse());
        window.location.href = "/find-agent/tasks_summary";
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
      Questions: Transaction.PreApproval.Questions,
    },
    FindAgent: {
      Professional: Transaction.FindAgent.Professional,
      Locked: Transaction.FindAgent.Locked,
      Asked: Transaction.FindAgent.Asked,
      Questions: Transaction.FindAgent.Questions,
    },

    FindHome: {
      Locked: Transaction.FindHome.Locked,
    },
    EscrowTitle: {
      Professional: Transaction.EscrowTitle.Professional,
      Locked: Transaction.EscrowTitle.Locked,
    },
    HomeInspection: {
      Professional: Transaction.HomeInspection.Professional,
      Locked: Transaction.HomeInspection.Locked,
    },
    HomeInsurance: {
      Professional: Transaction.HomeInsurance.Professional,
      Locked: Transaction.HomeInsurance.Locked,
    },
    Closing: {
      Locked: Transaction.Closing.Locked,
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
