import * as actions from "../actions/registartionActions";

const initialState = {
  step: 0,
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
    case actions.INCREMENT_STEP: {
      return {
        ...state,
        step: state.step + 1,
      };
    }
    case actions.DECREMENT_STEP: {
      if (state.step - 1 === 0) {
        // if conditions added to deal with a potential bug of not valid emails advancing to next steps
        return {
          step: 0,
          email: false,
          password: false,
          emailVerified: false,
          phoneVerified: false,
        };
      } else if (state.step - 1 === 1) {
        return {
          step: 1,
          email: true,
          password: false,
          emailVerified: false,
          phoneVerified: false,
        };
      } else if (state.step - 1 === 2) {
        return {
          step: 2,
          email: true,
          password: true,
          emailVerified: false,
          phoneVerified: false,
        };
      }
    }
    default: {
      return state;
    }
  }
}

export default registrationReducer;
