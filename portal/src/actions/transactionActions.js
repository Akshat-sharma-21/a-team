export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const REMOVE_ALL_TRANSACTIONS = "REMOVE_ALL_TRANSACTIONS";

export function addTransactionFunction(payload) {
  // pure reducer
  return {
    type: ADD_TRANSACTION,
    payload,
  };
}

export function removeAllTransactionsFunction() {
  // pure reducer
  return {
    type: REMOVE_ALL_TRANSACTIONS,
  };
}
