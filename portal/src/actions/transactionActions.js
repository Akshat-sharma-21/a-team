export const ADD_TRANSACTION = "ADD_TRANSACTION";

export function addTransactionFunction(payload) {
  // pure reducer
  return {
    type: ADD_TRANSACTION,
    payload,
  };
}
