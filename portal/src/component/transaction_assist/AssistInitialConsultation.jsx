import React from "react";
import AssistAccordion from "./AssistAccordion";
import InitialConsultationIcon from "../../assets/assist_initial_consult.svg";
// import { validateFormField } from "../../utils";

import { Grid, Snackbar, Avatar } from "@material-ui/core";

import {
  GpsFixedOutlined,
  HomeOutlined,
  LocalHotel,
  LocalLaundryService,
  MailOutline,
  PhoneOutlined,
  Place,
  Pool,
} from "@material-ui/icons";

import { Alert } from "@material-ui/lab";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mapActionToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

/**
 * Implements Pre-Approval tasks, documents, etc.
 * to be displayed in transaction assist
 */
class AssistInitialConsultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      showError: false,
    };
  }
  render() {
    let QA = [];
    this.props.Questions.forEach((question) => {
      QA.push(
        JSON.stringify(question)
          .split(":")[1]
          .replace('"', "")
          .replace('"', "")
          .replace("}", "")
      );
    }); // Parsing the Answers
    return (
      <>
        <AssistAccordion
          isStepComplete={false}
          AccordionStepIcon={
            <img
              src={InitialConsultationIcon}
              alt=""
              style={{ marginTop: "6px" }}
            />
          }
          title="Initial Consultation"
          itemIndex={0}
        >
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={3} className="assist-accordion-profile-div">
              {this.props.Buyer.PhotoUrl !== null ? (
                <Avatar
                  src={this.props.Buyer.PhotoUrl}
                  style={{ height: "120px", width: "120px" }}
                />
              ) : (
                <Avatar style={{ height: "120px", width: "120px" }}>
                  {this.props.Buyer.Name.split("")[0] +
                    this.props.Buyer.Name.split("")[1]}
                </Avatar>
              )}
              <div className="assist-accordion-profile-name">
                {this.props.Buyer !== null ? this.props.Buyer.Name : "Hang On!"}
              </div>
              <div className="assist-accordion-profile-mail">
                <div className="assist-accordion-icon-div">
                  <MailOutline size={22} />
                </div>
                <div style={{ marginTop: "10px" }}>
                  {this.props.Buyer !== null
                    ? this.props.Buyer.Email
                    : "Hang On!"}
                </div>
              </div>
              <div className="assist-accordion-profile-phone">
                <div className="assist-accordion-icon-div">
                  <PhoneOutlined fontSize="inherit" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  {this.props.Buyer !== null
                    ? this.props.Buyer.Phone
                    : "Hang On!"}
                </div>
              </div>
            </Grid>

            <Grid item xs={9} className="assist-accordion-ques-list">
              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <GpsFixedOutlined fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  What is the Square Footage you are interested in?
                </div>
                <div className="assist-accordion-ans">{QA[1] + " Sqft"}</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <Place fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  What cities in North Texas are you interested in?
                </div>
                <div className="assist-accordion-ans">{QA[0]}</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <LocalHotel fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  How many bedrooms are you interested in?
                </div>
                <div className="assist-accordion-ans">{QA[2]}</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <HomeOutlined fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  What type of home are you looking for?
                </div>
                <div className="assist-accordion-ans">{QA[5]}</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <Pool fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">Do you want a pool?</div>
                <div className="assist-accordion-ans">{QA[6]}</div>
              </div>

              <div
                className="assist-accordion-ques-div"
                style={{ marginBottom: "5px" }}
              >
                <div className="assist-accordion-icon-div">
                  <LocalLaundryService fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  How many bathrooms are you interested in?
                </div>
                <div className="assist-accordion-ans">{QA[3]}</div>
              </div>
            </Grid>
          </Grid>
        </AssistAccordion>

        <Snackbar
          open={this.state.showError}
          autoHideDuration={6000}
          onClose={() => this.setState({ showError: false })}
        >
          <Alert
            onClose={() => this.setState({ showError: false })}
            severity="warning"
            variant="filled"
          >
            {/* {this.titleError.hasError
              ? this.titleError.errorText
              : this.descriptionError.hasError
              ? this.descriptionError.errorText
              : this.dateError.hasError
              ? this.dateError.errorText
              : "Fill all the details correctly"} */}
            Fill all the details correctly
          </Alert>
        </Snackbar>
      </>
    );
  }
}

export default connect(null, mapActionToProps)(AssistInitialConsultation);
