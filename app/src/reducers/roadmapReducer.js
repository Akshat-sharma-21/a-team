import * as actions from "../actions/roadmapActions";

const initialState = {
  PreApproval: {},
  FindAgent: {},
  FindHome: {},
  EscrowTitle: {},
  HomeInspection: {},
  HomeInsurance: {},
  Closing: {},
  ActiveProfessional: {},
};

function roadmapReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TRANSACTION: {
      return {
        ...action.transaction,
      };
    }
    case actions.SET_PROFESSIONAL: {
      // Setting the active profession
      return {
        ...state,
        ActiveProfessional: action.professional,
      };
    }
    default: {
      return state;
    }
  }
}

export default roadmapReducer;
