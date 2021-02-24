import * as actions from "../actions/userActions";

const initialState = {
  id: null,
  Name: null,
  Email: null,
  Phone: null,
  Role: null,
  Company: null,
  Transactions: null,
  leadsTo: null,
  leadsFrom: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_USER: {
      return {
        ...state,
        id: action.id,
        Name: action.Name,
        Email: action.Email,
        Phone: action.Phone,
        Role: action.Role,
        Company: action.Company,
        Transactions: action.Transactions,
        leadsTo: action.leadsTo,
        leadsFrom: action.leadsFrom,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
