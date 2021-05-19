import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingFalse, setLoadingTrue } from "./utilsActions";

export function fetchHomeInsurance() {
  // function to fetch all the Home Insurance
  return new Promise((resolve, reject) => {
    let dataArray = [];
    myFirestore
      .collection("HomeInsurance")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          myFirestore
            .collection("Portal_Users")
            .doc(doc.data().id)
            .get()
            .then((ref) => {
              // Getting all the Home Insurance
              let obj = {
                ...ref.data(),
                id: ref.id,
              };
              dataArray.push(obj);
              if (dataArray.length === snapshot.size) {
                // If all the Home Insurance are fetched and stored in dataArray
                resolve(dataArray);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      })
      .catch((err) => {
        reject(err); // rejecting the promise if there is an error
      });
  });
}

export function selectHomeInsurance(id, tid) {
  // function to select the home insurance
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set Loading to true
    myFirestore
      .collection("Transactions")
      .doc(tid)
      .get()
      .then((doc) => {
        let HomeInsurance = doc.data().HomeInsurance;
        myFirestore
          .collection("Transactions")
          .doc(tid)
          .update({
            HomeInsurance: {
              ...HomeInsurance,
              Professional: id,
            },
          })
          .then(() => {
            dispatch(setLoadingFalse());
            window.location.href = "/home-insurance/tasks_summary"; //Moving back to tasks dashboard
          })
          .catch((err) => {
            dispatch(setErrors(err));
          });
      })
      .catch((err) => {
        setErrors(err);
      });
  };
}
