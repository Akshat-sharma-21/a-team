import * as actions from "../actions/userActions";

const initialState = {
  email: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_USER: {
      return {
        ...state,
        email: action.email,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
