import { myFirestore, baseUrl } from "../FirebaseConfig";
import { setErrors, setLoadingTrue, setLoadingFalse } from "./utilsActions";
import axios from "axios";

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

export function selectLender(tid, lender, user) {
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
              Professional: lender.id,
            },
          })
          .then(() => {
            myFirestore
              .collection("Portal_Users")
              .doc(lender.id)
              .get()
              .then((doc) => {
                if (
                  doc
                    .data()
                    .Transactions_List.filter(
                      (transactions) => transactions === tid
                    ).length === 0 // If the lender has not been added to the transaction
                ) {
                  let updatedArray = doc.data().Transactions_List;
                  updatedArray.push(tid);
                  myFirestore
                    .collection("Portal_Users")
                    .doc(lender.id)
                    .update({
                      Transactions_List: updatedArray,
                    })
                    .then(() => {
                      axios.post(
                        // Sending Lender the information
                        `${baseUrl}/send-lender-info`,
                        {
                          email: lender.Email,
                          phone: lender.Phone,
                          user: {
                            Email: user.Email,
                            Name: user.Name,
                            Phone: user.Phone,
                          },
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + localStorage.Token,
                          },
                        }
                      );
                      axios.post(
                        // Sending user the confirmation
                        `${baseUrl}/send-lender-confirmation`,
                        {
                          email: user.Email,
                          phone: user.Phone,
                          lenderName: lender.FirstName + " " + lender.LastName,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + localStorage.Token,
                          },
                        }
                      );
                      dispatch(setLoadingFalse());
                      window.location.href = "/pre-approval/tasks_summary";
                    })
                    .catch((err) => {
                      dispatch(setErrors(err));
                    });
                } else {
                  // If the transaction has already been added for the lender
                  axios.post(
                    // Sending user the confirmation
                    `${baseUrl}/send-lender-confirmation`,
                    {
                      email: user.Email,
                      phone: user.Phone,
                      lenderName: lender.FirstName + " " + lender.LastName,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.Token,
                      },
                    }
                  );
                  dispatch(setLoadingFalse());
                  window.location.href = "/pre-approval/tasks_summary";
                }
              })
              .catch((err) => setErrors(err));
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
