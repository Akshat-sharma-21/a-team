import * as actions from "../actions/transactionActions";

const initialState = []; // The initial state is an empty array

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRANSACTION: {
      return [
        ...state,
        {
          id: action.payload.id,
          Buyer: action.payload.Buyer,
          Completion: action.payload.Completion,
          Paperwork: action.payload.Paperwork,
          People: action.payload.People,
          Stage: action.payload.Stage,
          Address: action.payload.Address,
          Tasks: action.payload.Tasks,
          Name: action.payload.Name,
        },
      ];
    }
    default: {
      return state;
    }
  }
}

export default transactionReducer;
