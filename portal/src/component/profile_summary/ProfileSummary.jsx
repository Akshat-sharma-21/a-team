import GraphImage from "../../assets/summary_graph.png";
import { ReallosButton, Scaffold } from "../utilities/core";
import "./ProfileSummary.css";

import {
  Box,
  Card,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
} from "@primer/octicons-react";

function ProfileSummary(props) {
  return (
    <Scaffold navBar>
      <Box component="div" paddingTop={6} paddingBottom={1}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={1}>
                <ArrowLeftIcon size={40} className="back-icon" />
              </Grid>
              <Grid item xs={11} style={{ textAlign: "left" }}>
                <Typography className="summary-heading">
                  Profile Summary
                </Typography>
              </Grid>

              <Grid item xs={12} className="summary-empty-div"></Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5} style={{ textAlign: "left" }}>
                <Typography className="summary-subtext">
                  Amount Payable to Reallos
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography
                  className="summary-subtext"
                  style={{ color: "#FF6969" }}
                >
                  $ 500
                </Typography>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5} style={{ textAlign: "left" }}>
                <Typography className="summary-subtext">
                  Amount Payable by Reallos
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography
                  className="summary-subtext"
                  style={{ color: "#18C462" }}
                >
                  $ 200
                </Typography>
              </Grid>

              <Grid item xs={8}></Grid>
              <Grid item xs={2}>
                <Divider style={{ height: 1.75, background: "#707070" }} />
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6} style={{ textAlign: "center" }}>
                <Typography
                  className="summary-subtext"
                  style={{ color: "#FF6969" }}
                >
                  <Typography
                    className="summary-small-text"
                    style={{ color: "#FF6969" }}
                  >
                    TO BE PAID
                  </Typography>
                  $ 300
                </Typography>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={5} style={{ marginTop: "10px" }}>
                <ReallosButton primary>Connect your account</ReallosButton>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Card className="summary-graph-card">
              <img src={GraphImage} alt="" width="100%" />
            </Card>
          </Grid>

          <Grid item xs={12} className="summary-empty-div"></Grid>
          <Grid item xs={12} className="summary-empty-div"></Grid>

          <Grid item xs={12} style={{ paddingBottom: "20px" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDownIcon size={28} />}>
                <Typography className="summary-num"> 3 </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ width: 1.5 }}
                />
                <Typography className="summary-subheading">
                  Leads given by Reallos
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={4}
                >
                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 1
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 2
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueClosedIcon
                            size={16}
                            className="closed-trans-icon"
                          />
                          &nbsp;&nbsp;Closed Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 3
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={2}></Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} style={{ paddingBottom: "20px" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDownIcon size={28} />}>
                <Typography className="summary-num"> 5 </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ width: 1.5 }}
                />
                <Typography className="summary-subheading">
                  Leads given to Reallos
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={4}
                >
                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 1
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 2
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueClosedIcon
                            size={16}
                            className="closed-trans-icon"
                          />
                          &nbsp;&nbsp;Closed Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 3
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={2}></Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} style={{ paddingBottom: "20px" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ChevronDownIcon size={28} />}>
                <Typography className="summary-num"> 10 </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ width: 1.5 }}
                />
                <Typography className="summary-subheading">
                  Completed Transactions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {" "}
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="center"
                  spacing={4}
                >
                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 1
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 2
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueClosedIcon
                            size={16}
                            className="closed-trans-icon"
                          />
                          &nbsp;&nbsp;Closed Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className="summary-card">
                      <CardContent>
                        <Typography className="summary-card-heading">
                          Transaction 3
                        </Typography>
                        <Typography className="summary-card-text">
                          <IssueOpenedIcon
                            size={16}
                            className="open-trans-icon"
                          />
                          &nbsp;&nbsp;Open Transaction
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" className="summary-card-btn">
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={2}></Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </Scaffold>
  );
}

export default ProfileSummary;
