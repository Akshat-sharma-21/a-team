import React from "react";
import { useParams } from "react-router";
import { createUseStyles } from "react-jss";
import { ReallosButton } from "../../utilities/core";
import PdfIcon from "../../../assets/pdf_icon_duotone.svg";
import PauseIcon from "../../../assets/pause-icon.svg";
import { CheckIcon, UploadIcon } from "@primer/octicons-react";
import { setMetadata } from "../../../actions/documentsActions";
import "./DocUploadStatus.css";

// Locks further upload trigger when one is already running
let isBusyUploading = false;

/**
 * Renders upload status progress interface inside
 * upload modal.
 *
 * @param {object} props
 * Props passed to this component
 *
 * @param {{filename: string, progress: number, isPaused: boolean, uploadTask: firebase.storage.UploadTask}} props.uploadStatus
 * Firebase upload task status.
 *
 * @param {Function} props.resetUploadStateCallback
 * Callback to reset upload state.
 *
 * _You should reset the upload status to prevent any
 * unwanted behavior once the upload task is cancelled
 * or completed._
 *
 * **NOTE:** if you are not using hooks, it is recommended
 * to leave this parameter empty and have upload status reset
 * within `dismissCallback` to prevent multiple calls to
 * `setState`.
 *
 * @param {(message: string) => void} props.showSnackbarCallback
 * Callback to show snackbar.
 *
 * @param {boolean} props.isSavingDocument
 * Specify if the existing file is being saved.
 * (_Default: false_)
 *
 * @param {Function} props.onSuccessCallback
 * Callback called after an upload is successful.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss upload modal.
 *
 * @returns {JSX.Element}
 * `DocUploadStatus` JSX Element
 */
function DocUploadStatus({
  uploadStatus,
  resetUploadStateCallback = () => {},
  showSnackbarCallback = () => {},
  dismissCallback,
  onSuccessCallback = () => {},
  isSavingDocument = false,
}) {
  let { tid } = useParams();
  /**
   * Pause upload task.
   */
  const pauseUpload = () => {
    uploadStatus.uploadTask.pause();
  };

  const resumeUpload = () => {
    uploadStatus.uploadTask.resume();
  };

  const _getUploadStatusColor = (uploadStatus, opacity = 1) => {
    return uploadStatus.progress >= 100
      ? `rgba(1, 174, 75, ${opacity})`
      : uploadStatus.isPaused
      ? `rgba(246, 172, 0, ${opacity})`
      : `rgba(21, 5, 120, ${opacity})`;
  };

  const _getUploadStatusIcon = () => {
    return uploadStatus.progress >= 100 ? (
      <CheckIcon />
    ) : uploadStatus.isPaused ? (
      <img src={PauseIcon} alt="paused" />
    ) : (
      <UploadIcon />
    );
  };

  let uploadStatusStyles = createUseStyles({
    progressBackground: (uploadStatus) => ({
      width: `${uploadStatus.progress}%`,
      background: _getUploadStatusColor(uploadStatus, 0.07),
      "&::after": {
        background: _getUploadStatusColor(uploadStatus),
      },
    }),
    uploadStatusIndicator: (uploadStatus) => ({
      background: _getUploadStatusColor(uploadStatus),
    }),
  });

  let classes = uploadStatusStyles(uploadStatus);

  // Upload document metadata to firebase database.
  // Then, reset upload form and dismiss upload modal once
  // upload is completed.
  if (uploadStatus.progress === 100) {
    (async () => {
      if (!isBusyUploading) {
        if (!isSavingDocument) {
          isBusyUploading = true;
          await setMetadata(
            {
              title: uploadStatus.title,
              location: `${tid}/documents/${uploadStatus.title}`,
            },
            tid,
            uploadStatus.step,
            uploadStatus.isPreApprovalDoc,
            uploadStatus.isPurchaseAgreement
          );
        } // isSavingDocument can be used in the future if we want to update the time of last changes made to the file
      }

      setTimeout(
        () => {
          isBusyUploading = false;
          dismissCallback();
          resetUploadStateCallback();
          showSnackbarCallback(
            isSavingDocument
              ? "Document Saved Successfully"
              : "Document Uploaded Successfully"
          );
          onSuccessCallback();
        },
        isSavingDocument ? 1000 : 500
      );
    })();
  }

  return (
    <>
      <div className="upload-status-box-root">
        <div className="upload-info-root">
          <img src={PdfIcon} alt="" />

          <div className="upload-info">
            <h1 className="document-name">{uploadStatus.filename}</h1>
            <div className="upload-progress-info">
              {uploadStatus.progress < 100
                ? `${isSavingDocument ? "Saving" : "Uploaded"} ${Math.floor(
                    uploadStatus.progress
                  )}%`
                : `${isSavingDocument ? "Document saved" : "Upload Completed"}`}
            </div>
          </div>
        </div>
        <div id="upload-progress-bg" className={classes.progressBackground} />
        <div
          id="upload-status-indicator"
          className={classes.uploadStatusIndicator}
        >
          {_getUploadStatusIcon()}
        </div>
      </div>

      <div id="upload-doc-action-footer">
        <ReallosButton
          onClick={() => {
            let uploadCancelled = uploadStatus.uploadTask.cancel();
            if (uploadCancelled || uploadStatus.isPaused)
              showSnackbarCallback(
                isSavingDocument
                  ? "Document was not saved. Action Cancelled"
                  : "Document Upload Cancelled"
              );

            dismissCallback();
            resetUploadStateCallback();
          }}
        >
          Cancel
        </ReallosButton>
        <ReallosButton
          primary
          onClick={() => {
            if (!uploadStatus.isPaused) pauseUpload();
            else resumeUpload();
          }}
        >
          {!uploadStatus.isPaused ? "Pause" : "Resume"}
        </ReallosButton>
      </div>
    </>
  );
}

export default DocUploadStatus;
