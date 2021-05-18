import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilActions";
import axios from "axios";

export const ADD_PEOPLE = "ADD_PEOPLE";
export const REMOVE_ALL = "REMOVE_ALL";

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

export function fetchPeople(tid) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    dispatch(removeAllFunction()); // To clear the Redux state
    myFirestore
      .collection("Transactions")
      .doc(tid)
      .get()
      .then((doc) => {
        if (
          doc.data().PreApproval.Professional &&
          doc.data().PreApproval.Professional !== localStorage.Id // To check if the user is not itself
        ) {
          // If there is a Professional
          fetchPeopleHelper(doc.data().PreApproval.Professional)
            .then((data) => {
              dispatch(addPeopleFunction(data));
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        if (
          doc.data().FindAgent.Professional &&
          doc.data().FindAgent.Professional !== localStorage.Id // To check if the user is not itself
        ) {
          fetchPeopleHelper(doc.data().FindAgent.Professional)
            .then((data) => {
              dispatch(addPeopleFunction(data));
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        if (doc.data().HomeInspection.Professional) {
          fetchPeopleHelper(doc.data().HomeInspection.Professional)
            .then((data) => {
              dispatch(addPeopleFunction(data));
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        if (doc.data().EscrowTitle.Professional) {
          fetchPeopleHelper(doc.data().EscrowTitle.Professional)
            .then((data) => {
              dispatch(addPeopleFunction(data));
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        if (doc.data().HomeInsurance.Professional) {
          fetchPeopleHelper(doc.data().HomeInsurance.Professional)
            .then((data) => {
              dispatch(addPeopleFunction(data));
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        dispatch(setLoadingFalse());
      });
  };
}

export function sendMail(email, from, transaction, emailContent) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    axios
      .post("/send-email", {
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
