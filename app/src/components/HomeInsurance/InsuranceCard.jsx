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
class InsuranceCard extends React.Component {
  static propTypes = {
    /**
     * Object containing data regarding the document.
     */
    providerData: PropTypes.shape({
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
    const { providerData } = this.props;
    const { tid } = this.props;
    const { selectHomeInsurance } = this.props; // Function to select the home Insurance
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="provider-card-root">
            <div className="provider-card-head">
              {providerData.PhotoUrl !== null ? ( // Displaying the picture of the insurance provider
                <Avatar
                  src={providerData.PhotoUrl}
                  className="provider-card-avatar"
                />
              ) : (
                <Avatar className="provider-card-avatar">
                  {providerData.FirstName[0] + providerData.LastName[0]}
                </Avatar>
              )}

              <div className="provider-card-info">
                <div className="provider-card-head-details">
                  <Person className="provider-card-head-icon" />
                  <div>
                    {providerData.FirstName + " " + providerData.LastName}
                  </div>
                </div>
                <div className="provider-card-head-details">
                  <Work className="provider-card-head-icon" />
                  <div>{providerData.Company}</div>
                </div>
              </div>
            </div>

            <Grid
              container
              direction="row"
              alignItems="center"
              className="provider-card-body"
              spacing={1}
            >
              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <FavoriteBorder className="provider-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="provider-card-body-heading">Reviews</div>
                {this.displayReviews(providerData.Reviews)}
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <LocalAtm className="provider-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="provider-card-body-heading">Quotes</div>
                <div className="provider-card-body-details">
                  $ {providerData.Quote} per month
                </div>
              </Grid>

              <Grid item xs={12} style={{ textAlign: "center" }}>
                <ReallosButton
                  primary
                  variant="primary"
                  className="provider-card-body-btn"
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
            <div className="provider-card-context-head">
              Do you want to confirm {providerData.FirstName} as your Insurance
              Provider?
            </div>

            <div className="provider-card-context-body">
              <Error />
              <div className="provider-card-context-text">
                As your home insurance provider, {providerData.FirstName} will
                be responsible for your home insurance
              </div>
            </div>
            <div className="provider-card-contect-btn">
              <Check />
              &nbsp;&nbsp;&nbsp;
              <span
                style={{ color: "#474747" }}
                onClick={() => {
                  this.setState({
                    isModalSheetVisible: false,
                  });
                  selectHomeInsurance(providerData.id, tid);
                }}
              >
                Confirm
              </span>
            </div>
            <div className="provider-card-contect-btn">
              <Search />
              &nbsp;&nbsp;&nbsp;
              <span
                style={{ color: "#474747" }}
                onClick={() => {
                  this.setState({
                    isModalSheetVisible: false,
                  });
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

export default InsuranceCard;
