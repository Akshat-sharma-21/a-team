import { myFirebase, myFirestore } from "../FirebaseConfig";

export function signup(user) {
  return (dispatch) => {
    // dispatch an action to set loading to true
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
            // dispatch an action to set loading to false
            window.location.href = "/signin";
          })
          .catch((err) => {
            //dispatch an action to set the error
          });
      })
      .catch((err) => {
        // dispatch an action to catch the error
      });
  };
}

export function login(user) {
  return (dispatch) => {
    // dispatch an action here to set loading to true
    myFirebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        localStorage.setItem("Id", userCredentials.user.uid);
        return userCredentials.user.getIdToken();
      })
      .then((token) => {
        localStorage.setItem("Token", token);
        // dispatch an action to set loading to false
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
                  // dispatch an action to set loading to false
                  window.location.href = "/onboard"; // moving to the desired location after signin
                })
                .catch((err) => {
                  //dispatch an action to set errors
                });
            } else {
              // dispatch an action to set loading to false
              window.location.href = "/roadmap";
            }
          })
          .catch((err) => {
            // dispatch an action to catch the errors
          });
      })
      .catch((err) => {
        //dispatch an action to catch the error here
      });
  };
}
