import * as actions from "../actions/utilsActions";

const intitialState = {
  reload: true, // To check whether we need to fetch the data again
  loading: false,
  errors: null,
};
function utilReducer(state = intitialState, action) {
  switch (action.type) {
    case actions.SET_LOADING_TRUE: {
      return {
        ...state,
        loading: true,
        errors: null,
      };
    }
    case actions.SET_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
        errors: null,
      };
    }
    case actions.SET_ERRORS: {
      return {
        ...state,
        loading: false,
        errors: action.error,
      };
    }
    case actions.SET_RELOAD: {
      return {
        ...state,
        reload: false,
      };
    }
    case actions.CLEAR_ERRORS: {
      return {
        ...state,
        errors: null,
      };
    }
    default:
      return state;
  }
}

export default utilReducer;
