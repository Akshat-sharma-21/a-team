import * as actions from "../actions/userActions";

const initialState = {
  id: null,
  Name: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_USER: {
      return {
        ...state,
        id: action.id,
        Name: action.Name,
      };
    }
    default:
      return initialState;
  }
}

export default userReducer;
