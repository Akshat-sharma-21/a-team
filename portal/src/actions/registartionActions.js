import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilActions";
import { myFirebase, myFirestore } from "../FirebaseConfig";
import axios from "axios";

export const ADD_EMAIL = "ADD_EMAIL";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_PHONE = "VERIFY_PHONE";
export const INCREMENT_STEP = "INCREMENT_STEP";
export const DECREMENT_STEP = "DECREMENT_STEP";
export const SET_EMAIL_HASH = "SET_EMAIL_HASH";

export function addEmail(email) {
  // function to check if the email has access with the database
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching the action to set loading to true
    myFirestore
      .collection("Portal_Users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().Email === email) {
            dispatch(addEmailAction());
          }
        });
        dispatch(setLoadingFalse()); // dispatching the action to set loading to false
        dispatch(incrementStepAction()); // dispatching the action to increment the step
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function setPassword(email, password) {
  // function to set the password for the user
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true

    // Getting the email hash for the next step and sending the verification email
    axios
      .post("/send-email-otp", { email: email })
      .then((res) => {
        dispatch(setEmailHashAction({ hash: res.data.hash })); // dispatching an action to set the hash
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });

    myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userId = res.user.uid;
        myFirestore
          .collection("Portal_Users")
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().Email === email) {
                myFirestore
                  .doc(`Portal_Users/${doc.id}`)
                  .update({
                    id: userId,
                  })
                  .then(() => {
                    dispatch(setPasswordAction());
                    dispatch(setLoadingFalse()); // dispatching an action to set loading to false
                    dispatch(incrementStepAction()); // Incrementing the page
                  });
              }
            });
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function verifyEmail(emailCode, hash) {
  // function to check the email code

  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    // implement the emailcode check with the cloud function
    axios
      .post("/verify-email", {
        code: emailCode,
        hash: hash,
      })
      .then((res) => {
        if (res.data.verified === true) {
          // if the hash matches
          dispatch(verifyEmailAction());
          dispatch(incrementStepAction());
          dispatch(setLoadingFalse());
        } else {
          // dispatch an action to let user know that the entered email was incorrect
          dispatch(setErrors("incorrect email otp"));
        }
      });
  };
}

export function verifyPhone(phoneCode) {
  // function to check the phone code
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    // implement the phonecode check with the cloud function
    dispatch(verifyPhoneAction());
    dispatch(setLoadingFalse());
    dispatch(incrementStepAction());
  };
}

export function incrementStepAction() {
  return {
    type: INCREMENT_STEP,
  };
}

export function decrementStepAction() {
  return {
    type: DECREMENT_STEP,
  };
}

function addEmailAction() {
  // Pure Action to set the email state
  return {
    type: ADD_EMAIL,
  };
}

function setPasswordAction() {
  // Pure Action to set the password state
  return {
    type: ADD_PASSWORD,
  };
}

function verifyEmailAction() {
  // Pure Action to set the email verified state
  return {
    type: VERIFY_EMAIL,
  };
}

function verifyPhoneAction() {
  // Pure Action to set the phone verified state
  return {
    type: VERIFY_PHONE,
  };
}

function setEmailHashAction(payload) {
  // Pure Action to set the email hash
  return {
    type: SET_EMAIL_HASH,
    Hash: payload.hash,
  };
}
