export const ADD_TRANSACTION = "ADD_TRANSACTION";

export function addTransactionFunction(payload) {
  return {
    type: ADD_TRANSACTION,
    payload,
  };
}
