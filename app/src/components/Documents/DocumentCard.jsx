import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CardThumbnail from "./CardThumbnail";
import { ModalSheet } from "../utilities/core";
import {
  DownloadIcon,
  TrashIcon,
  KebabHorizontalIcon,
} from "@primer/octicons-react";

import { downloadPdf, deletePdf } from "../../actions/documentsActions";

import {
  Grid,
  CardContent,
  Card,
  CardMedia,
  List,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";

function DocumentCard(props) {
  let [modalSheetVisible, setModalSheetVisible] = useState(false);
  let [documentDeleting, setDocumentDeleting] = useState(false);

  const { docData, step, transaction } = props;

  const getThumbnail = () => {
    return "https://image.slidesharecdn.com/importanceofwordandpdfdocument-100430022036-phpapp01/95/importance-of-word-and-pdf-document-1-728.jpg?cb=1272594071";
  };

  const showContextMenu = (event) => {
    event.preventDefault();
    setModalSheetVisible(true);
  };

  const displayDate = (date) => {
    // To display the date in the required format
    let newDate = new Date(date.seconds * 1000);
    let month = null;
    switch (newDate.getMonth()) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sept";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
      default:
        month = "";
        break;
    }
    return `${newDate.getDate()} ${month}`;
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div
          className="doc-card-root"
          onContextMenu={(event) => showContextMenu(event)}
        >
          <IconButton
            disabled={documentDeleting || !docData.filled}
            aria-label={`Show options for ${docData.name}`}
            className="doc-card-top-action-btn"
            onClick={(event) => showContextMenu(event)}
          >
            {window.innerHeight < 750 ? (
              <KebabHorizontalIcon size={14} />
            ) : (
              <KebabHorizontalIcon />
            )}
          </IconButton>

          <div className="doc-card-main">
            <NavLink
              to={
                !documentDeleting
                  ? docData.filled
                    ? {
                        pathname: `documents/${docData.title}`,
                        state: docData,
                      }
                    : {
                        pathname: "nodoc",
                        state: { ...docData, step: step, tid: transaction },
                      }
                  : {}
              }
            >
              <Card className="doc-card" title={docData.title} elevation={0}>
                <CardMedia>
                  <CardThumbnail
                    getThumbnailFunction={() => getThumbnail(docData.title)}
                  />
                </CardMedia>

                <CardContent
                  style={{
                    maxWidth: 300,
                    minWidth: 250,
                  }}
                >
                  {window.innerHeight < 750 ? (
                    <>
                      <h2
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: 20,
                        }}
                      >
                        {docData.title}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          fontFamily: "Open Sans",
                          fontSize: 15,
                        }}
                      >
                        {docData.date !== null ? (
                          <span style={{ marginLeft: 10 }}>
                            Uploaded on{" "}
                            <strong>{displayDate(docData.date)}</strong>
                          </span>
                        ) : (
                          <span style={{ marginLeft: 10 }}>
                            Click to <strong>Upload</strong>
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h2
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {docData.title}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          fontFamily: "Open Sans",
                        }}
                      >
                        {docData.date !== null ? (
                          <span style={{ marginLeft: 10 }}>
                            Uploaded on{" "}
                            <strong>{displayDate(docData.date)}</strong>
                          </span>
                        ) : (
                          <span style={{ marginLeft: 10 }}>
                            Click to <strong>Upload</strong>
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </NavLink>
          </div>
        </div>
      </Grid>

      <ModalSheet
        className="doc-card-context-menu-root"
        isOpen={modalSheetVisible}
        onClose={() => {
          setModalSheetVisible(false);
        }}
      >
        <div className="doc-card-context-menu-header">
          {window.innerHeight < 750 ? (
            <h1 style={{ fontSize: 22 }}>{docData.title}</h1>
          ) : (
            <h1>{docData.title}</h1>
          )}
          <div>
            {docData.date !== null ? (
              window.innerHeight < 750 ? (
                <span style={{ marginLeft: 10, fontSize: 17 }}>
                  Uploaded on <strong>{displayDate(docData.date)}</strong>
                </span>
              ) : (
                <span style={{ marginLeft: 10 }}>
                  Uploaded on <strong>{displayDate(docData.date)}</strong>
                </span>
              )
            ) : window.innerHeight < 750 ? (
              <span style={{ marginLeft: 10, fontSize: 17 }}>
                Click to <strong>Upload</strong>
              </span>
            ) : (
              <span style={{ marginLeft: 10 }}>
                Click to <strong>Upload</strong>
              </span>
            )}
          </div>
        </div>

        <List className="doc-card-context-menu-actions-list">
          <MenuItem
            onClick={() => {
              downloadPdf(docData);
              setModalSheetVisible(false);
            }}
          >
            <ListItemIcon>
              {window.innerHeight < 750 ? (
                <DownloadIcon size={20} />
              ) : (
                <DownloadIcon size={24} />
              )}
            </ListItemIcon>
            Download
          </MenuItem>

          <MenuItem
            onClick={() => {
              setDocumentDeleting(true);
              setModalSheetVisible(false);
              deletePdf(docData, transaction, step)
                .then(() => {
                  setDocumentDeleting(false);
                  window.location.href = "/documents"; // TODO: make it more efficient with better routing for the app
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            <ListItemIcon>
              {window.innerHeight < 750 ? (
                <TrashIcon size={20} />
              ) : (
                <TrashIcon size={24} />
              )}
            </ListItemIcon>
            Delete
          </MenuItem>
        </List>
      </ModalSheet>
    </>
  );
}

export default DocumentCard;
