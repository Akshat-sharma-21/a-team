export const SET_LOADING_TRUE = "SET_LOADING_TRUE";
export const SET_LOADING_FALSE = "SET_LOADING_FALSE";
export const SET_ERRORS = "SET_ERRORS";

export function setLoadingTrue() {
  return {
    type: SET_LOADING_TRUE,
  };
}

export function setLoadingFalse() {
  return {
    type: SET_LOADING_FALSE,
  };
}

export function setErrors(payload) {
  return {
    type: SET_ERRORS,
    error: payload,
  };
}
