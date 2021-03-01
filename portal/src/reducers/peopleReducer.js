import * as actions from "../actions/peopleAction";

const initialState = [];

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_PEOPLE: {
      console.log(action);
      return [
        ...state,
        {
          Name: action.payload.Name,
          Role: action.payload.Role,
          Phone: action.payload.Phone,
          Email: action.payload.Email,
        },
      ];
    }
    default: {
      return state;
    }
  }
}

export default peopleReducer;
