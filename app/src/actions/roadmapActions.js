export const SET_TRANSACTION = "SET_TRANSACTION";

export function setTransactionAction(Transaction) {
  let transaction = {
    PreApproval: Transaction.PreApproval,
    FindAgent: Transaction.FindAgent,
    FindHome: Transaction.FindHome,
    EscrowTitle: Transaction.EscrowTitle,
    HomeInspection: Transaction.HomeInspection,
    HomeInsurance: Transaction.HomeInsurance,
    Closing: Transaction.Closing,
    Professionals: Transaction.Professionals,
  };
  return {
    type: SET_TRANSACTION,
    transaction,
  };
} // pure Action
