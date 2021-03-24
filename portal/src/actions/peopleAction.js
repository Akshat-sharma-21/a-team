import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilActions";
import axios from "axios";

export const ADD_PEOPLE = "ADD_PEOPLE";
export const REMOVE_ALL = "REMOVE_ALL";

export function fetchPeople(tid) {
  let counter = 0; // To make sure the loading state is set properly
  return (dispatch) => {
    dispatch(setLoadingTrue());
    dispatch(removeAllFunction());
    myFirestore
      .collection("Transactions")
      .doc(tid)
      .get()
      .then((doc) => {
        if (doc.data().People && doc.data().length !== 0) {
          doc.data().People.forEach((person) => {
            counter++;
            myFirestore
              .collection("Portal_Users")
              .doc(person)
              .get()
              .then((doc) => {
                dispatch(addPeopleFunction(doc.data()));
              })
              .then(() => {
                if (counter === doc.data().People.length)
                  // only when all the people are fetched and added
                  dispatch(setLoadingFalse());
              })
              .catch((err) => {
                dispatch(setErrors(err));
              });
          });
        }
      })
      .catch((err) => {
        dispatch(setErrors());
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
