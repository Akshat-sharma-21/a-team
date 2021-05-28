import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import AddFiles from "../../../assets/add_files.svg";
import PdfIcon from "../../../assets/pdf_icon_duotone.svg";
import { ModalActionFooter, ReallosButton } from "../../utilities/core";
import { TagIcon, ClockIcon } from "@primer/octicons-react";
import {
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import { bytesToSize } from "../../../utils";

import "./DocUploadDropzone.css";

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
 * @param {(acceptedFiles: File[]) => void} props.uploadDocumentCallback
 * Callback to upload the selected document.
 * This callback is called when "Upload" button is pressed.
 *
 * @param {Function} props.dismissCallback
 * Callback to dismiss upload modal
 *
 * @returns {JSX.Element}
 * `DocUploadDropzone` JSX Element.
 */
function DocUploadDropzone({ uploadDocumentCallback, dismissCallback }) {
  let { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      multiple: false,
      accept: [".pdf"],
    });

  let [title, setTitle] = useState(null);
  let [step, selectStep] = useState(null);
  let [nextStep, selectNextStep] = useState(false);

  const style = useMemo(
    () => ({
      ...rootStyles,
      ...(isDragActive ? activeStyle : {}),
    }),
    [isDragActive]
  );

  if (nextStep) {
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
              <img src={PdfIcon} alt="Document Selected" />
            )}

            {isDragActive ? (
              <p style={{ color: "#0088ff", fontSize: 18, marginTop: 30 }}>
                Drop the file here...
              </p>
            ) : acceptedFiles.length === 0 ? (
              <p>
                Drag and drop your document here
                <div
                  style={{
                    fontWeight: "bold",
                    margin: "10px auto",
                  }}
                >
                  OR
                </div>
                <span style={{ color: "#0088ff" }}>
                  &nbsp;click to select a file
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
                  {title}
                </h2>
                <p style={{ color: "#0088ff", fontSize: 18, marginTop: 10 }}>
                  {bytesToSize(acceptedFiles[0].size)}
                </p>
              </>
            )}
          </div>
        </div>
        <ModalActionFooter marginTop={20}>
          <ReallosButton
            onClick={() => {
              dismissCallback();
              selectNextStep(false);
              selectStep("");
              setTitle("");
            }}
          >
            Cancel
          </ReallosButton>
          <ReallosButton
            primary
            disabled={acceptedFiles.length === 0 || acceptedFiles[0].size === 0}
            onClick={() => uploadDocumentCallback(acceptedFiles, title, step)}
          >
            Upload
          </ReallosButton>
        </ModalActionFooter>
      </>
    );
  } else {
    return (
      <>
        <Grid container direction="column">
          <Grid item style={{ marginTop: 15, marginLeft: 35 }}>
            <Typography className="document-input-helper-text">
              Enter the title for the document
            </Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{ marginTop: 10 }}
            >
              <Grid item>
                <TagIcon size={30} />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  fullWidth="true"
                  label="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  style={{ width: 500, marginLeft: 20 }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 25, marginLeft: 35 }}>
            <Typography className="document-input-helper-text">
              Select step for this document
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            style={{ marginTop: 10 }}
          >
            <Grid item>
              <ClockIcon size={30} />
            </Grid>
            <Select
              variant="outlined"
              fullWidth="true"
              value={step}
              style={{ width: 500, marginLeft: 20 }}
              onChange={(e) => {
                selectStep(e.target.value);
              }}
            >
              <MenuItem value="PreApproval">Pre-Approval</MenuItem>
              <MenuItem value="FindAgent">Find Agent</MenuItem>
              <MenuItem value="FindHome">Find Home</MenuItem>
              <MenuItem value="HomeInspection">Home Inspection</MenuItem>
              <MenuItem value="EscrowTitle">Escrow & Title</MenuItem>
              <MenuItem value="HomeInsurance">Home Insurance</MenuItem>
              <MenuItem value="Closing">Closing</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <ModalActionFooter marginTop={28}>
          <ReallosButton
            onClick={() => {
              dismissCallback();
              setTitle("");
              selectStep("");
            }}
          >
            Cancel
          </ReallosButton>
          <ReallosButton
            primary
            disabled={title === "" || step === ""}
            onClick={() => selectNextStep(true)}
          >
            Next
          </ReallosButton>
        </ModalActionFooter>
      </>
    );
  }
}

export default DocUploadDropzone;
