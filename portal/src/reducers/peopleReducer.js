import * as actions from "../actions/peopleAction";

const initialState = { peopleSet: false, peopleArray: [] };

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_PEOPLE: {
      if (
        state.peopleArray.filter((people) => people.id === action.payload.id)
          .length === 0
      )
        state.peopleArray.push({
          id: action.payload.id,
          FirstName: action.payload.FirstName,
          LastName: action.payload.LastName,
          Role: action.payload.Role,
          Phone: action.payload.Phone,
          Email: action.payload.Email,
          PhotoUrl: action.payload.PhotoUrl,
          Company: action.payload.Company,
        });
      return state;
    }
    case actions.REMOVE_ALL: {
      return initialState;
    }
    case actions.SET_PEOPLE_LIST: {
      return {
        ...state,
        peopleSet: true,
      };
    }
    default: {
      return state;
    }
  }
}

export default peopleReducer;
