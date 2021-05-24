import { myFirestore, myStorage } from "../FirebaseConfig";
export const SET_ALL_DOCUMENTS = "SET_ALL_DOCUMENTS";

export function setAllDocumentsAction(transaction) {
  // pure action
  let Documents = {
    PreApprovalDocuments: transaction.PreApproval.Documents,
    FindAgentDocuments: transaction.FindAgent.Documents,
    FindHomeDocuments: transaction.FindHome.Documents,
    HomeInspectionDocuments: transaction.HomeInspection.Documents,
    EscrowTitleDocuments: transaction.EscrowTitle.Documents,
    HomeInsuranceDocuments: transaction.HomeInsurance.Documents,
    ClosingDocuments: transaction.Closing.Documents,
  };
  return {
    type: SET_ALL_DOCUMENTS,
    Documents,
  };
}

//TODO: save the time in metadata
export function uploadDocument(file, docData) {
  return new Promise((resolve, reject) => {
    let fileRef = myStorage
      .ref()
      .child(`${docData.tid}/documents/${docData.title}`);
    fileRef
      .put(file)
      .then((snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          // If the file transfer is complete
          myFirestore
            .collection("Transactions")
            .doc(docData.tid)
            .get()
            .then((doc) => {
              if (docData.step === "PreApproval") {
                let Documents = doc.data().PreApproval.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().PreApproval.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    PreApproval: {
                      ...doc.data().PreApproval,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === "FindAgent") {
                let Documents = doc.data().FindAgent.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().FindAgent.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    FindAgent: {
                      ...doc.data().FindAgent,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === "FindHome") {
                let Documents = doc.data().FindHome.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().FindHome.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    FindHome: {
                      ...doc.data().FindHome,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === "HomeInspection") {
                let Documents = doc.data().HomeInspection.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().HomeInspection.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    HomeInspection: {
                      ...doc.data().HomeInspection,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === "EscrowTitle") {
                let Documents = doc.data().EscrowTitle.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().EscrowTitle.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    EscrowTitle: {
                      ...doc.data().EscrowTitle,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === "HomeInsurance") {
                let Documents = doc.data().HomeInsurance.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().HomeInsurance.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    HomeInsurance: {
                      ...doc.data().HomeInsurance,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else if (docData.step === " Closing") {
                let Documents = doc.data().Closing.Documents;
                Documents.forEach((e) => {
                  if (e.id === docData.id) {
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                  }
                });
                let Tasks = doc.data().Closing.Tasks;
                Tasks.forEach((task) => {
                  if (task.documentId === docData.id) {
                    task.completed = true;
                  }
                });
                myFirestore
                  .collection("Transactions")
                  .doc(docData.tid)
                  .update({
                    Closing: {
                      ...doc.data().Closing,
                      Documents: Documents,
                      Tasks: Tasks,
                    },
                  })
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                reject("The step fed is wrong");
              }
            })
            .catch((err) => {
              reject(err);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
