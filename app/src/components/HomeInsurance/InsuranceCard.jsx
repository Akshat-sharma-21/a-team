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

  render() {
    const { providerData } = this.props;

    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div className="provider-card-root">
            <div className="provider-card-head">
              <Avatar src={Avtar} className="provider-card-avtar" alt="" />
              <div className="provider-card-info">
                <div className="provider-card-head-details">
                  <Person className="provider-card-head-icon" />
                  <div>Akshat Sharma</div>
                </div>
                <div className="provider-card-head-details">
                  <Work className="provider-card-head-icon" />
                  <div>Legacy Mutuals</div>
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
                <div className="provider-card-body-details">
                  <Star className="provider-card-body-stars" />
                  <Star className="provider-card-body-stars" />
                  <Star className="provider-card-body-stars" />
                  <StarHalfOutlined className="provider-card-body-stars" />
                  <StarOutline className="provider-card-body-stars" />
                </div>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1} style={{ textAlign: "center" }}>
                <LocalAtm className="provider-card-body-icon" />
              </Grid>
              <Grid item xs={10}>
                <div className="provider-card-body-heading">Quotes</div>
                <div className="provider-card-body-details">3% p.a.</div>
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
              Do you want to confirm Akshat as your Insurance Provider?
            </div>

            <div className="provider-card-context-body">
              <Error />
              <div className="provider-card-context-text">
                As your home insurance provider, Akshat will be responsible for
                your home insurance
              </div>
            </div>
            <div className="provider-card-contect-btn">
              <Check />
              &nbsp;&nbsp;&nbsp;
              <span style={{ color: "#474747" }}>Confirm</span>
            </div>
            <div className="provider-card-contect-btn">
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

export default InsuranceCard;
