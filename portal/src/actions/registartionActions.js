import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilActions";
import { myFirebase, myFirestore } from "../FirebaseConfig";

export const ADD_EMAIL = "ADD_EMAIL";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_PHONE = "VERIFY_PHONE";
export const INCREMENT_STEP = "INCREMENT_STEP";
export const DECREMENT_STEP = "DECREMENT_STEP";

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

export function verifyEmail(emailCode) {
  // function to check the email code
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    // implement the emailcode check with the cloud function
    dispatch(verifyEmailAction());
    dispatch(setLoadingFalse());
    dispatch(incrementStepAction());
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
