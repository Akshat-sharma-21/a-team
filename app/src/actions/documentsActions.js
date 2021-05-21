export const SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";

export function setAllDocumentsAction(transaction) {
  // pure action
  let Documents = {
    PreApprovalDocuments: transaction.PreApproval.Documents,
    FindAgentDocuments: transaction.FindAgent.Documents,
    FindHomeDocuments: transaction.FindHome.Documents,
    HomeInspectionDocuments: transaction.HomeInspection.Documents,
    EscrowTitleDocuments: transaction.EscrowTitle.Documents,
    HomeInsuranceDocuments: transaction.HomeInsurance.Documents,
    ClosingDocuments: transaction.Closing.Documents,
  };
  return {
    type: SET_ALL_DOCUMENTS,
    Documents,
  };
}
