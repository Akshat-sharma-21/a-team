import { myFirestore, myStorage, myFirebase, baseUrl } from "../FirebaseConfig";
import axios from "axios";
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

export function uploadDocument(file, docData) {
  // function to upload the document
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
                    if (docData.title === "Pre-Approval Letter") {
                      // if the pre-approval letter is being uploaded
                      axios.post(
                        `${baseUrl}/unlock-find-agent`,
                        {
                          // making a request to unlock the find agent step
                          tid: docData.tid,
                        },
                        {
                          headers: {
                            Authorization: "Bearer " + localStorage.Token,
                          },
                        }
                      );
                    }
                    e.filled = true;
                    e.location = `${docData.tid}/documents/${docData.title}`;
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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
                    e.date = new Date(
                      myFirebase.default.firestore.Timestamp.now().toMillis()
                    );
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

export async function downloadPdf(documentData) {
  // function to download the document
  const link = await myStorage
    .ref()
    .child(documentData.location)
    .getDownloadURL();
  const res = await fetch(link);

  if (res.ok) {
    // If the response was ok
    const resBlob = await res.blob();
    const objUrl = window.URL.createObjectURL(resBlob);

    const anchor = document.createElement("a");
    anchor.href = objUrl;
    anchor.download = `Reallos - ${documentData.title}`;
    anchor.dispatchEvent(new MouseEvent("click"));
  }
}

export async function deletePdf(docData, tid, step) {
  return new Promise((resolve, reject) => {
    let fileRef = myStorage.ref().child(docData.location); // Creating a reference for the file to be deleted
    fileRef
      .delete()
      .then(() => {
        // Making changes to the metadata
        myFirestore
          .collection("Transactions")
          .doc(tid)
          .get()
          .then((doc) => {
            if (step === "PreApproval") {
              let Documents = doc.data().PreApproval.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().PreApproval.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "FindAgent") {
              let Documents = doc.data().FindAgent.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().FindAgent.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "FindHome") {
              let Documents = doc.data().FindHome.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().FindHome.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "HomeInspection") {
              let Documents = doc.data().HomeInspection.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().HomeInspection.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "EscrowTitle") {
              let Documents = doc.data().EscrowTitle.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().EscrowTitle.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "HomeInsurance") {
              let Documents = doc.data().HomeInsurance.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().HomeInsurance.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            } else if (step === "Closing") {
              let Documents = doc.data().Closing.Documents;
              Documents.forEach((e) => {
                if (e.id === docData.id) {
                  e.location = null;
                  e.date = null;
                  e.filled = false;
                }
              });
              let Tasks = doc.data().Closing.Tasks;
              Tasks.forEach((e) => {
                if (e.documentId === docData.id) {
                  e.completed = false;
                }
              });
              myFirestore
                .collection("Transactions")
                .doc(tid)
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
            }
          });
      })
      .catch((err) => {
        reject(err); // Rejecting the promise
      });
  });
}

export function imagesToPdf(documentMetadata, photoArray) {
  // function to convert images to pdf
  axios
    .post(
      `${baseUrl}/image-to-pdf`,
      {
        metadata: documentMetadata,
        array: photoArray,
      },
      { headers: { Authorization: "Bearer " + localStorage.Token } }
    )
    .then(() => {
      window.location.href = "/documents";
    })
    .catch((err) => {
      console.error(err); // logging the error
    });
}
