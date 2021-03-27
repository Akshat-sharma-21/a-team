import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftIcon } from "@primer/octicons-react";
import { Scaffold, ReallosButton } from "../utilities/core";
import { IconButton, Typography } from "@material-ui/core";
import QuestionnaireImg from "../../assets/QuestionsImg.png";


/**
 * Intro page for Questionnaire.
 * @augments {React.Component<Props>}
 */
class QuestionnaireIntro extends React.Component {
  static propTypes = {
    /**
     * Name of the step for which the questionnaire
     * will be requested. This will be used to display
     * in the screen letting the user know about the
     * current step.
     */
    stepName: PropTypes.string,

    /**
     * Specifies if the questions are currently being
     * fetched. Used to disable the CTA preventing multiple
     * requests.
     */
    isLoadingQuestions: PropTypes.bool,

    /**
     * Callback function called when fetching for questions
     * is requested.
     */
    onFetchQuestions: PropTypes.func,
  };

  render() {
    const {
      stepName,
      isLoadingQuestions,
      onFetchQuestions
    } = this.props;

    return (
      <Scaffold bgVariant="gradient" className="questionnaire-root">
        <div className="questionnaire-back-button">
          <IconButton>
            <ArrowLeftIcon size={30} />
          </IconButton>
        </div>

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
      </Scaffold>
    )
  }
}

export default QuestionnaireIntro;
