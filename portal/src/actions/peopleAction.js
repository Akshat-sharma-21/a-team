import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilActions";

export const ADD_PEOPLE = "ADD_PEOPLE";
export const REMOVE_ALL = "REMOVE_ALL";

export function fetchPeople(tid) {
  let counter = 0; // To make sure the loading state is set properly
  return (dispatch) => {
    dispatch(setLoadingTrue());
    dispatch(removeAllFunction());
    myFirestore
      .collection("Transactions")
      .doc(tid)
      .get()
      .then((doc) => {
        if (doc.data().People && doc.data().length !== 0) {
          doc.data().People.forEach((person) => {
            counter++;
            myFirestore
              .collection("Portal_Users")
              .doc(person)
              .get()
              .then((doc) => {
                dispatch(addPeopleFunction(doc.data()));
              })
              .then(() => {
                if (counter === doc.data().People.length)
                  // only when all the people are fetched and added
                  dispatch(setLoadingFalse());
              })
              .catch((err) => {
                dispatch(setErrors(err));
              });
          });
        }
      })
      .catch((err) => {
        dispatch(setErrors());
      });
  };
}

function addPeopleFunction(payload) {
  // pure Reducer function
  return {
    type: ADD_PEOPLE,
    payload,
  };
}

function removeAllFunction() {
  // pure reducer function to set the people state to null
  return {
    type: REMOVE_ALL,
  };
}
