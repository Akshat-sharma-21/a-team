import * as actions from "../actions/documentsActions";

const initialState = {
  // Defining the initial State
  PreApprovalDocuments: [],
  FindAgentDocuments: [],
  FindHomeDocuments: [],
  EscrowTitleDocuments: [],
  HomeInspectionDocuments: [],
  HomeInsuranceDocuments: [],
  ClosingDocuments: [],
};

function documentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ALL_DOCUMENTS: {
      return {
        ...action.Documents,
      };
    }
    default: {
      // returning the state
      return state;
    }
  }
}

export default documentsReducer;
