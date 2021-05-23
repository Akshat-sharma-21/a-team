import React from "react";
import { NavLink } from "react-router-dom";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { useParams } from "react-router";
import { myStorage } from "../../FirebaseConfig";
import CardThumbnail from "./CardThumbnail";
import "./Documents.css";

import { Grid, Card, CardContent, IconButton } from "@material-ui/core";

const getThumbnail = async (docData, tid) => {
  try {
    const thumbnailRef = myStorage
      .ref()
      .child(
        `${tid}/documents/thumbnails/${docData.title.replace(/\.pdf$/, "")}.png`
      );
    const thumbnailUrl = thumbnailRef.getDownloadURL();
    return thumbnailUrl;
  } catch (err) {
    return;
  }
};

function displayDate(date) {
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
}

function DocumentCard(props) {
  let { tid } = useParams();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={{
        opacity: 0,
        animation: "slide-up-anim 150ms ease-out forwards",
        animationDelay: `${props.itemIndex * 30}ms`,
      }}
    >
      <div className="doc-card-root">
        <IconButton
          className="doc-card-top-action-btn"
          onClick={(event) => props.onOpenMenu(event)}
        >
          <KebabHorizontalIcon />
        </IconButton>

        <div className="doc-card-main">
          <NavLink
            className="link-basic"
            to={{
              pathname: `/transactions/${tid}/documents/${props.docData.title}`,
              state: props.docData,
            }}
          >
            <Card
              className={"doc-card paper-highlight"}
              title={props.docData.title}
            >
              <CardThumbnail getThumbnailFunction={() => getThumbnail()} />

              <CardContent
                style={{
                  maxWidth: 300,
                  minWidth: 250,
                }}
              >
                <h2
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {props.docData.title.replace(/\.pdf$/, "")}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span>
                    Uploaded on{" "}
                    <strong>{displayDate(props.docData.date)}</strong>
                  </span>
                </div>
              </CardContent>
            </Card>
          </NavLink>
        </div>
      </div>
    </Grid>
  );
}

export default DocumentCard;
