import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilActions";
import { myFirebase, myFirestore, baseUrl } from "../FirebaseConfig";
import axios from "axios";

export const ADD_EMAIL = "ADD_EMAIL";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_PHONE = "VERIFY_PHONE";
export const INCREMENT_STEP = "INCREMENT_STEP";
export const DECREMENT_STEP = "DECREMENT_STEP";
export const SET_EMAIL_HASH = "SET_EMAIL_HASH";
export const SET_PHONE_HASH = "SET_PHONE_HASH";

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
        dispatch(incrementStepAction(1)); // dispatching the action to increment the step
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function setPassword(email, password) {
  // function to set the password for the user
  return (dispatch) => {
    let Obj = null;
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Portal_Users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().Email === email) {
            Obj = doc.data(); // Storing the data of the object
            myFirebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((res) => {
                myFirestore
                  .collection("Portal_Users")
                  .doc(doc.id)
                  .delete()
                  .then(() => {
                    myFirestore
                      .collection("Portal_Users")
                      .doc(res.user.uid)
                      .set({
                        ...Obj,
                      })
                      .then(async () => {
                        let token = await res.user.getIdToken(); // getting the token
                        localStorage.setItem("Token", token);
                        localStorage.setItem("Id", res.user.uid); // Setting the Id
                        localStorage.setItem("phone", Obj.Phone); // Setting the

                        if (Obj.Role.toLowerCase() === "agent") {
                          // if the agent is setting up the account
                          await myFirestore
                            .collection("Agents")
                            .add({ id: res.user.uid });
                        } else if (Obj.Role.toLowerCase() === "lender") {
                          // if the lender is setting up the account
                          await myFirestore
                            .collection("Lenders")
                            .add({ id: res.user.uid });
                        }

                        dispatch(setPasswordAction());
                        dispatch(setLoadingFalse()); // Dispatching an action to set loading to false
                        dispatch(incrementStepAction(2)); // Incrementing to the next step
                      })
                      .catch((err) => {
                        dispatch(setErrors(err)); // dispatching an action to set the error
                      });
                  })
                  .catch((err) => {
                    dispatch(setErrors(err));
                  });
              })
              .catch((err) => {
                dispatch(setErrors(err)); // dispatching an action to set the error
              });
          }
        });
      });
  };
}

export function sendEmailOTP(email) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true

    axios // Getting the email hash for the next step and sending the verification email
      .post(
        `${baseUrl}/send-email-otp`,
        { email: email },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        dispatch(setEmailHashAction({ hash: res.data.hash })); // dispatching an action to set the hash
        dispatch(setLoadingFalse());
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
    axios
      .post(
        `${baseUrl}/verify-email`,
        {
          code: emailCode,
          hash: hash,
          id: localStorage.getItem("Id"),
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        if (res.data.verified === true) {
          // if the hash matches
          dispatch(verifyEmailAction());
          dispatch(incrementStepAction(3));
          dispatch(setLoadingFalse());
        } else {
          // dispatch an action to let user know that the entered email was incorrect
          dispatch(setErrors("incorrect email otp"));
        }
      })
      .catch((err) => {
        dispatch(setErrors(err));
        console.error(err);
      });
  };
}

export function sendPhoneOTP() {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    axios
      .post(
        `${baseUrl}/send-text-otp`,
        {
          phone: localStorage.getItem("phone"),
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        dispatch(setPhoneHashAction({ hash: res.data.hash }));
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function verifyPhone(phoneCode, hash) {
  // function to check the phone code
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true

    axios
      .post(
        `${baseUrl}/verify-phone`,
        {
          code: phoneCode,
          hash: hash,
          id: localStorage.getItem("Id"),
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        if (res.data.verified === true) {
          // if the hash matches
          dispatch(verifyPhoneAction());
          dispatch(incrementStepAction(4));
          dispatch(setLoadingFalse());
        } else {
          // dispatch an action to let user know that the entered email was incorrect
          dispatch(setErrors("incorrect text otp"));
        }
      });
  };
}

export function onboardUser(role, user) {
  // function to onboard the user
  axios.post(
    // making a post request to onboard the user
    `${baseUrl}/onboard-professional`,
    {
      role: role,
      user: user,
    }
  );
}

export function incrementStepAction(payload) {
  return {
    type: INCREMENT_STEP,
    payload,
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

function setPhoneHashAction(payload) {
  return {
    type: SET_PHONE_HASH,
    Hash: payload.hash,
  };
}
