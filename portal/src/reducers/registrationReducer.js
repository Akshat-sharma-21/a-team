import * as actions from "../actions/registartionActions";

const initialState = {
  email: false,
  password: false,
  emailVerified: false,
  phoneVerified: false,
};

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_EMAIL: {
      return {
        ...state,
        email: true,
      };
    }
    case actions.ADD_PASSWORD: {
      return {
        ...state,
        password: true,
      };
    }
    case actions.VERIFY_EMAIL: {
      return {
        ...state,
        emailVerified: true,
      };
    }
    case actions.VERIFY_PHONE: {
      return {
        ...state,
        phoneVerified: true,
      };
    }
    default: {
      return state;
    }
  }
}

export default registrationReducer;
