import React, { useState } from "react";
import { ReallosModal } from "../../utilities/core";
import ImgUploadDropzone from "./ImgUploadDropzone";
import ImgUploadStatus from "./ImgUploadStatus";
import { myStorage } from "../../../FirebaseConfig";
import "./ImgUploadModal.css";

/**
 * Image upload modal component.
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
 * @param {(filename: string) => void} props.onFileExistsCallback
 * Callback called when the file to be uploaded already exists.
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
}) {
  let [isUploading, setUploadState] = useState(false);
  let [uploadTaskStatus, setUploadTaskStatus] = useState({
    progress: 0,
    isPaused: false,
    uploadTask: null,
  });

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

  /**
   * Uploads Image selected in uploader
   *
   * @param {File[]} acceptedFiles
   * Array of files to be uploaded.
   * (_NOTE: Only a single file is uploaded_)
   *
   * @returns {void}
   * Void
   */
  const uploadImg = async (acceptedFiles) => {
    if (acceptedFiles.length === 1) {
      let fileName = acceptedFiles[0].name;
      let fileRef = myStorage.ref().child(`users/${localStorage.Id}`);

      fileRef
        .listAll()
        .then((files) => {
          if (files.items.length === 0) {
            // if the files doesn't exist
            setUploadState(true);
            let uploadTask = fileRef.put(acceptedFiles[0]);

            uploadTask.on("state_changed", (snapshot) => {
              let progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              let isPaused = snapshot.state === "paused";

              let newUploadTaskDetails = {
                fileName,
                progress,
                isPaused,
                uploadTask,
              };
              setUploadTaskStatus(newUploadTaskDetails);
            });
          } else {
            fileRef
              .delete()
              .then(() => {
                setUploadState(true);
                let uploadTask = fileRef.put(acceptedFiles[0]);

                uploadTask.on("state_changed", (snapshot) => {
                  let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  let isPaused = snapshot.state === "paused";

                  let newUploadTaskDetails = {
                    fileName,
                    progress,
                    isPaused,
                    uploadTask,
                  };
                  setUploadTaskStatus(newUploadTaskDetails);
                });
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
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

  return (
    <ReallosModal
      title="Upload Image"
      dismissCallback={dismissCallback}
      visible={visible}
      modalWidth={700}
    >
      {!isUploading ? (
        <ImgUploadDropzone
          uploadImgCallback={uploadImg}
          dismissCallback={dismissCallback}
        />
      ) : (
        <ImgUploadStatus
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
