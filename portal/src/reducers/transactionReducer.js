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
          BuyerData: null, // To store the Buyer Data
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
    case actions.ADD_PREAPPROVAL_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.PreApproval = action.step;
        }
      });

      return state;
    }
    case actions.ADD_FINDAGENT_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.FindAgent = action.step;
        }
      });

      return state;
    }
    case actions.ADD_FINDHOME_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.FindHome = action.step;
        }
      });

      return state;
    }
    case actions.ADD_HOMEINSPECTION_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.HomeInspection = action.step;
        }
      });

      return state;
    }
    case actions.ADD_ESCROWTITLE_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.EscrowTitle = action.step;
        }
      });

      return state;
    }
    case actions.ADD_HOMEINSURANCE_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.HomeInsurance = action.step;
        }
      });

      return state;
    }
    case actions.ADD_CLOSING_TASK: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.Closing = action.step;
        }
      });

      return state;
    }
    case actions.ADD_BUYER_INFO: {
      state.map((transaction) => {
        if (transaction.id === action.tid) {
          transaction.BuyerData = action.buyerData;
        }
      });

      return state;
    }
    default: {
      return state;
    }
  }
}

export default transactionReducer;
