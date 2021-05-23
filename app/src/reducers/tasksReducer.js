import * as actions from "../actions/tasksActions";

const intialState = {
  // Defining the initial State
  PreApprovalTasks: [],
  FindAgentTasks: [],
  FindHomeTasks: [],
  EscrowTitleTasks: [],
  HomeInspectionTasks: [],
  HomeInsuranceTasks: [],
  ClosingTasks: [],
};

function tasksReducer(state = intialState, action) {
  switch (action.type) {
    case actions.SET_ALL_TASKS: {
      return {
        ...action.Tasks,
      };
    }
    default: {
      //returning the state
      return state;
    }
  }
}

export default tasksReducer;
