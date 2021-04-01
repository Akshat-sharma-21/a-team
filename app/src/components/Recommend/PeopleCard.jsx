import React from "react";
import PropTypes from "prop-types";
import { getEffectiveDocumentName } from "../../utils";
import {
  DeviceMobileIcon,
  MailIcon,
  ArrowLeftIcon,
} from "@primer/octicons-react";

import {
  Grid,
  CardContent,
  Card,
  CardMedia,
  List,
  MenuItem,
  ListItemIcon,
  IconButton,
  SwipeableDrawer,
} from "@material-ui/core";

/**
 * Document Card Component
 * @augments {React.Component<Props>}
 */
class PeopleCard extends React.Component {
  static propTypes = {
    /**
     * Object containing data regarding the document.
     */
    peopleData: PropTypes.shape({
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
    const { peopleData } = this.props;

    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <div
            className="people-card-root"
            onContextMenu={(event) => this.showContextMenu(event)}
          >
            <div
              className="people-card-main"
              onClick={(event) => this.showContextMenu(event)}
            >
              <Card
                className="people-card"
                title={peopleData.name}
                elevation={0}
              >
                <CardMedia
                  image={this.state.thumbnailUrl}
                  style={{
                    height: 200,
                    backgroundPositionY: "top",
                  }}
                />

                <CardContent
                  style={{
                    maxWidth: 300,
                    minWidth: 250,
                  }}
                >
                  <h1
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {peopleData.name}
                    <div
                      style={{
                        alignItems: "center",
                        fontFamily: "Open Sans",
                        fontSize: "14px",
                        fontWeight: "normal",
                      }}
                    >
                      <div>Interest Rate - {peopleData.interstRate}</div>
                      <div>Lifetime Cost - {peopleData.lifetimeCost}</div>
                    </div>
                  </h1>
                  <div
                    style={{
                      alignItems: "center",
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    <div>{peopleData.bankName}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <SwipeableDrawer
            anchor="bottom"
            open={this.state.isModalSheetVisible}
          >
            <div style={{ height: "100vh" }} className role="presentation">
              <div className="Recommend_top">
                <IconButton
                  style={{ backgroundColor: "#000000 !important" }}
                  onClick={() => {
                    this.setState({
                      isModalSheetVisible: false,
                    });
                  }}
                >
                  <ArrowLeftIcon className="Recommend_back" size={30} />
                </IconButton>
                <img src={peopleData.photo}></img>
              </div>

              <div className="Recommend_card_cont">
                <div class="Recommend_card_name">{peopleData.name}</div>
                <p class="Recommend_card_about">{peopleData.desc}</p>
                <div className="Recommend_e-mail">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <MailIcon size={24} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                      <div className="Recommend_e-mailhead">Email</div>
                      {peopleData.email}
                    </Grid>
                  </Grid>
                </div>
                <br></br>

                <div className="Recommend_number">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={1} style={{ textAlign: "center" }}>
                      <DeviceMobileIcon size={24} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} style={{ textAlign: "left" }}>
                      <div className="Recommend_contacthead">Contact</div>
                      {peopleData.phone}
                    </Grid>
                  </Grid>
                </div>
                <div className="Recommend_button_confirm">
                  <button>Confirm</button>
                </div>
              </div>
            </div>
          </SwipeableDrawer>
        </Grid>
      </>
    );
  }
}

export default PeopleCard;
