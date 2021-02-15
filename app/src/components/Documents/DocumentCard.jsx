import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import CardThumbnail from "./CardThumbnail";
import { getEffectiveDocumentName } from "../../utils";
import { ModalSheet } from '../utilities/core';
import { DownloadIcon, TrashIcon } from '@primer/octicons-react';

import {
  Grid,
  CardContent,
  Avatar,
  Card,
  CardMedia,
  List,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";


/**
 * Document Card Component
 * @augments {React.Component<Props>}
 */
class DocumentCard extends React.Component {
  static propTypes = {
    /**
     * Object containing data regarding the document.
     */
    docData: PropTypes.shape({
      /**
       * Name of the document
       */
      name: PropTypes.string,

      /**
       * Name of the creator of document.
       */
      creator: PropTypes.string,

      /**
       * Path to the document. Used as link href.
       */
      path: PropTypes.string
    }),
  }

  constructor() {
    super();

    this.state = {
      isModalSheetVisible: false,
    };
  }

  getThumbnail() {
    return 'https://image.slidesharecdn.com/importanceofwordandpdfdocument-100430022036-phpapp01/95/importance-of-word-and-pdf-document-1-728.jpg?cb=1272594071';
  }

  /**
   * 
   * @param {MouseEvent} event
   */
  showContextMenu(event) {
    event.preventDefault();

    this.setState({
      isModalSheetVisible: true
    });
  }

  render() {
    const { docData } = this.props;

    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="doc-card-root" onContextMenu={(event) => this.showContextMenu(event)}>
            <div className="doc-card-main">
              <NavLink
                to={{
                  pathname: `/transaction/${this.transactionID}/document/${docData.name}`,
                  state: docData,
                }}
              >
                <Card
                  className="doc-card"
                  title={docData.name}
                >
                  <CardMedia>
                    <CardThumbnail
                      getThumbnailFunction={() =>
                        this.getThumbnail(docData.name)
                      }
                    />
                  </CardMedia>

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
                        fontFamily: "Segoe UI",
                      }}
                    >
                      <Avatar />

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

        <ModalSheet
          className="doc-card-context-menu-root"
          isOpen={this.state.isModalSheetVisible}
          onClose={() => {
            this.setState({
              isModalSheetVisible: false
            })
          }}
        >
          <div className="doc-card-context-menu-header">
            <h1>
              {docData.name}
            </h1>

            <div>
              <Avatar />

              <span style={{ marginLeft: 10 }}>
                Uploaded by <strong>{docData.creator}</strong>
              </span>
            </div>
          </div>

          <List className="doc-card-context-menu-actions-list">
            <MenuItem>
              <ListItemIcon>
                <DownloadIcon size={24} />
              </ListItemIcon>

              Download
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <TrashIcon size={24} />
              </ListItemIcon>

              Delete
            </MenuItem>
          </List>
        </ModalSheet>
      </>
    )
  }
}

export default DocumentCard;
