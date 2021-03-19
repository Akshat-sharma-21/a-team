import * as actions from "../actions/userActions";

const initialState = {
  Name: "",
  Email: "",
  Phone: "",
  Transaction: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER: {
      return {
        Name: action.payload.Name,
        Email: action.payload.Email,
        Phone: action.payload.Phone,
        Transaction: action.payload.Transaction,
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
