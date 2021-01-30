import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "./TransactionCard.css";

import {
  VersionsIcon,
  OrganizationIcon,
  PersonIcon,
} from "@primer/octicons-react";

import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  CardActionArea,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: 1243,
    height: 450,
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  bottom: {
    opacity: "0.6",
    color: "#ffffff",
  },
  top: {
    position: "absolute",
  },
  circle: {
    stroke: "url(#linearColors)",
  },
}));

function RenderCard(items) {
  const [progress, setProgress] = useState(40);
  const classes = useStyles();
  // mapping the transactions
  return (
    <div className={classes.root}>
      <Card className="transaction-card" variant="outlined">
        <CardActionArea>
          <Box paddingTop={2} paddingBottom={1}>
            <CardContent>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item md={4}>
                  <Box paddingLeft={1}>
                    <Box
                      position="relative"
                      display="inline-flex"
                      paddingLeft={2}
                      style={{ width: "78%" }}
                    >
                      <div className={classes.root} style={{ width: "100%" }}>
                        <div className={classes.root}>
                          <CircularProgress
                            variant="determinate"
                            className={classes.bottom}
                            size={110}
                            thickness={7}
                            value={100}
                          />
                          <svg width="300" height="4">
                            <linearGradient id="linearColors">
                              <stop offset="20%" stopColor="#7C67E8" />
                              <stop offset="80%" stopColor="#1BB0EE" />
                            </linearGradient>
                          </svg>
                          <CircularProgress
                            variant="static"
                            className={classes.top}
                            disableShrink
                            size={110}
                            thickness={7}
                            value={progress}
                            classes={{ circle: classes.circle }}
                          />
                        </div>
                      </div>
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        paddingLeft={2}
                      >
                        <Typography
                          variant="h6"
                          style={{ color: "#786AE8" }}
                          component="div"
                        >{`${Math.round(progress)}%`}</Typography>
                      </Box>
                    </Box>
                    <Box marginTop={2}>
                      <div
                        style={{
                          fontFamily: "Roboto Slab",
                          fontWeight: "bold",
                          fontSize: 24,
                          textAlign: "center",
                        }}
                      >
                        Transaction 1
                      </div>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box paddingLeft={4}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontFamily: "Roboto Slab",
                        fontWeight: "bold",
                      }}
                    >
                      <table>
                        <tr>
                          <td
                            style={{
                              paddingBottom: "4.5px",
                              paddingRight: "24px",
                            }}
                          >
                            <PersonIcon size={25} />
                          </td>
                          <td>abc</td>
                        </tr>
                      </table>
                    </Typography>
                  </Box>
                  <Box paddingLeft={4}>
                    <Typography
                      style={{
                        fontSize: "24px",
                        fontFamily: "Roboto Slab",
                        fontWeight: "bold",
                        lineHeight: "50px",
                      }}
                    >
                      <table>
                        <tr>
                          <td
                            style={{
                              paddingBottom: "4px",
                              paddingRight: "24px",
                            }}
                          >
                            <VersionsIcon size={25} />
                          </td>
                          <td>Home Insurance</td>
                        </tr>
                      </table>
                    </Typography>
                  </Box>
                  <Box paddingLeft={11}>
                    <Typography
                      style={{
                        fontSize: "18px",
                        fontFamily: "Roboto Slab",
                        lineHeight: "30px",
                      }}
                    >
                      <table>
                        <tr>
                          <td
                            style={{
                              paddingBottom: "4px",
                              paddingRight: "18px",
                            }}
                          >
                            <Button id="Big-Button">
                              {moment().format("DD")} {moment().format("MMM")}
                            </Button>
                          </td>
                          <td>select a Proposal</td>
                        </tr>
                      </table>
                    </Typography>
                  </Box>
                  <Box paddingLeft={4}>
                    <Typography
                      style={{ fontSize: "24px", lineHeight: "50px" }}
                    >
                      <table
                        style={{
                          fontFamily: "Roboto Slab",
                          fontWeight: "bold",
                        }}
                      >
                        <tr>
                          <td
                            style={{
                              paddingBottom: "4px",
                              paddingRight: "24px",
                            }}
                          >
                            <OrganizationIcon size={25} />
                          </td>
                          <td>Address</td>
                        </tr>
                      </table>
                    </Typography>
                  </Box>
                  <Box paddingLeft={11} style={{ fontSize: "18px" }}>
                    <Typography noWrap style={{ fontFamily: "Roboto Slab" }}>
                      {items.Address}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default RenderCard;
