import * as actions from "../actions/transactionActions";

const initialState = []; // The initial state is an empty array

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TRANSACTION: {
      return [
        ...state,
        {
          ...action.payload, // Storing the transaction
        },
      ];
    }
    default: {
      return state;
    }
  }
}

export default transactionReducer;
