import { myFirestore, baseUrl } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilActions";
import axios from "axios";

export const ADD_PEOPLE = "ADD_PEOPLE";
export const REMOVE_ALL = "REMOVE_ALL";
export const SET_PEOPLE_LIST = "SET_PEOPLE_LIST";

const fetchPeopleHelper = (id) => {
  // function to help fetch people
  return new Promise((resolve, reject) => {
    myFirestore
      .collection("Portal_Users")
      .doc(id)
      .get()
      .then((doc) => {
        resolve(doc.data());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function fetchPeople(transaction) {
  return async (dispatch) => {
    if (
      transaction.PreApproval.Professional !== null &&
      transaction.PreApproval.Professional !== localStorage.Id // Adding the Professional for PreApproval
    ) {
      await myFirestore
        .collection("Portal_Users")
        .doc(transaction.PreApproval.Professional)
        .get()
        .then((doc) => {
          dispatch(addPeopleFunction({ ...doc.data(), id: doc.id }));
        });
    }

    if (
      transaction.FindAgent.Professional !== null &&
      transaction.FindAgent.Professional !== localStorage.Id
    ) {
      await myFirestore
        .collection("Portal_Users")
        .doc(transaction.FindAgent.Professional)
        .get()
        .then((doc) => {
          dispatch(addPeopleFunction({ ...doc.data(), id: doc.id }));
        });
    }

    if (transaction.HomeInspection.Professional !== null) {
      await myFirestore
        .collection("Portal_Users")
        .doc(transaction.HomeInspection.Professional)
        .get()
        .then((doc) => {
          dispatch(addPeopleFunction(doc.data()));
        });
    }

    if (transaction.EscrowTitle.Professional !== null) {
      await myFirestore
        .collection("Portal_Users")
        .doc(transaction.EscrowTitle.Professional)
        .get()
        .then((doc) => {
          dispatch(addPeopleFunction(doc.data()));
        });
    }

    if (transaction.HomeInsurance.Professional !== null) {
      await myFirestore
        .collection("Portal_Users")
        .doc(transaction.HomeInsurance.Professional)
        .get()
        .then((doc) => {
          dispatch(addPeopleFunction(doc.data()));
        });
    }

    dispatch(setPeopleFunction());
  };
}

export function sendMail(email, from, transaction, emailContent) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    axios
      .post(`${baseUrl}/send-email`, {
        email: email,
        from: from,
        transaction: transaction,
        subject: emailContent.subject,
        message: emailContent.message,
      })
      .then((res) => {
        if (res.data.sent === true) {
          // if the email has been sent
          dispatch(setLoadingFalse());
        } else {
          dispatch(setErrors("Problem in sending the email"));
        }
      });
  };
}

function setPeopleFunction() {
  return {
    type: SET_PEOPLE_LIST,
  };
}

function addPeopleFunction(payload) {
  // pure Reducer function
  return {
    type: ADD_PEOPLE,
    payload,
  };
}

function removeAllFunction() {
  // pure reducer function to set the people state to null
  return {
    type: REMOVE_ALL,
  };
}
