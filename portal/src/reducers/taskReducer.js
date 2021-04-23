import * as actions from "../actions/taskActions";

const initialState = {
  Closing: null,
  EscrowTitle: null,
  FindAgent: null,
  FindHome: null,
  HomeInspection: null,
  HomeInsurance: null,
  PreApproval: null,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TASKS: {
      return {
        ...state,
        PreApproval: action.payload.PreApproval,
        FindAgent: action.payload.FindAgent,
        FindHome: action.payload.FindHome,
        EscrowTitle: action.payload.EscrowTitle,
        HomeInspection: action.payload.HomeInspection,
        HomeInsurance: action.payload.HomeInsurance,
        Closing: action.payload.Closing,
      };
    }
    case actions.ADD_CLOSING_TASKS: {
      return {
        ...state,
        PreApproval: action.payload,
      };
    }
    case actions.ADD_ESCROWTITLE_TASKS: {
      return {
        ...state,
        EscrowTitle: action.payload,
      };
    }
    case actions.ADD_FINDAGENT_TASKS: {
      return {
        ...state,
        FindAgent: action.payload,
      };
    }
    case actions.ADD_HOMEINSPECTION_TASKS: {
      return {
        ...state,
        HomeInspection: action.payload,
      };
    }
    case actions.ADD_HOMEINSURANCE_TASKS: {
      return {
        ...state,
        HomeInsurance: action.payload,
      };
    }
    case actions.ADD_FINDHOME_TASKS: {
      return {
        ...state,
        FindHome: action.payload,
      };
    }
    case actions.ADD_PREAPPROVAL_TASKS: {
      return {
        ...state,
        PreApproval: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;
