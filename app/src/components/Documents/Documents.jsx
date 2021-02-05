import React from "react";
import "./Documents.css";
import NoDoc from "../../assets/Documents-Img.png";
import PdfImg from "../../assets/Doc-example.png";
import {
  Grid,
  CardContent,
  Avatar,
  Card,
  CardMedia,
  TextField,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import { SearchIcon, FilterIcon } from "@primer/octicons-react";

import { Scaffold } from "../utilities/core";

function Documents() {
  if (true) {
    // If there are no documents that are uploaded for the user
    return (
      <Scaffold bottomNav={true}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={7}>
            <div className="documents-heading">Documents</div>
          </Grid>
          <Grid item xs={5}></Grid>

          <Grid item xs={12} className="documents-empty-div"></Grid>
          <Grid item xs={12} className="documents-empty-div"></Grid>

          <Grid item xs={7} style={{ textAlign: "center" }}>
            <img src={NoDoc} alt="" width="100%" />
          </Grid>

          <Grid item xs={12} className="documents-empty-div"></Grid>

          <Grid item xs={12}>
            <div className="documents-subheading">
              Find all your documents right here!
            </div>
          </Grid>

          <Grid item xs={12}>
            <div className="documents-text">
              View all the documents uploaded in your transaction all in one
              place...
            </div>
          </Grid>
        </Grid>
      </Scaffold>
    );
  } else {
    return (
      <Scaffold>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={7}>
            <div className="documents-heading">Documents</div>
          </Grid>
          <Grid item xs={5}></Grid>

          <Grid item xs={12} className="documents-empty-div"></Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              className="doc-searchbar"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size={16} className="search-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <FilterIcon size={16} className="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} className="documents-empty-div"></Grid>

          <Grid item xs={7}>
            <div className="documents-heading-2">Pre-approval</div>
          </Grid>
          <Grid item xs={5}></Grid>

          <Grid item xs={12}>
            <Divider variant="fullWidth" className="doc-divider" />
          </Grid>

          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <div className="doc-card-root">
                  <div className="doc-card-main">
                    <Card className={"doc-card "}>
                      <CardMedia
                        image={PdfImg}
                        style={{
                          height: 130,
                          width: "100%",
                          backgroundPositionY: "top",
                        }}
                      />
                      <CardContent>
                        <h2 className="doc-card-heading">Document 1</h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar className="doc-avtar" />

                          <span
                            style={{ marginLeft: 10 }}
                            className="doc-card-text"
                          >
                            Uploaded by <strong>John Doe</strong>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="doc-card-root">
                  <div className="doc-card-main">
                    <Card className={"doc-card "}>
                      <CardMedia
                        image={PdfImg}
                        style={{
                          height: 130,
                          width: "100%",
                          backgroundPositionY: "top",
                        }}
                      />
                      <CardContent>
                        <h2 className="doc-card-heading">Document 1</h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar className="doc-avtar" />

                          <span
                            style={{ marginLeft: 10 }}
                            className="doc-card-text"
                          >
                            Uploaded by <strong>John Doe</strong>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <div className="doc-card-root">
                  <div className="doc-card-main">
                    <Card className={"doc-card "}>
                      <CardMedia
                        image={PdfImg}
                        style={{
                          height: 130,
                          width: "100%",
                          backgroundPositionY: "top",
                        }}
                      />
                      <CardContent>
                        <h2 className="doc-card-heading">Document 1</h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar className="doc-avtar" />

                          <span
                            style={{ marginLeft: 10 }}
                            className="doc-card-text"
                          >
                            Uploaded by <strong>John Doe</strong>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Grid>

              <Grid item xs={6}>
                <div className="doc-card-root">
                  <div className="doc-card-main">
                    <Card className={"doc-card "}>
                      <CardMedia
                        image={PdfImg}
                        style={{
                          height: 130,
                          width: "100%",
                          backgroundPositionY: "top",
                        }}
                      />
                      <CardContent>
                        <h2 className="doc-card-heading">Document 1</h2>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar className="doc-avtar" />

                          <span
                            style={{ marginLeft: 10 }}
                            className="doc-card-text"
                          >
                            Uploaded by <strong>John Doe</strong>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Scaffold>
    );
  }
}

export default Documents;
