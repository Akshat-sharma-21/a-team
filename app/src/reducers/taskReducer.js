import * as actions from "../actions/tasksActions";

const initialState = {
  Closing: null,
  EscrowTitle: null,
  FindAgent: null,
  HomeInspection: null,
  HomeInsurance: null,
  LoanApproval: null,
  PreApproval: null,
  Stage: "",
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TASKS: {
      return {
        ...state,
        Closing: action.payload.Closing,
        EscrowTitle: action.payload.EscrowTitle,
        FindAgent: action.payload.FindAgent,
        HomeInspection: action.payload.HomeInspection,
        HomeInsurance: action.payload.HomeInsurance,
        LoanApproval: action.payload.LoanApproval,
        PreApproval: action.payload.PreApproval,
        Stage: action.payload.Stage.step,
      };
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;
