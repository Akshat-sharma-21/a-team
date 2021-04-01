import * as actions from "../actions/roadmapActions";

const initialState = {
  PreApproval: {},
  FindAgent: {},
  FindHome: {},
  EscrowTitle: {},
  HomeInspection: {},
  HomeInsurance: {},
  Closing: {},
  Professionals: [],
};

function roadmapReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_TRANSACTION: {
      return {
        ...action.transaction,
      };
    }
    default: {
      return state;
    }
  }
}

export default roadmapReducer;
