export const SET_LOADING_TRUE = "SET_LOADING_TRUE";
export const SET_LOADING_FALSE = "SET_LOADING_FALSE";
export const SET_ERRORS = "SET_ERRORS";
export const SET_RELOAD = "SET_RELOAD";

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

export function setReload(reload) {
  return {
    type: SET_RELOAD,
    reload,
  };
}
