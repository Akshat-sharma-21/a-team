import axios from "axios";
import { baseUrl } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilsActions";

export const SET_TRANSACTION = "SET_TRANSACTION";
export const SET_PROFESSIONAL = "SET_PROFESSIONAL";

export function assignAgent(tid, name, email, phone) {
  // function to assign the agent
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    axios
      .post(
        `${baseUrl}/assign-agent`,
        {
          tid: tid,
          user: {
            name: name,
            email: email,
            phone: phone,
          },
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then(() => {
        dispatch(setLoadingFalse());
        window.location.href = "/find-agent/tasks_summary";
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function createPaymentIntent(id, transId) {
  // function to get the payment intent
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${baseUrl}/get-payment-key`, // change to the baseUrl
        {
          // id: id,
          id: "JIYwrv0gHowa5bZKgZZL",
          transactionId: transId,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.Token },
        }
      )
      .then((obj) => {
        resolve(obj.data.clientKey);
      })
      .catch((err) => {
        console.error(err); // logging the error
        reject(err);
      });
  });
}

export function setTransactionAction(Transaction) {
  let transaction = {
    PreApproval: {
      Professional: Transaction.PreApproval.Professional,
      Locked: Transaction.PreApproval.Locked,
      Asked: Transaction.PreApproval.Asked,
      Questions: Transaction.PreApproval.Questions,
      Date: Transaction.PreApproval.Date,
    },
    FindAgent: {
      Professional: Transaction.FindAgent.Professional,
      Locked: Transaction.FindAgent.Locked,
      Asked: Transaction.FindAgent.Asked,
      Questions: Transaction.FindAgent.Questions,
      Date: Transaction.FindAgent.Date,
    },

    FindHome: {
      Locked: Transaction.FindHome.Locked,
      Date: Transaction.FindHome.Date,
      Setup: Transaction.FindHome.Setup,
    },
    EscrowTitle: {
      Professional: Transaction.EscrowTitle.Professional,
      Locked: Transaction.EscrowTitle.Locked,
      Date: Transaction.EscrowTitle.Date,
      Setup: Transaction.EscrowTitle.Setup,
    },
    HomeInspection: {
      Professional: Transaction.HomeInspection.Professional,
      Locked: Transaction.HomeInspection.Locked,
      Date: Transaction.HomeInspection.Date,
      Setup: Transaction.HomeInspection.Setup,
    },
    HomeInsurance: {
      Professional: Transaction.HomeInsurance.Professional,
      Locked: Transaction.HomeInsurance.Locked,
      Date: Transaction.HomeInsurance.Date,
      Setup: Transaction.HomeInsurance.Setup,
    },
    Closing: {
      Locked: Transaction.Closing.Locked,
      Date: Transaction.Closing.Date,
      Setup: Transaction.Closing.Setup,
    },
    Quotes: Transaction.Quotes,
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
