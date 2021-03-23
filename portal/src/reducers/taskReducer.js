import * as actions from "../actions/taskActions";

const initialState = {
  Closing: null,
  EscrowTitle: null,
  FindAgent: null,
  HomeInspection: null,
  HomeInsurance: null,
  LoanApproval: null,
  PreApproval: null,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TASKS: {
      return {
        ...state,
        Closing: action.payload.Closing,
        EscrowTitle: action.payload.EscrowTitle,
        FindAgent: action.payload.FindAgent,
        HomeInspection: action.payload.HomeInspection,
        HomeInsurance: action.payload.HomeInsurance,
        LoanApproval: action.payload.LoanApproval,
        PreApproval: action.payload.PreApproval,
      };
    }
    case actions.ADD_CLOSING_TASKS: {
      return {
        ...state,
        PreApproval: action.payload.PreApproval,
      };
    }
    case actions.ADD_ESCROWTITLE_TASKS: {
      return {
        ...state,
        EscrowTitle: action.payload.EscrowTitle,
      };
    }
    case actions.ADD_FINDAGENT_TASKS: {
      return {
        ...state,
        FindAgent: action.payload.FindAgent,
      };
    }
    case actions.ADD_HOMEINSPECTION_TASKS: {
      return {
        ...state,
        HomeInspection: action.payload.HomeInspection,
      };
    }
    case actions.ADD_HOMEINSURANCE_TASKS: {
      return {
        ...state,
        HomeInsurance: action.payload.HomeInsurance,
      };
    }
    case actions.ADD_LOANAPPROVAL_TASKS: {
      return {
        ...state,
        LoanApproval: action.payload.LoanApproval,
      };
    }
    case actions.ADD_PREAPPROVAL_TASKS: {
      return {
        ...state,
        PreApproval: action.payload.PreApproval,
      };
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;
