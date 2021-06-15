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
  School,
  Pool,
} from "@material-ui/icons";

function AssistInitialConsultation(props) {
  console.log(props.Questions);
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
            {props.Buyer.PhotoUrl !== null ? (
              <Avatar
                src={props.Buyer.PhotoUrl}
                style={{ height: "120px", width: "120px" }}
              />
            ) : (
              <Avatar style={{ height: "120px", width: "120px" }}>
                {props.Buyer.Name.split("")[0] + props.Buyer.Name.split("")[1]}
              </Avatar>
            )}
            <div className="assist-accordion-profile-name">
              {props.Buyer !== null ? props.Buyer.Name : "Hang On!"}
            </div>
            <div className="assist-accordion-profile-mail">
              <div className="assist-accordion-icon-div">
                <MailOutline size={22} />
              </div>
              <div style={{ marginTop: "10px" }}>
                {props.Buyer !== null ? props.Buyer.Email : "Hang On!"}
              </div>
            </div>
            <div className="assist-accordion-profile-phone">
              <div className="assist-accordion-icon-div">
                <PhoneOutlined fontSize="inherit" />
              </div>
              <div style={{ marginTop: "10px" }}>
                {props.Buyer !== null ? props.Buyer.Phone : "Hang On!"}
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
              <div className="assist-accordion-ans">
                {props.Questions[1]["24"] + " Sqft"}
              </div>
            </div>

            <div className="assist-accordion-ques-div">
              <div className="assist-accordion-icon-div">
                <Place fontSize="inherit" />
              </div>
              <div className="assist-accordion-ques">
                What cities in North Texas are you interested in?
              </div>
              {props.Questions[0]["23"].map((ans) => {
                return <div className="assist-accordion-ans">{ans}</div>;
              })}
            </div>

            <div className="assist-accordion-ques-div">
              <div className="assist-accordion-icon-div">
                <School fontSize="inherit" />
              </div>
              <div className="assist-accordion-ques">
                Which School Districts are you Interested in?
              </div>
              {props.Questions[4]["27"].map((ans) => {
                return <div className="assist-accordion-ans">{ans}</div>;
              })}
            </div>

            <div className="assist-accordion-ques-div">
              <div className="assist-accordion-icon-div">
                <LocalHotel fontSize="inherit" />
              </div>
              <div className="assist-accordion-ques">
                How many bedrooms are you interested in?
              </div>
              <div className="assist-accordion-ans">
                {props.Questions[2]["25"]}
              </div>
            </div>

            <div className="assist-accordion-ques-div">
              <div className="assist-accordion-icon-div">
                <HomeOutlined fontSize="inherit" />
              </div>
              <div className="assist-accordion-ques">
                What type of home are you looking for?
              </div>
              <div className="assist-accordion-ans">
                {props.Questions[5]["28"]}
              </div>
            </div>

            <div className="assist-accordion-ques-div">
              <div className="assist-accordion-icon-div">
                <Pool fontSize="inherit" />
              </div>
              <div className="assist-accordion-ques">Do you want a pool?</div>
              <div className="assist-accordion-ans">
                {props.Questions[6]["29"]}
              </div>
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
              <div className="assist-accordion-ans">
                {props.Questions[3]["26"]}
              </div>
            </div>
          </Grid>
        </Grid>
      </AssistAccordion>
    </>
  );
}

export default AssistInitialConsultation;
