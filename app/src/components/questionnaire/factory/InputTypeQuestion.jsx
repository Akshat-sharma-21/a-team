import React from "react";
import PropTypes from "prop-types";
import { Scaffold } from "../../utilities/core";

import {
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@primer/octicons-react";


/**
 * Renders input type question
 * @augments {React.Component<Props>}
 */
class InputTypeQuestion extends React.Component {
  static propTypes = {
    /**
     * Title of the Question
     */
    questionTitle: PropTypes.string,

    /**
     * Helper text for description
     */
    helperText: PropTypes.string,

    /**
     * Placeholder to be displayed for the input box.
     */
    inputLabel: PropTypes.string,

    /**
     * Callback function called when the user clicks on the
     * "Next" button.
     */
    onNext: PropTypes.func,

    /**
     * Specifies if the next question is currently being
     * fetched. Used to disable the input.
     */
    isLoadingNext: PropTypes.bool,

    /**
     * Specifies whether current question should render with a
     * gradient background.
     */
    shouldUseGradientBackground: PropTypes.bool,
  }

  constructor() {
    super();

    this.state = {
      userInputValue: '',
    };
  }

  /**
   * Updates User Input value
   * @param {Event} event 
   */
  updateUserInputValue(event) {
    this.setState({
      userInputValue: event.target.value,
    })
  }
  
  render() {
    const {
      questionTitle,
      helperText,
      inputLabel,
      isLoadingNext,
      shouldUseGradientBackground = false,
      onNext,
    } = this.props;

    return (
      <Scaffold
        bgVariant={shouldUseGradientBackground ? 'gradient' : 'plain'}
        className="questionnaire-root"
      >
        <Grid container direction="column" className="questionnaire-main-container">
          <div className="questionnaire-header-group">
            <div className="questionnaire-question">
              {questionTitle}
            </div>

            <div className="questionnaire-helper-text">
              {helperText}
            </div>
          </div>

          <div className="questionnaire-form-group">
            <TextField
              label={inputLabel}
              variant="outlined"
              fullWidth
              value={this.state.userInputValue}
              disabled={isLoadingNext}
              onChange={(event) => this.updateUserInputValue(event)}
            />
          </div>
        </Grid>

        <div className="questionnaire-action-area questionnaire-action-nav-area">
          <IconButton className="questionnaire-arrow-button">
            <ArrowLeftIcon size={25} />
          </IconButton>

          <IconButton
            className="questionnaire-arrow-button"
            onClick={() => onNext(this.state.userInputValue)}
          >
            <ArrowRightIcon size={25} />
          </IconButton>
        </div>
      </Scaffold>
    )
  }
}

export default InputTypeQuestion;