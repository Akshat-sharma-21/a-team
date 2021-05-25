import * as actions from "../actions/userActions";

const initialState = {
  id: null,
  FirstName: null,
  LastName: null,
  Email: null,
  Phone: null,
  Role: null,
  Company: null,
  Transactions: null,
  leadsTo: null,
  leadsFrom: null,
  PhotoUrl: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_USER: {
      return {
        ...state,
        id: localStorage.Id,
        FirstName: action.payload.FirstName,
        LastName: action.payload.LastName,
        Email: action.payload.Email,
        Phone: action.payload.Phone,
        Role: action.payload.Role,
        Company: action.payload.Company,
        Transactions: action.payload.Transactions_List,
        leadsTo: action.payload.LeadsTo,
        leadsFrom: action.payload.LeadsFrom,
        PhotoUrl: action.payload.PhotoUrl,
      };
    }
    case actions.EDIT_USER: {
      return {
        ...state,
        FirstName: action.FirstName,
        LastName: action.LastName,
        Email: action.Email,
        Phone: action.Phone,
      };
    }
    default:
      return state;
  }
}

export default userReducer;
