import React from "react";
import PropTypes from "prop-types";
import Avtar from "../../assets/martin.jpg";
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

  render() {
    const { lenderData } = this.props;

    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="lender-card-root">
            <div className="lender-card-head">
              <Avatar src={Avtar} className="lender-card-avtar" alt="" />
              <div className="lender-card-info">
                <div className="lender-card-head-details">
                  <Person className="lender-card-head-icon" />
                  <div>Akshat Sharma</div>
                </div>
                <div className="lender-card-head-details">
                  <Work className="lender-card-head-icon" />
                  <div>Legacy Mutuals</div>
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
                <div className="lender-card-body-details">1230943</div>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <FavoriteBorder className="lender-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="lender-card-body-heading">Reviews</div>
                <div className="lender-card-body-details">
                  <Star className="lender-card-body-stars" />
                  <Star className="lender-card-body-stars" />
                  <Star className="lender-card-body-stars" />
                  <StarHalfOutlined className="lender-card-body-stars" />
                  <StarOutline className="lender-card-body-stars" />
                </div>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <LocalAtm className="lender-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="lender-card-body-heading">Interst Rate</div>
                <div className="lender-card-body-details">3% p.a.</div>
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
              Do you want to confirm Akshat as your Lender?
            </div>

            <div className="lender-card-context-body">
              <Error />
              <div className="lender-card-context-text">
                As your lender, Akshat will be responsible to get you
                Pre-Approved and for your loan
              </div>
            </div>
            <div className="lender-card-contect-btn">
              <Check />
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#474747" }}>Confirm</span>
            </div>
            <div className="lender-card-contect-btn">
              <Search />
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#474747" }}>Keep Searching</span>
            </div>
          </ModalSheet>
        </Grid>
      </>
    );
  }
}

export default LenderCard;
