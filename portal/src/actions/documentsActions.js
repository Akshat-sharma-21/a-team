import { myFirestore, myFirebase, myStorage, baseUrl } from "../FirebaseConfig";
import randomId from "random-id";
import axios from "axios";

const LEN = 5; // Length of the random id

export function getAllDocuments(transaction) {
  // Function to return all the documents that are filled
  let Documents = []; // Defining an Empty Array

  transaction.PreApproval.Documents.forEach((doc) => {
    // Storing all the docs for PreApproval
    if (doc.filled) Documents.push(doc);
  });

  transaction.FindAgent.Documents.forEach((doc) => {
    // Storing all the docs for Find Agent
    if (doc.filled) Documents.push(doc);
  });

  transaction.FindHome.Documents.forEach((doc) => {
    // Storing all the docs for Find Home
    if (doc.filled) Documents.push(doc);
  });

  transaction.HomeInspection.Documents.forEach((doc) => {
    // Storing all the docs for Home Inspection
    if (doc.filled) Documents.push(doc);
  });

  transaction.EscrowTitle.Documents.forEach((doc) => {
    // Storing all the docs for Escrow Title
    if (doc.filled) Documents.push(doc);
  });

  transaction.HomeInsurance.Documents.forEach((doc) => {
    // Storing all the docs for Home Insurance
    if (doc.filled) Documents.push(doc);
  });

  transaction.Closing.Documents.forEach((doc) => {
    // Storing all the docs for Closing
    if (doc.filled) Documents.push(doc);
  });

  return Documents;
}

export function setMetadata(metadata, tid, step, isPreApprovalDoc) {
  let saveMetadata = {
    date: new Date(myFirebase.default.firestore.Timestamp.now().toMillis()),
    description: metadata.description ? metadata.description : null,
    filled: true,
    question: null,
    subtitle: metadata.subtitle ? metadata.subtitle : null,
    title: metadata.title,
    accessRights: {
      // giving the default access right
      read: ["user"],
      readWrite: ["agent"],
    },
    location: metadata.location,
    id: randomId(LEN), // random id of the document
  };
  myFirestore
    .collection("Transactions")
    .doc(tid)
    .get()
    .then((doc) => {
      let documents = [];
      if (step === "PreApproval") {
        // if the step is PreApproval
        documents = doc.data().PreApproval.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              PreApproval: {
                ...doc.data().PreApproval,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "FindAgent") {
        // if the step is FindAgent
        documents = doc.data().FindAgent.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              FindAgent: {
                ...doc.data().FindAgent,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "FindHome") {
        // if the step is FindHome
        documents = doc.data().FindHome.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              FindHome: {
                ...doc.data().FindHome,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "HomeInspection") {
        // if the step is HomeInspection
        documents = doc.data().HomeInspection.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              HomeInspection: {
                ...doc.data().HomeInspection,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "EscrowTitle") {
        // if the step is EscorwTitle
        documents = doc.data().EscrowTitle.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              EscrowTitle: {
                ...doc.data().EscrowTitle,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "HomeInsurance") {
        // if the step is HomeInsurance
        documents = doc.data().HomeInsurance.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              HomeInsurance: {
                ...doc.data().HomeInsurance,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else if (step === "Closing") {
        // if the step is Closing
        documents = doc.data().Closing.Documents;
        if (
          documents.filter((e) => e.title === saveMetadata.title).length === 0 // If the document's metadata is not saved
        ) {
          documents.push(saveMetadata);
          myFirestore
            .collection("Transactions")
            .doc(tid)
            .update({
              Closing: {
                ...doc.data().Closing,
                Documents: documents,
              },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    })
    .catch((err) => {
      console.error(err); // Logging the error
    });

  if (isPreApprovalDoc.toUpperCase() === "YES") {
    // If the Pre-approval letter is being uploaded then trigger the unlock find-agent action
    axios.post(
      `http://localhost:5000/reallos-app-78a3a/us-central1/api/unlock-find-agent`,
      { tid: tid }
    );
  }
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
