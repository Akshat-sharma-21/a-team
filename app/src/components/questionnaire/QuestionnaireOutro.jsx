import { ArrowLeftIcon, SyncIcon } from "@primer/octicons-react";
import { Scaffold, ReallosButton } from "../utilities/core";
import { IconButton, CircularProgress, Typography } from "@material-ui/core";
import QuestionnaireImgEnd from "../../assets/QuestionsImgEnd.png";

function QuestionnaireOutro(props) {
  // Questions outro
  const { onSubmit, onStartOver, isLoading } = props;

  return (
    <Scaffold bgVariant="gradient" className="questionnaire-root">
      <div className="questionnaire-back-button">
        <IconButton disabled={isLoading}>
          <ArrowLeftIcon size={30} />
        </IconButton>
      </div>

      {isLoading ? (
        <div className="questionnaire-single-view-container">
          <CircularProgress />
          <div
            style={{
              marginTop: 50,
              fontSize: 20,
            }}
          >
            Selecting an Ideal Agent for you
          </div>
        </div>
      ) : (
        <>
          <div className="questionnaire-main-container">
            <div className="questionnaire-main-container-single-view-child">
              <img
                src={QuestionnaireImgEnd}
                className="questionnaire-hero-img"
                alt=""
              />
              <div>
                <Typography className="questionnaire-text">
                  You've answered all the questions! Do you want to submit them?
                </Typography>
              </div>
            </div>
          </div>

          <div className="questionnaire-action-area">
            <ReallosButton
              primary
              variant="light"
              onClick={() => onSubmit()}
              disabled={isLoading}
              className="questionnaire-action"
            >
              Yeah Sure!
            </ReallosButton>

            <ReallosButton
              variant="light"
              onClick={() => onStartOver()}
              disabled={isLoading}
              className="questionnaire-action"
            >
              <SyncIcon size={18} />
              Startover
            </ReallosButton>
          </div>
        </>
      )}
    </Scaffold>
  );
}

export default QuestionnaireOutro;
