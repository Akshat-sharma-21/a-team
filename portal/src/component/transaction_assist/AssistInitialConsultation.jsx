import React from "react";
import AssistAccordion from "./AssistAccordion";
import InitialConsultationIcon from "../../assets/assist_initial_consult.svg";
import { validateFormField } from "../../utils";

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

  // handleChange = (event) => {
  //   event.preventDefault();

  //   switch (event.target.name) {
  //     case "title":
  //       this.setState({ taskTitle: event.target.value });
  //       this.titleError = validateFormField(
  //         event.target.value,
  //         event.target.name
  //       );
  //       break;

  //     case "description":
  //       this.setState({ taskDescription: event.target.value });
  //       this.descriptionError = validateFormField(
  //         event.target.value,
  //         event.target.name
  //       );
  //       break;

  //     case "date":
  //       this.setState({ taskDate: event.target.value });
  //       this.dateError = validateFormField(
  //         event.target.value,
  //         event.target.name
  //       );
  //       break;

  //     case "priority":
  //       this.setState({ taskPriority: event.target.value });
  //       this.priorityError = validateFormField(
  //         event.target.value,
  //         event.target.name
  //       );
  //       break;

  //     default:
  //       break;
  //   }
  //   if (
  //     !this.titleError.hasError &&
  //     !this.descriptionError.hasError &&
  //     !this.dateError.hasError &&
  //     !this.priorityError.hasError
  //   ) {
  //     this.setState({ validated: true });
  //   } else this.setState({ validated: false });
  // };

  render() {
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
              <Avatar
                src="https://i.imgur.com/zOnwBpQ.png"
                alt=""
                style={{ height: "120px", width: "120px" }}
              />
              <div className="assist-accordion-profile-name">Akshat Sharma</div>
              <div className="assist-accordion-profile-mail">
                <div className="assist-accordion-icon-div">
                  <MailOutline size={22} />
                </div>
                <div style={{ marginTop: "8px" }}>
                  sharmaakshat212000@gmail.com
                </div>
              </div>
              <div className="assist-accordion-profile-phone">
                <div className="assist-accordion-icon-div">
                  <PhoneOutlined fontSize="inherit" />
                </div>
                <div style={{ marginTop: "8px" }}>+1 469-350-9711</div>
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
                <div className="assist-accordion-ans">750 sqft</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <Place fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  What cities in North Texas are you interested in?
                </div>
                <div className="assist-accordion-ans">Dallas</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <LocalHotel fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  How many bedrooms are you interested in?
                </div>
                <div className="assist-accordion-ans">4+</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <HomeOutlined fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">
                  What type of home are you looking for?
                </div>
                <div className="assist-accordion-ans">Condo</div>
              </div>

              <div className="assist-accordion-ques-div">
                <div className="assist-accordion-icon-div">
                  <Pool fontSize="inherit" />
                </div>
                <div className="assist-accordion-ques">Do you want a pool?</div>
                <div className="assist-accordion-ans">Yes</div>
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
                <div className="assist-accordion-ans">4+</div>
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
