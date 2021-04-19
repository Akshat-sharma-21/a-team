import * as actions from "../actions/transactionActions";

const initialState = []; // The initial state is an empty array

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRANSACTION: {
      return [
        ...state,
        {
          // All the details about the transaction
          id: action.payload.id,
          Address: action.payload.Address,
          Buyer: action.payload.Buyer,
          BuyerId: action.payload.BuyerId,
          Completion: action.payload.Completion,
          Floors: action.payload.Floors,
          HomeInspectionVoided: action.payload.HomeInspectionVoided,
          Pool: action.payload.Pool,
          SquareFt: action.payload.SquareFt,
          Stage: action.payload.Stage,
          // All the steps
          PreApproval: action.payload.PreApproval,
          FindAgent: action.payload.FindAgent,
          FindHome: action.payload.FindHome,
          EscrowTitle: action.payload.EscrowTitle,
          HomeInspection: action.payload.HomeInspection,
          HomeInsurance: action.payload.HomeInsurance,
          Closing: action.payload.Closing,
        },
      ];
    }
    case actions.REMOVE_ALL_TRANSACTIONS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default transactionReducer;
