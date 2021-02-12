export const SET_ACCESS = "SET_ACCESS";
export const DENY_ACCESS = "DENY_ACCESS";

export function setAccess() {
  return {
    type: SET_ACCESS,
  };
}

export function denyAccess() {
  return {
    type: DENY_ACCESS,
  };
}
