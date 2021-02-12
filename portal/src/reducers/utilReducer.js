import * as actions from "../actions/utilActions";

const intitialState = {
  access: null,
  loading: null,
  errors: null,
};
function utilReducer(state = intitialState, action) {
  switch (action.type) {
    case actions.SET_ACCESS: {
      return {
        access: true,
        loading: false,
        errors: null,
      };
    }
    case actions.DENY_ACCESS: {
      return {
        access: false,
        loading: false,
        errors: null,
      };
    }
    default:
      return state;
  }
}

export default utilReducer;
