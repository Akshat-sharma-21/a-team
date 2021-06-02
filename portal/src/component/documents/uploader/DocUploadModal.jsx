import React, { useState } from "react";
import { useParams } from "react-router";
import { ReallosModal } from "../../utilities/core";
import DocUploadDropzone from "./DocUploadDropzone";
import DocUploadStatus from "./DocUploadStatus";
import { myStorage } from "../../../FirebaseConfig";
import "./DocUploadModal.css";

/**
 * Document upload modal component.
 *
 * @param {object} props
 * Props passed to this component.
 *
 * @param {boolean} props.visible
 * Specify if the upload modal is visible.
 *
 * @param {(message: string) => void} props.showSnackbarCallback
 * Callback to show snackbar.
 *
 * @param {Function} props.onSuccessCallback
 * Callback called after an upload is successful.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss the upload modal.
 *
 * @returns {JSX.Element}
 * Document Upload Modal
 */
function DocUploadModal({
  visible,
  dismissCallback,
  showSnackbarCallback,
  onSuccessCallback,
  onFileExistsCallback = () => {},
  Role,
}) {
  let [isUploading, setUploadState] = useState(false);
  let [uploadTaskStatus, setUploadTaskStatus] = useState({
    progress: 0,
    isPaused: false,
    uploadTask: null,
  });
  let [modalClosed, setModalClosed] = useState(false);

  let { tid } = useParams(); // Getting the trnsaction id

  /**
   * Returns a boolean value stating if a file exists
   * in firebase storage.
   *
   * @param {firebase.storage.Reference} fileRef
   * Reference to the file to be checked.
   *
   * @returns {Promise<boolean>}
   * Boolean value based on file existence.
   */
  const checkFileExists = async (fileRef) => {
    try {
      await fileRef.getDownloadURL();
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Uploads document selected in uploader
   *
   * @param {File[]} acceptedFiles
   * Array of files to be uploaded.
   * (_NOTE: Only a single file is uploaded_)
   *
   * @returns {void}
   * Void
   */
  const uploadDocument = async (
    acceptedFiles,
    title,
    step,
    isPreApprovalDoc,
    isPurchaseAgreement
  ) => {
    if (acceptedFiles.length === 1) {
      let fileRef = myStorage.ref().child(`${tid}/documents/${title}`);

      if (await checkFileExists(fileRef)) {
        onFileExistsCallback(title);
        dismissCallback();
        return;
      }

      setUploadState(true);
      let uploadTask = fileRef.put(acceptedFiles[0]);

      uploadTask.on("state_changed", (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        let isPaused = snapshot.state === "paused";

        let newUploadTaskDetails = {
          step,
          title,
          progress,
          isPaused,
          uploadTask,
          isPreApprovalDoc, // Sending the field to check if the Pre-Approval Document is being uploaded
          isPurchaseAgreement, // Sending the field to check if the Purchase Agreeement is being uploaded
        };
        setUploadTaskStatus(newUploadTaskDetails);
      });
    }
  };

  /**
   * Resets upload modal.
   */
  const resetUploadState = () => {
    setUploadState(false);
    setUploadTaskStatus({
      progress: 0,
      isPaused: false,
      isCancelled: false,
    });
  };

  if (visible && modalClosed) setModalClosed(false); // To set the modal Closed property
  return (
    <ReallosModal
      title="Upload Document"
      dismissCallback={() => {
        dismissCallback();
        setModalClosed(true);
      }}
      visible={visible}
      modalWidth={750}
    >
      {!isUploading ? (
        <DocUploadDropzone
          uploadDocumentCallback={uploadDocument}
          dismissCallback={dismissCallback}
          Role={Role}
          modalClosed={modalClosed}
        />
      ) : (
        <DocUploadStatus
          uploadStatus={uploadTaskStatus}
          resetUploadStateCallback={resetUploadState}
          dismissCallback={dismissCallback}
          showSnackbarCallback={showSnackbarCallback}
          onSuccessCallback={onSuccessCallback}
        />
      )}
    </ReallosModal>
  );
}

export default DocUploadModal;
