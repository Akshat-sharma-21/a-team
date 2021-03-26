import React from 'react';
import PropTypes from 'prop-types';
import { ArrowLeftIcon, SyncIcon } from "@primer/octicons-react";
import { Scaffold, ReallosButton } from "../utilities/core";
import { IconButton, Typography } from "@material-ui/core";
import QuestionnaireImgEnd from "../../assets/QuestionsImgEnd.png";


/**
 * Intro page for Questionnaire.
 * @augments {React.Component<Props>}
 */
class QuestionnaireOutro extends React.Component {
  static propTypes = {
    /**
     * Callback function called when user requests to submit
     * the questionnaire responses.
     */
    onSubmit: PropTypes.func,

    /**
     * Callback function called when user requests to start
     * over the questionnaire.
     */
    onStartOver: PropTypes.func,
  };

  render() {
    const { onSubmit, onStartOver } = this.props;

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
            className="questionnaire-action"
          >
            Yeah Sure!
          </ReallosButton>

          <ReallosButton
            variant="light"
            onClick={() => onStartOver()}
            className="questionnaire-action"
          >
            <SyncIcon size={18} />
            Startover
          </ReallosButton>
        </div>
      </Scaffold>
    )
  }
}

export default QuestionnaireOutro;
