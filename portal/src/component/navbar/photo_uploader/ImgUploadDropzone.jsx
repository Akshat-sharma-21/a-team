import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import AddFiles from "../../../assets/add_files.svg";
import PhotoUploadIcon from "../../../assets/photo-upload-icon.svg";
import { ModalActionFooter, ReallosButton } from "../../utilities/core";
import { bytesToSize } from "../../../utils";

import "./ImgUploadDropzone.css";

const rootStyles = {
  flex: 1,
  textAlign: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingTop: "25px",
  borderWidth: 3,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  height: "300px",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#0088ff",
  backgroundColor: "#0088ff40",
  display: "block",
  paddingTop: "25px",
};

/**
 *
 * @param {object} props
 * Props passed to this component.
 *
 * @param {(acceptedFiles: File[]) => void} props.uploadImgCallback
 * Callback to upload the selected document.
 * This callback is called when "Upload" button is pressed.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss upload modal
 *
 * @returns {JSX.Element}
 * `DocUploadDropzone` JSX Element.
 */
function ImgUploadDropzone({ uploadImgCallback, dismissCallback }) {
  let { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      multiple: false,
      accept: [".png", ".jpeg", ".jpg"],
    });

  const style = useMemo(
    () => ({
      ...rootStyles,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        <div
          className={`upload-modal-inner-content ${
            isDragActive ? "dropzone-active" : ""
          }`}
        >
          {acceptedFiles.length === 0 ? (
            <img src={AddFiles} alt="Upload Document" />
          ) : (
            <img src={PhotoUploadIcon} alt="Document Selected" />
          )}

          {isDragActive ? (
            <p style={{ color: "#0088ff", fontSize: 18, marginTop: 30 }}>
              Drop the file here...
            </p>
          ) : acceptedFiles.length === 0 ? (
            <p>
              Drag and drop your Image here
              <div
                style={{
                  fontWeight: "bold",
                  margin: "10px auto",
                }}
              >
                OR
              </div>
              <span style={{ color: "#0088ff" }}>
                &nbsp;click to select an Image
              </span>
            </p>
          ) : (
            <>
              <h2
                style={{
                  fontSize: 20,
                  marginTop: 30,
                  marginBottom: 10,
                  color: "#000000",
                }}
              >
                {acceptedFiles[0].name}
              </h2>
              <p style={{ color: "#0088ff", fontSize: 18, marginTop: 10 }}>
                {bytesToSize(acceptedFiles[0].size)}
              </p>
            </>
          )}
        </div>
      </div>
      <ModalActionFooter marginTop={20}>
        <ReallosButton onClick={dismissCallback}>Cancel</ReallosButton>
        <ReallosButton
          primary
          disabled={acceptedFiles.length === 0 || acceptedFiles[0].size === 0}
          onClick={() => uploadImgCallback(acceptedFiles)}
        >
          Upload
        </ReallosButton>
      </ModalActionFooter>
    </>
  );
}

export default ImgUploadDropzone;
