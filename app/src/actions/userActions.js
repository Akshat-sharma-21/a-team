import { myFirebase, myFirestore } from "../FirebaseConfig";
import {
  setLoadingTrue,
  setLoadingFalse,
  setErrors,
  setReload,
} from "./utilsActions";
import {
  setTransactionAction,
  setActiveProfessionalAction,
} from "./roadmapActions";
import { setAllDocumentsAction } from "./documentsActions";
import axios from "axios";

export const SET_USER = "SET_USER"; // To set the user in the redux store

export function signup(user) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        myFirestore
          .collection("Users")
          .doc(res.user.uid)
          .set({
            Name: user.name,
            Email: user.email,
            Phone: user.phone,
            FirstTime: true, // This is used to showcase the onboarding screens
          })
          .then(() => {
            axios
              .post(
                "/create-transaction", // make sure to add proxy support
                {
                  buyer: user.name,
                  buyerId: res.user.uid,
                }
              )
              .then(() => {
                dispatch(setLoadingFalse());
                window.location.href = "/signin";
              })
              .catch((err) => {
                dispatch(setErrors(err));
              });
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function login(user) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        localStorage.setItem("Id", userCredentials.user.uid);
        return userCredentials.user.getIdToken();
      })
      .then((token) => {
        localStorage.setItem("Token", token);
        myFirestore
          .collection("Users")
          .doc(localStorage.getItem("Id"))
          .get()
          .then((doc) => {
            if (doc.data().FirstTime === true) {
              myFirestore
                .collection("Users")
                .doc(doc.id)
                .update({
                  FirstTime: false,
                })
                .then(() => {
                  dispatch(setLoadingFalse());
                  window.location.href = "/onboarding"; // moving to the desired location after signin
                })
                .catch((err) => {
                  dispatch(setErrors(err));
                });
            } else {
              dispatch(setLoadingFalse());
              window.location.href = "/dashboard";
            }
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function loginWithGoggle() {
  return (dispatch) => {
    myFirebase
      .auth()
      .signInWithRedirect(new myFirebase.auth.GoogleAuthProvider())
      .catch((err) => {
        dispatch(setErrors(err)); // dispatching an action to set the errors
      });
  };
}

export function loginWithFacebook() {
  return (dispatch) => {
    myFirebase
      .auth()
      .signInWithRedirect(new myFirebase.auth.FacebookAuthProvider())
      .catch((err) => {
        dispatch(setErrors(err)); // dispatching an action to set the errors
      });
  };
}

export function loginWithProviderHelper() {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirebase
      .auth()
      .getRedirectResult()
      .then((res) => {
        // only if there was a sign in with Redirect
        if (res.user !== null) {
          localStorage.setItem("Id", res.user.uid); // storing the uid in localStorage
          localStorage.setItem("Email", res.user.email); // storing the email of the user
          return res.user.getIdToken();
        } else {
          dispatch(setLoadingFalse()); // dispatching an action to set loading to false
        }
      })
      .then((token) => {
        if (token) {
          // if a token was passed
          localStorage.setItem("Token", token);
          myFirestore
            .collection("Users")
            .doc(localStorage.getItem("Id"))
            .get()
            .then((doc) => {
              if (!doc.exists) {
                // if the doc does not exist
                dispatch(setLoadingFalse());
                window.location.href = "/SignupWithProvider";
              } else {
                // if the basic information about the user exists
                window.location.href = "/dashboard"; // sending th
              }
            });
        }
      });
  };
}

export function signupWithProvider(user) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    myFirestore
      .collection("Users")
      .doc(localStorage.getItem("Id"))
      .set({
        Name: user.name,
        Email: user.email,
        Phone: user.phone,
        FirstTime: false, // This is set to false as we will automatically send the user to onboarding
      })
      .then(() => {
        axios
          .post("/create-transaction", {
            buyer: user.name,
            buyerId: localStorage.getItem("Id"),
          })
          .then(() => {
            dispatch(setLoadingFalse());
            window.location.href = "/onboarding";
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function fetchUser(step) {
  return (dispatch) => {
    let Id = localStorage.getItem("Id");
    dispatch(setLoadingTrue());
    myFirestore
      .collection("Users")
      .doc(Id)
      .get()
      .then((doc) => {
        dispatch(setUserAction(doc.data()));
        let transactionId = doc.data().Transaction; // getting the transaction id
        myFirestore
          .collection("Transactions")
          .doc(transactionId)
          .get()
          .then((docRef) => {
            dispatch(setTransactionAction(docRef.data())); // setting the transaction in the redux store
            dispatch(setAllDocumentsAction(docRef.data())); // Setting all the documents in the reduz store
            if (step === undefined || step === null) {
              // if no argument is passed
              dispatch(setReload());
              dispatch(setLoadingFalse());
            } else {
              // If a argument is passed
              if (step === "pre-approval") {
                if (docRef.data().PreApproval.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().PreApproval.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "find-agent") {
                if (docRef.data().FindAgent.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().FindAgent.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "find-home") {
                if (docRef.data().FindHome.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().FindHome.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "home-inspection") {
                if (docRef.data().HomeInspection.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().HomeInspection.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "escrow-title") {
                if (docRef.data().EscrowTitle.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().EscrowTitle.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "home-insurance") {
                if (docRef.data().HomeInsurance.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().HomeInsurance.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
              if (step === "closing") {
                if (docRef.data().Closing.Professional) {
                  myFirestore
                    .collection("Portal_Users")
                    .doc(docRef.data().Closing.Professional)
                    .get()
                    .then((obj) => {
                      let objData = {
                        Name: obj.data().FirstName + " " + obj.data().LastName,
                        Company: obj.data().Company,
                        Email: obj.data().Email,
                        Phone: obj.data().Phone,
                      }; // Storing the appropiate data
                      dispatch(setActiveProfessionalAction(objData));
                      dispatch(setReload());
                      dispatch(setLoadingFalse());
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  dispatch(setReload());
                  dispatch(setLoadingFalse());
                }
              }
            }
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

function setUserAction(payload) {
  // pure user action
  return {
    type: SET_USER,
    payload,
  };
}
