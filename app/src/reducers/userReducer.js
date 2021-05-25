import * as actions from "../actions/userActions";

const initialState = {
  Name: "",
  Email: "",
  Phone: "",
  Transaction: "",
  PhotoUrl: null,
  emailVerified: null,
  phoneVerified: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER: {
      return {
        Name: action.payload.Name,
        Email: action.payload.Email,
        Phone: action.payload.Phone,
        Transaction: action.payload.Transaction,
        PhotoUrl: action.payload.PhotoUrl,
        emailVerified: action.payload.emailVerified,
        phoneVerified: action.payload.phoneVerified,
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
