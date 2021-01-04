import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './TransactionCard.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import {
  VersionsIcon,
  OrganizationIcon,
} from '@primer/octicons-react'

import {
  GridList,
  Grid,
  Box,
  Typography,
  GridListTile,
  Card,
  CardContent,
  CircularProgress,
  CardActionArea,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
}

const useStyles = makeStyles((theme) => ({
  gridList: {
    width: 1243,
    height: 450,
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  bottom: {
    opacity: '0.6',
    color: '#ffffff',
  },
  top: {
    position: 'absolute',
  },
  circle: {
    stroke: "url(#linearColors)",
  },
}))



function RenderCard(props) {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    //actual logic of coding
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const classes = useStyles();
  // mapping the transactions
  const history = useHistory();
  const routeToTransaction = (id) => {
    let path = `/transaction/${id}/assist`;
    history.push(path);
  }
  return (
    //<div className="transaction-card-root">
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile cols={2} style={{ height: 'auto' }}>
        </GridListTile>
          <GridListTile style={{ paddingRight: '10px', paddingBottom: '10px' }} className="transaction-card-item">
            <Card className="transaction-card" variant="outlined">
              <CardActionArea onClick={() => routeToTransaction(id)}>
                <Box paddingTop={2} paddingBottom={1}>
                  <CardContent>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item md={4}>
                        <Box paddingLeft={1}>
                          <Box position="relative" display="inline-flex" paddingLeft={2} style={{ width: '78%' }}>
                            <div className={classes.root} style={{ width: '100%' }}>
                              <div className={classes.root}>
                                <CircularProgress
                                  variant="determinate"
                                  className={classes.bottom}
                                  size={110}
                                  thickness={7}
                                  value={100}
                                />
                                <svg width="300" height="4">
                                  <linearGradient id="linearColors" >
                                    <stop offset="20%" stopColor="#7C67E8" />
                                    <stop offset="90%" stopColor="#1BB0EE" />
                                  </linearGradient>
                                </svg>
                                <CircularProgress
                                  variant="static"
                                  className={classes.top}
                                  disableShrink
                                  size={110}
                                  thickness={7}
                                  value={100}
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
                              <Typography variant="h6" style={{ color: '#786AE8' }} component="div">{`${Math.round(progress)}%`}</Typography>
                            </Box>
                          </Box>
                          <Box marginTop={2}>
                            <div style={{
                              fontFamily: 'Roboto Slab',
                              fontWeight: 'bold',
                              fontSize: 24,
                              textAlign: 'center'
                            }}>
                              Transaction 1
                            </div>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item md={8}>
                        <Box paddingLeft={4}>
                          <Typography style={{ fontSize: '24px', fontFamily: 'Roboto Slab', fontWeight: 'bold' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '24px' }}><PersonIcon size={25} /></td>
                                <td> {Name}</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={4} >
                          <Typography style={{ fontSize: '24px', fontFamily: 'Roboto Slab', fontWeight: 'bold', lineHeight: '50px' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '24px' }}><VersionsIcon size={25} /></td>
                                <td>Home Insurance</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={11}>
                          <Typography style={{ fontSize: '18px', fontFamily: 'Roboto Slab', lineHeight: '30px' }}>
                            <table>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '18px' }}><Button id='bigButton'>{moment().format("DD")} {moment().format("MMM")}</Button></td>
                                <td>select a Proposal</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={4}>
                          <Typography style={{ fontSize: '24px', lineHeight: '50px' }}>
                            <table style={{ fontFamily: 'Roboto Slab', fontWeight: 'bold' }}>
                              <tr>
                                <td style={{ paddingBottom: '4.5px', paddingRight: '24px' }}><OrganizationIcon size={25} /></td>
                                <td>Address</td>
                              </tr>
                            </table>
                          </Typography>
                        </Box>
                        <Box paddingLeft={11} style={{ fontSize: '18px' }}>
                          <Typography noWrap style={{ fontFamily: 'Roboto Slab' }}>
                            {Address}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </GridListTile>
      </GridList>
    </div>

  );
}

export default connect(null, mapDispatchToProps)(RenderCard);
