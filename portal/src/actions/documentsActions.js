import { myFirestore, myFirebase, myStorage } from "../FirebaseConfig";

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

// TODO: Add support for all the other steps
export function setMetadata(metadata, tid, step) {
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
      }
    })
    .catch((err) => {
      console.error(err); // Logging the error
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
