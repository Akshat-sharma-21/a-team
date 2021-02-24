import * as actions from "../actions/utilActions";

const intitialState = {
  loading: false,
  errors: null,
};
function utilReducer(state = intitialState, action) {
  switch (action.type) {
    case actions.SET_LOADING_TRUE: {
      return {
        loading: true,
        errors: null,
      };
    }
    case actions.SET_LOADING_FALSE: {
      return {
        loading: false,
        errors: false,
      };
    }
    case actions.SET_ERRORS: {
      return {
        loading: false,
        errors: action.error,
      };
    }
    default:
      return state;
  }
}

export default utilReducer;
