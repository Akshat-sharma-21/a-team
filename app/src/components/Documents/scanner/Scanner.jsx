import { useReducer, useState } from "react";
import { IconButton, CircularProgress } from "@material-ui/core";
import { ReallosButton, ModalSheet } from "../../utilities/core";
import {
  DeviceCameraIcon,
  XIcon,
  KebabHorizontalIcon,
  HistoryIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";
import { imagesToPdf } from "../../../actions/documentsActions";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import NoAccessImg from "../../../assets/No-access-camera.png";
import StartScanningImg from "../../../assets/Start-scanning-Img.png";
import "react-html5-camera-photo/build/css/index.css";
import "./Scanner.css";

function Scanner(props) {
  let { metadata, returnBack } = props;
  let [loading, setLoading] = useState(true); // to set the loading state
  let [photoArray, setPhotoArray] = useState([]); // To store the pictures of all the documents
  let [camera, setCamera] = useState(true); // To close the camera
  let [modal, setModal] = useState(false); // To open the modal
  let [activeIndex, setActiveIndex] = useState(null); // To set the active Index
  let [error, setError] = useState(null);
  let [retake, setRetake] = useState(null); // To set the retake mode with the index of the picture
  const [, forceUpdate] = useReducer((x) => x + 1, 0); // To update the component

  const handleClick = (uri) => {
    // function to handle the clicked picture
    if (retake === null) {
      photoArray.push(uri);
      setPhotoArray(photoArray);
    } else {
      // if a picture is being retaken
      photoArray[retake] = uri;
      setPhotoArray(photoArray);
      setRetake(null); // setting to retake to null
      setCamera(false); // Closing the camera
    }
  };

  const deleteImage = (index) => {
    // Deleting an Image
    photoArray.splice(index, 1);
    setPhotoArray(photoArray);
    setModal(false);
    forceUpdate(); // Re-rendering the component
  };

  const retakeImage = () => {
    setLoading(true);
    setRetake(activeIndex);
    setCamera(true);
    setModal(false);
  };

  const tryCameraAccess = () => {
    // function to try and access the camera
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        },
      })
      .then((media) => {
        if (media.id) {
          setError(null);
          setLoading(true);
        }
        media.getTracks().forEach((track) => {
          track.stop();
        });
      })
      .catch(() => {
        // If the error still exists do
      });
  };

  if (error) {
    return (
      <>
        <IconButton
          size="small"
          className="scanner-back-btn"
          onClick={returnBack}
        >
          <ArrowLeftIcon size={32} />
        </IconButton>
        <div className="scanner-root">
          <div>
            <img src={NoAccessImg} className="scanner-no-access-img" />
          </div>
          <div className="scanner-modal-heading">
            Sorry! We don't have access to your camera
          </div>
          <div className="scanner-modal-subtext">
            Make sure you allow access to camera so that you can start Scanning
            Documents
          </div>
          <div className="scanner-no-access-allow-btn">
            <ReallosButton
              variant="primary"
              dense
              onClick={() => tryCameraAccess()}
            >
              Try Again
            </ReallosButton>
          </div>
        </div>
      </>
    );
  } else {
    if (camera)
      // If camera is open
      return (
        <>
          {loading && (
            <div className="scanner-single-view-container">
              <CircularProgress />
            </div>
          )}
          {camera && ( /// if the camera is not closed
            <>
              {!loading && ( // if the component is not loading
                <IconButton
                  onClick={() => setCamera(false)}
                  className="scanner-cross-button"
                >
                  <XIcon size={25} />
                </IconButton>
              )}

              <Camera
                idealFacingMode={FACING_MODES.ENVIRONMENT} // To open the camera facing the documents
                isFullscreen={true}
                onTakePhoto={(uri) => handleClick(uri)}
                onCameraStart={() => {
                  // To set loading to false when the camera is open
                  setLoading(false);
                }}
                onCameraError={(err) => {
                  // If an error occurs while opening the camera
                  setError(err);
                }}
                isImageMirror={false}
                isDisplayStartCameraError={false}
                imageType={IMAGE_TYPES.PNG}
              />
            </>
          )}
        </>
      );
    else {
      if (loading) {
        // When the component is loading
        return (
          <div className="scanner-single-view-container">
            <CircularProgress />
          </div>
        );
      } else {
        return (
          <>
            <div className="scanner-root">
              <div className="scanner-top-btns-section">
                <div style={{ marginLeft: "2vh" }}>
                  <IconButton onClick={returnBack}>
                    <ArrowLeftIcon size={32} />
                  </IconButton>
                </div>
                {photoArray.length !== 0 && (
                  <div style={{ marginLeft: "20vh", marginTop: "0.5vh" }}>
                    <ReallosButton
                      primary
                      variant="primary"
                      dense
                      onClick={() => {
                        setLoading(true);
                        imagesToPdf(metadata, photoArray);
                      }}
                    >
                      Upload
                    </ReallosButton>
                  </div>
                )}
              </div>

              {photoArray.length === 0 && ( // If there are no photos taken
                <>
                  <div>
                    <img
                      src={StartScanningImg}
                      className="scanner-start-scanning-img"
                    />
                  </div>
                  <div className="scanner-modal-heading">Start Scanning</div>
                  <div className="scanner-modal-subtext">
                    Click on the camera icon to start Scanning your document
                  </div>
                </>
              )}
              {photoArray.length !== 0 && (
                <>
                  <div className="scanner-images-array">
                    {photoArray.map((imgSrc, index) => {
                      // Mapping all the images
                      return (
                        <>
                          <div className="scanner-img-options-root">
                            <IconButton
                              className="scanner-image-options-btn"
                              onClick={() => {
                                setModal(true);
                                setActiveIndex(index);
                              }}
                            >
                              <KebabHorizontalIcon size={20} />
                            </IconButton>
                            <img src={imgSrc} className="scanner-img" />
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <ModalSheet isOpen={modal} onClose={() => setModal(false)}>
                    <div className="scanner-image-options-heading">
                      Edit Image
                    </div>
                    <div
                      className="scanner-image-options-option"
                      onClick={() => retakeImage()}
                    >
                      <HistoryIcon size={20} />
                      &nbsp;&nbsp;&nbsp; Retry
                    </div>
                    <div
                      className="scanner-image-options-option"
                      onClick={() => {
                        deleteImage(activeIndex);
                      }}
                    >
                      <TrashIcon size={20} />
                      &nbsp;&nbsp;&nbsp; Delete
                    </div>
                  </ModalSheet>
                </>
              )}
              <div className="scanner-modal-sheet-div">
                <IconButton
                  className="scanner-camera-options-btn"
                  onClick={() => {
                    // To open the camera
                    setLoading(true);
                    setCamera(true);
                  }}
                >
                  <DeviceCameraIcon size={40} />
                </IconButton>
              </div>
            </div>
          </>
        );
      }
    }
  }
}

export default Scanner;
