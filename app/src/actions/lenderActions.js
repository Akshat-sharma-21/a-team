import { myFirestore } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilsActions";

export function fetchLenders() {
  // function to fetch all the lenders
  return new Promise((resolve, reject) => {
    let dataArray = [];
    myFirestore
      .collection("Lenders")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          myFirestore
            .collection("Portal_Users")
            .doc(doc.data().id)
            .get()
            .then((ref) => {
              // Getting all the lenders
              let obj = {
                ...ref.data(),
                id: ref.id,
              }; // Storing the id of the lenders as well
              dataArray.push(obj);
              if (dataArray.length === snapshot.size) {
                // If all the lenders are fetched and stored
                resolve(dataArray);
              }
            })
            .catch((err) => {
              reject(err);
            });
        });
      })
      .catch((err) => {
        reject(err); // rejecting the promise
      });
  });
}

export function selectLender(id, tid) {
  // Function to select a particular lender
  return (dispatch) => {
    dispatch(setLoadingTrue()); // Dispatching an action to set loading to true
    myFirestore
      .collection("Transactions")
      .doc(tid)
      .get()
      .then((doc) => {
        let PreApproval = doc.data().PreApproval;
        myFirestore
          .collection("Transactions")
          .doc(tid)
          .update({
            PreApproval: {
              ...PreApproval,
              Professional: id,
            },
          })
          .then(() => {
            dispatch(setLoadingFalse());
            window.location.href = "/pre-approval/tasks_summary"; // Moving back to the tasks dashboard
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
