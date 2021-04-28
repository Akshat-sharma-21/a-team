import * as actions from "../actions/taskActions";

const initialState = {
  SET: false,
  id: null,
  Address: null,
  Buyer: null,
  BuyerId: null,
  Completion: null,
  Floors: null,
  HomeInspectionVoided: null,
  Pool: null,
  SquareFt: null,
  Stage: null,
  // All the steps
  PreApproval: null,
  FindAgent: null,
  FindHome: null,
  EscrowTitle: null,
  HomeInspection: null,
  HomeInsurance: null,
  Closing: null,
  // Information for Initial Consultation
  Buyer: null,
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TASKS: {
      return {
        ...state,
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
        Buyer: null,
        SET: true,
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
    case actions.ADD_BUYER: {
      return {
        ...state,
        Buyer: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default taskReducer;
