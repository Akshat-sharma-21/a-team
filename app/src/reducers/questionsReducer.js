import * as actions from "../actions/questionActions";

const initialState = {
  bg: 0, // setting the initial cbg counter to 0
};

function questionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_QUESTION: {
      return {
        ...action.payload,
        bg: state.bg === 0 ? 1 : state.bg === 1 ? 2 : 1, // if bg is 0 set it to 1 or if bg is 1 then set it to 2
      }; // all the questions with their answers are returned from the api call
    }
    case actions.COMPLETED_QUESTIONS: {
      return {
        bg: 3, // setting bg to 3
      };
    }
    case actions.CLEAR_QUESTION: {
      return initialState; // setting the state to null
    }
    default: {
      return state;
    }
  }
}

export default questionReducer;
