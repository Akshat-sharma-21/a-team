import React from "react";
import PropTypes from "prop-types";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { Scaffold, ReallosButton } from "../utilities/core";
import { IconButton, Typography, CircularProgress } from "@material-ui/core";
import QuestionnaireImg from "../../assets/QuestionsImg.png";

function QuestionnaireIntro(props) {
  // function to display the first scree of questions
  const { stepName, isLoadingQuestions, onFetchQuestions } = props;

  return (
    <Scaffold bgVariant="gradient" className="questionnaire-root">
      <div className="questionnaire-back-button">
        <IconButton
          disabled={isLoadingQuestions}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          <ArrowLeftIcon size={30} />
        </IconButton>
      </div>

      {isLoadingQuestions ? (
        <div className="questionnaire-single-view-container">
          <CircularProgress />
          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Fetching the questions...
          </div>
        </div>
      ) : (
        <>
          <div className="questionnaire-main-container">
            <div className="questionnaire-main-container-single-view-child">
              <img
                src={QuestionnaireImg}
                className="questionnaire-hero-img"
                alt=""
              />
              <div>
                <Typography className="questionnaire-text">
                  Answer a few questions to get started on your {stepName}
                </Typography>
              </div>
            </div>
          </div>

          <div className="questionnaire-action-area">
            <ReallosButton
              primary
              variant="light"
              fullWidth
              disabled={isLoadingQuestions}
              onClick={() => onFetchQuestions()}
            >
              Let's Start
            </ReallosButton>
          </div>
        </>
      )}
    </Scaffold>
  );
}

export default QuestionnaireIntro;
