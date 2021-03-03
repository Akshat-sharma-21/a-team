import * as actions from "../actions/peopleAction";

const initialState = [];

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_PEOPLE: {
      return [
        ...state,
        {
          id: action.payload.id,
          FirstName: action.payload.FirstName,
          LastName: action.payload.LastName,
          Role: action.payload.Role,
          Phone: action.payload.Phone,
          Email: action.payload.Email,
          photoUrl: action.payload.photoUrl,
          Company: action.payload.Company,
        },
      ];
    }
    case actions.REMOVE_ALL: {
      return [];
    }
    default: {
      return state;
    }
  }
}

export default peopleReducer;
