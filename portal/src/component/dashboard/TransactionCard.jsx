import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./TransactionCard.css";

import {
  VersionsIcon,
  OrganizationIcon,
  PersonIcon,
} from "@primer/octicons-react";

import {
  Grid,
  Card,
  CircularProgress,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  circle: {
    stroke: "url(#reallosGradient)",
  },
}));

function TransactionCard({ transactionDetails, userRole }) {
  const classes = useStyles();
  let [progress, setProgress] = useState(0);
  const nextPage = userRole === "lender" ? "documents" : "assist";

  useEffect(() => {
    setTimeout(() => {
      setProgress(transactionDetails.Completion / 100);
    });
  }, []);
  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card variant="outlined">
        <Link
          className="link-basic"
          to={`/transactions/${transactionDetails.id}/${nextPage}`}
        >
          <CardActionArea
            className="transaction-card-content-root"
            aria-label={[
              `${transactionDetails.Buyer}`,
              `${Math.round(transactionDetails.Completion)}% completed`,
            ].join(" - ")}
          >
            <Grid container direction="row" spacing={2} alignItems="center">
              {/* GRAPH SIDE */}
              <Grid
                item
                direction="column"
                justify="center"
                style={{
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  width: "40%",
                }}
              >
                <div className="transaction-card-graph">
                  <CircularProgress
                    variant="determinate"
                    size={130}
                    thickness={10}
                    value={100}
                  />
                  <svg width="100" height="4">
                    <linearGradient id="reallosGradient">
                      <stop
                        offset="20%"
                        stopColor="var(--color-gradient-stop)"
                      />
                      <stop
                        offset="80%"
                        stopColor="var(--color-gradient-start)"
                      />
                    </linearGradient>
                  </svg>
                  <CircularProgress
                    variant="determinate"
                    size={130}
                    thickness={10}
                    value={progress * 100}
                    classes={{ circle: classes.circle }}
                  />

                  <div className="transaction-card-progress-text">
                    {`${Math.round(progress * 100)}%`}
                  </div>
                </div>
              </Grid>

              {/* DETAILS SIDE */}
              <Grid
                item
                direction="column"
                className="transaction-card-detail-wrapper"
                style={{
                  textOverflow: "ellipsis",
                  width: "60%",
                }}
              >
                <div className="transaction-card-detail-main">
                  <PersonIcon size={20} />
                  {transactionDetails.Buyer}
                </div>

                <div className="transaction-card-detail-main">
                  <VersionsIcon size={20} />
                  {transactionDetails.Stage.step}

                  <div
                    className="transaction-card-detail-sub"
                    style={{ lineHeight: "27px" }}
                  >
                    <span className="transaction-card-detail-subtask-date">
                      {transactionDetails.task // Conditional Rendering for Tasks Date
                        ? transactionDetails.task.Date
                        : "Coming Soon"}
                    </span>

                    <span style={{ textOverflow: "ellipsis" }}>
                      {transactionDetails.task && // Conditional Rendering for Tasks Name
                        transactionDetails.task.Name}
                    </span>
                  </div>
                </div>

                <div className="transaction-card-detail-main">
                  <OrganizationIcon size={20} />
                  Address
                  <div className="transaction-card-detail-sub">
                    {transactionDetails.Address // Conditional Rendering for the address
                      ? transactionDetails.Address
                      : "Home not selected yet"}
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
}

TransactionCard.propTypes = {
  transactionDetails: PropTypes.shape({
    id: PropTypes.string,
    transaction: PropTypes.string,
    completionStatus: PropTypes.number,
    createdBy: PropTypes.string,
    latestTask: {
      title: PropTypes.string,
      subtask: {
        name: PropTypes.string,
        dueTimestamp: PropTypes.number,
      },
    },
    address: PropTypes.string,
  }),
};

export default TransactionCard;
