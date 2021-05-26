import React from "react";
import PropTypes from "prop-types";
import { Grid, Avatar } from "@material-ui/core";
import { ModalSheet, ReallosButton } from "../utilities/core";
import {
  Check,
  Error,
  FavoriteBorder,
  LocalAtm,
  Person,
  Search,
  Star,
  StarHalfOutlined,
  StarOutline,
  Work,
} from "@material-ui/icons";
import { CheckCircleFillIcon } from "@primer/octicons-react";

/**
 * Document Card Component
 * @augments {React.Component<Props>}
 */
class LenderCard extends React.Component {
  static propTypes = {
    /**
     * Object containing data regarding the document.
     */
    lenderData: PropTypes.shape({
      /**
       * Name of the agent
       */
      name: PropTypes.string,

      /**
       * Photo of the agent
       */
      photo: PropTypes.string,

      /**
       *  Name of bank of the agent.
       */
      email: PropTypes.string,

      /**
       *  Name of bank of the agent.
       */
      phone: PropTypes.string,

      /**
       *  Name of bank of the agent.
       */
      desc: PropTypes.string,

      /**
       * Interest rate of the agent.
       */
      interstRate: PropTypes.string,

      /**
       * Lifetime cost of the agent.
       */
      lifetimeCost: PropTypes.string,

      /**
       *  Name of the bank of the agent.
       */
      bankName: PropTypes.string,
    }),
  };

  constructor() {
    super();

    this.state = {
      isModalSheetVisible: false,
    };
  }

  /**
   *
   * @param {MouseEvent} event
   */
  showContextMenu(event) {
    event.preventDefault();

    this.setState({
      isModalSheetVisible: true,
    });
  }

  displayReviews(reviews) {
    // Function to display all the stars
    let halfstars = (reviews % 1) * 2; // To get the total number of half stars
    let fullStars = parseInt(reviews); // To get the total number of full stars
    let leftStars = 5 - (halfstars + fullStars); // ALl the left stars

    return (
      <>
        {fullStars-- > 0 && <Star className="lender-card-body-stars" />}
        {fullStars-- > 0 && <Star className="lender-card-body-stars" />}
        {fullStars-- > 0 && <Star className="lender-card-body-stars" />}
        {fullStars-- > 0 && <Star className="lender-card-body-stars" />}
        {fullStars-- > 0 && <Star className="lender-card-body-stars" />}
        {halfstars-- > 0 && (
          <StarHalfOutlined className="lender-card-body-stars" />
        )}
        {halfstars-- > 0 && (
          <StarHalfOutlined className="lender-card-body-stars" />
        )}
        {halfstars-- > 0 && (
          <StarHalfOutlined className="lender-card-body-stars" />
        )}
        {halfstars-- > 0 && (
          <StarHalfOutlined className="lender-card-body-stars" />
        )}
        {halfstars-- > 0 && (
          <StarHalfOutlined className="lender-card-body-stars" />
        )}
        {leftStars-- > 0 && <StarOutline className="lender-card-body-stars" />}
        {leftStars-- > 0 && <StarOutline className="lender-card-body-stars" />}
        {leftStars-- > 0 && <StarOutline className="lender-card-body-stars" />}
        {leftStars-- > 0 && <StarOutline className="lender-card-body-stars" />}
        {leftStars-- > 0 && <StarOutline className="lender-card-body-stars" />}
      </>
    );
  }

  render() {
    const { lenderData } = this.props;
    const { tid } = this.props;
    const { selectLender } = this.props; // Function to select the lender
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="lender-card-root">
            <div className="lender-card-head">
              {lenderData.PhotoUrl !== null ? ( // Displaying the profile picture of the lender
                <Avatar
                  src={lenderData.PhotoUrl}
                  className="lender-card-avatar"
                />
              ) : (
                <Avatar className="lender-card-avatar">
                  {lenderData.FirstName[0] + lenderData.LastName[0]}
                </Avatar>
              )}
              <div className="lender-card-info">
                <div className="lender-card-head-details">
                  <Person className="lender-card-head-icon" />
                  <div>{lenderData.FirstName + " " + lenderData.LastName}</div>
                </div>
                <div className="lender-card-head-details">
                  <Work className="lender-card-head-icon" />
                  <div>{lenderData.Company}</div>
                </div>
              </div>
            </div>

            <Grid
              container
              direction="row"
              alignItems="center"
              className="lender-card-body"
              spacing={1}
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <CheckCircleFillIcon className="lender-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="lender-card-body-heading">
                  NMLS Identification Number
                </div>
                <div className="lender-card-body-details">
                  {lenderData.NMLS}
                </div>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <FavoriteBorder className="lender-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="lender-card-body-heading">Reviews</div>
                <div className="lender-card-body-details">
                  {this.displayReviews(lenderData.Reviews)}
                </div>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <LocalAtm className="lender-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="lender-card-body-heading">Interst Rate</div>
                <div className="lender-card-body-details">
                  {lenderData.Rate}% p.a.
                </div>
              </Grid>

              <Grid item xs={12} style={{ textAlign: "center" }}>
                <ReallosButton
                  primary
                  variant="primary"
                  className="lender-card-body-btn"
                  onClick={(event) => this.showContextMenu(event)}
                >
                  Select
                </ReallosButton>
              </Grid>
            </Grid>
          </div>

          <ModalSheet
            isOpen={this.state.isModalSheetVisible}
            onClose={() => {
              this.setState({
                isModalSheetVisible: false,
              });
            }}
          >
            <div className="lender-card-context-head">
              Do you want to confirm {lenderData.FirstName} as your Lender?
            </div>

            <div className="lender-card-context-body">
              <Error />
              <div className="lender-card-context-text">
                As your lender, {lenderData.FirstName} will be responsible to
                get you Pre-Approved and for your loan
              </div>
            </div>
            <div className="lender-card-contect-btn">
              <Check />
              &nbsp;&nbsp;&nbsp;
              <span
                style={{ color: "#474747" }}
                onClick={() => {
                  this.setState({ isModalSheetVisible: false });
                  selectLender(lenderData.id, tid);
                }}
              >
                {" "}
                Confirm
              </span>
            </div>
            <div className="lender-card-contect-btn">
              <Search />
              &nbsp;&nbsp;&nbsp;
              <span
                style={{ color: "#474747" }}
                onClick={() => {
                  this.setState({ isModalSheetVisible: false });
                }}
              >
                Keep Searching
              </span>
            </div>
          </ModalSheet>
        </Grid>
      </>
    );
  }
}

export default LenderCard;
