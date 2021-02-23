export const ADD_EMAIL = "ADD_EMAIL";
export const ADD_PASSWORD = "ADD_PASSWORD";
export const VERIFY_EMAIL = "VERIFY_EMAIL";
export const VERIFY_PHONE = "VERIFY_PHONE";

export function addEmail(email) {
  // function to check if the email has access with the database
  return (dispatch) => {
    dispatch(addEmailAction());
  };
}

export function setPassword(password) {
  // fucntion to set the password for the user
  return (dispatch) => {
    dispatch(setPasswordAction());
  };
}

export function verifyEmail(emailCode) {
  // function to check the email code
  return (dispatch) => {
    dispatch(verifyEmailAction());
  };
}

export function verifyPhone(phoneCode) {
  // function to check the phone code
  return (dispatch) => {
    dispatch(verifyPhoneAction());
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
