import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { getEffectiveDocumentName, getDecodedHash, getTransactionID } from "../../utils";
import { myStorage } from "../../FirebaseConfig";
import UserAvatar from "../../assets/user.png";
import CardThumbnail from "./CardThumbnail";
import "./Documents.css";

import {
  Grid,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@material-ui/core";

const styles = (theme) => ({
  docCardUserAvatar: {
    width: 30,
    height: 30,
  },
});


class DocumentCard extends React.Component {
  static propTypes = {
    /**
     * Object containing a document's details
     */
    docData: PropTypes.shape({
      name: PropTypes.string,
      creator: PropTypes.string,
      creatorEmail: PropTypes.string,
      path: PropTypes.string,
    }),

    /**
     * Callback function called when the kebab icon
     * for document options is clicked.
     */
    onOpenMenu: PropTypes.func,

    /**
     * Index of the item in rendered grid. Required
     * for staggered animation.
     *
     * _(Default: 0)_
     */
    itemIndex: PropTypes.number,

    /**
     * Object containing location data. You must pass either
     * `this.props.location` or a `useLocation` object.
     * 
     * This will be used to extract `TransactionID` from URL
     * and for getting hash from current location (or route)
     * for highlighting purpose.
     */
    locationObject: PropTypes.object,
  };

  /**
   * Returns URL of thumbnail for a PDF.
   */
  async getThumbnail() {
    const docName = this.props.docData.name;
    
    try {
      /**
       * @todo Uses Firebase
       */

      const transactionID = getTransactionID(this.props.locationObject);
      const thumbnailRef = myStorage.ref().child(
        `${transactionID}/documents/thumbnails/${getEffectiveDocumentName(docName)}.png`
      );

      const thumbnailUrl = await thumbnailRef.getDownloadURL();
      return thumbnailUrl;
    }

    catch (e) {
      // Fallback: return null
      return;
    }
  }

  render() {
    const {
      classes,
      itemIndex=0,
      docData,
      onOpenMenu,
      locationObject
    } = this.props;

    const transactionID = getTransactionID(locationObject);
    
    return (
      <Grid
        item xs={12} sm={6} md={4} lg={3}
        style={{
          opacity: 0,
          animation: "slide-up-anim 150ms ease-out forwards",
          animationDelay: `${itemIndex * 30}ms`,
        }}
      >
        <div className="doc-card-root">
          <IconButton
            className="doc-card-top-action-btn"
            onClick={(event) => onOpenMenu(event)}
          >
            <KebabHorizontalIcon />
          </IconButton>

          <div className="doc-card-main">
            <NavLink
              className="link-basic"
              to={{
                pathname: `/transactions/${transactionID}/documents/${docData.name}`,
                state: docData,
              }}
            >
              <Card
                className={
                  "doc-card " + (
                    getDecodedHash(locationObject) === `#${docData.name}`
                      ? "paper-highlight"
                      : ""
                  )
                }
                title={docData.name}
              >
                <CardThumbnail
                  getThumbnailFunction={() => this.getThumbnail()}
                />

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
                    {getEffectiveDocumentName(docData.name)}
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      className={classes.docCardUserAvatar}
                      src={UserAvatar}
                    />

                    <span style={{ marginLeft: 10 }}>
                      Uploaded by <strong>{docData.creator}</strong>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </NavLink>
          </div>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(DocumentCard);
