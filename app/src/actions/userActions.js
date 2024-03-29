import { myFirebase, myFirestore, myStorage, baseUrl } from "../FirebaseConfig";
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
import { setAllTasksAction } from "./tasksActions";
import queryString from "query-string";
import axios from "axios";

export const SET_USER = "SET_USER"; // To set the user in the redux store

export function signup(user, professional) {
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
            PhotoUrl: null, // This is used to store the photo url
          })
          .then(async () => {
            let token = await res.user.getIdToken(); // waiting for the token
            localStorage.setItem("Token", token); // storing the token in the local storage
            axios
              .post(
                `${baseUrl}/create-transaction`,
                {
                  buyer: {
                    // sending user data
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                  },
                  buyerId: res.user.uid,
                  professional: professional, // Sending the professional
                },
                { headers: { Authorization: "Bearer " + token } } // sending the bearer token
              )
              .then(() => {
                dispatch(setLoadingFalse());
                localStorage.setItem("Id", res.user.uid);
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userPhone", user.phone);
                window.location.href = "/verifyEmail";
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
            if (
              doc.data().emailVerified === true &&
              doc.data().phoneVerified === true
            ) {
              // If the user has verified both the email and phone
              dispatch(setLoadingFalse());
              window.location.href = "/dashboard";
            } else {
              if (doc.data().emailVerified !== true) {
                // If the user has not verified the email
                localStorage.setItem("userEmail", doc.data().Email);
                localStorage.setItem("userPhone", doc.data().Phone);
                window.location.href = "/verifyEmail";
              } else {
                // If the user has not verified the phone
                localStorage.setItem("userPhone", doc.data().Phone);
                window.location.href = "/verifyPhone";
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
          localStorage.setItem("Token", token); // storing the token in local storage
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
                if (doc.data().phoneVerified === true) {
                  // If the phone is verified
                  window.location.href = "/dashboard"; // sending the user to dashboard
                } else {
                  localStorage.setItem("userPhone", doc.data().Phone);
                  window.location.href = "/verifyPhone";
                }
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
        FirstTime: true,
        emailVerified: true, // Automatically setting the email verified to true if the user uses google or facebook
        PhotoUrl: null, // This is used to store the photo url
      })
      .then(() => {
        localStorage.setItem("userPhone", user.phone); // Storing user's phone in loclaStorage
        axios
          .post(
            `${baseUrl}/create-transaction`,
            {
              buyer: user.name,
              buyerId: localStorage.getItem("Id"),
            },
            { headers: { Authorization: "Bearer " + localStorage.Token } }
          )
          .then(() => {
            dispatch(setLoadingFalse());
            window.location.href = "/verifyPhone";
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
        if (doc.data().FirstTime) {
          // if the user is using the app for the first time
          myFirestore
            .collection("Users")
            .doc(Id)
            .update({
              FirstName: false, // setting the FirstTime property to false
            })
            .catch((err) => {
              dispatch(setErrors(err));
            });
        }
        let transactionId = doc.data().Transaction; // getting the transaction id
        myFirestore
          .collection("Transactions")
          .doc(transactionId)
          .get()
          .then((docRef) => {
            dispatch(setTransactionAction(docRef.data())); // setting the transaction in the redux store
            dispatch(setAllDocumentsAction(docRef.data())); // Setting all the documents in the redux store
            dispatch(setAllTasksAction(docRef.data())); // Setting all the tasks in the redux store
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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
                        PhotoUrl: obj.data().PhotoUrl, // Getting the professional's Photo
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

export function fetchProfessional(id) {
  return new Promise((resolve, reject) => {
    myFirestore
      .collection("Portal_Users")
      .doc(id)
      .get()
      .then((docRef) => {
        if (docRef.data()) {
          resolve(docRef.data());
        } else {
          console.error("No professional not found");
          reject();
        }
      })
      .catch((err) => {
        console.error(err); // logging the error
        reject();
      });
  });
}

export function sendEmailOtp() {
  // Function to send the email otp
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    axios
      .post(
        `${baseUrl}/send-email-otp`,
        { email: localStorage.userEmail },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        localStorage.removeItem("userEmail"); // Removing user's email from the local storage
        localStorage.setItem("emailHash", res.data.hash); // Storing the hash returned from the email
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function verifyEmail(otp) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    otp = otp.replaceAll(",", ""); // Extracting the otp from its string format
    axios
      .post(
        `${baseUrl}/verify-email`,
        {
          code: otp,
          hash: localStorage.emailHash,
          id: localStorage.Id,
          user: true,
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        if (res.data.verified === true) {
          localStorage.removeItem("emailHash");
          dispatch(setLoadingFalse());
          window.location.href = "/verifyPhone";
        } else {
          dispatch(setErrors("incorrect email otp"));
        }
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function sendPhoneOtp() {
  // Function to send the otp
  return (dispatch) => {
    dispatch(setLoadingTrue());
    axios
      .post(
        `${baseUrl}/send-text-otp`,
        {
          phone: localStorage.userPhone,
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        localStorage.removeItem("userPhone");
        localStorage.setItem("phoneHash", res.data.hash);
        dispatch(setLoadingFalse());
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function verifyPhone(otp) {
  return (dispatch) => {
    dispatch(setLoadingTrue());
    otp = otp.replaceAll(",", "");
    axios
      .post(
        `${baseUrl}/verify-phone`,
        {
          code: otp,
          hash: localStorage.phoneHash,
          id: localStorage.Id,
          user: true,
        },
        { headers: { Authorization: "Bearer " + localStorage.Token } }
      )
      .then((res) => {
        if (res.data.verified === true) {
          localStorage.removeItem("phoneHash");
          myFirestore
            .collection("Users")
            .doc(localStorage.Id)
            .get() // fetching the user
            .then((doc) => {
              dispatch(setLoadingFalse()); // dispatching an action to set loading to false
              if (doc.data().FirstTime === true) {
                window.location.href = "/onboarding";
              } else {
                window.location.href = "/dashboard"; // signing in the user
              }
            })
            .catch((err) => {
              dispatch(setErrors(err)); // dispatching an action to set the errors
            });
        } else {
          dispatch(setErrors("incorrect phone otp"));
        }
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function uploadPicture(file) {
  return new Promise((resolve, reject) => {
    // returning a new promise
    let fileRef = myStorage.ref().child(`users/${localStorage.Id}`);
    fileRef.listAll().then((files) => {
      if (files.items.length === 0) {
        // If the document is not already stored
        fileRef
          .put(file)
          .then((snapshot) => {
            if (snapshot.bytesTransferred === snapshot.totalBytes) {
              // If the document is uploaded
              fileRef
                .getDownloadURL()
                .then((url) => {
                  // Getting the downloadable url
                  myFirestore
                    .collection("Users")
                    .doc(localStorage.Id)
                    .update({
                      PhotoUrl: url,
                    })
                    .then(() => {
                      resolve(url); // Resolving the promise
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        fileRef
          .delete()
          .then(() => {
            fileRef
              .put(file)
              .then((snapshot) => {
                if (snapshot.bytesTransferred === snapshot.totalBytes) {
                  // If the document is uploaded
                  fileRef
                    .getDownloadURL()
                    .then((url) => {
                      // Getting the downloadable url
                      myFirestore
                        .collection("Users")
                        .doc(localStorage.Id)
                        .update({
                          PhotoUrl: url,
                        })
                        .then(() => {
                          resolve(url); // Resolving the promise
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });
}

export function updateUser(updatedData) {
  return new Promise((resolve, reject) => {
    // returning new Promise
    if (updatedData.emailChanged === true) {
      // if the email is updated
      myFirebase
        .auth()
        .fetchSignInMethodsForEmail(updatedData.Email)
        .then((doc) => {
          if (doc.length === 0) {
            // if the email is not linked with another account
            myFirestore
              .collection("Users")
              .doc(localStorage.Id)
              .update({
                Name: updatedData.Name,
                Email: updatedData.Email,
                Phone: updatedData.Phone,
                emailVerified:
                  updatedData.emailVerified === false
                    ? false
                    : !updatedData.emailChanged,
                phoneVerified:
                  updatedData.phoneVerified === false
                    ? false
                    : !updatedData.phoneChanged,
              })
              .then(() => {
                resolve();
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            reject("Email already linked with other account");
          }
        });
    } else {
      myFirestore
        .collection("Users")
        .doc(localStorage.Id)
        .update({
          Name: updatedData.Name,
          Email: updatedData.Email,
          Phone: updatedData.Phone,
          emailVerified:
            updatedData.emailVerified === false
              ? false
              : !updatedData.emailChanged,
          phoneVerified:
            updatedData.phoneVerified === false
              ? false
              : !updatedData.phoneChanged,
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export function passwordResetLink(email) {
  // function to send the password reset link
  return (dispatch) => {
    dispatch(setLoadingTrue());
    myFirebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(setLoadingFalse());
        window.location.href = "/check-mail";
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function handlePasswordReset(password, url) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    const query = queryString.parse(url); // parsing the url
    myFirebase
      .auth()
      .confirmPasswordReset(query.oobCode, password)
      .then(() => {
        dispatch(setLoadingFalse()); // dispatching an action to set loading to false
        window.location.href = "/signin"; // returning to the signin screen
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function setUserAction(payload) {
  // pure user action
  return {
    type: SET_USER,
    payload,
  };
}
