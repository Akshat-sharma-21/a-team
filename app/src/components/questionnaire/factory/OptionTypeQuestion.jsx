import React from "react";
import PropTypes from "prop-types";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";
import { Scaffold } from "../../utilities/core";
import { getIcon } from './QuestionnaireIconMap';

import {
  Grid,
  IconButton,
  Button,
} from "@material-ui/core";


/**
 * Renders options type question
 * @augments {React.Component<Props>}
 */
class OptionTypeQuestion extends React.Component {
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
     * Array of options to be displayed
     */
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
    })),

    /**
     * Callback function called when an option is selected
     * by the user.
     */
     onSelectOption: PropTypes.func,

    /**
     * Specifies if the next question is currently being
     * fetched. Used to disable the options preventing multiple
     * requests.
     */
    isLoadingNext: PropTypes.bool,

    /**
     * Specifies whether current question should render with a
     * gradient background.
     */
     shouldUseGradientBackground: PropTypes.bool,
  }

  render() {
    const {
      questionTitle,
      helperText,
      options,
      onSelectOption,
      isLoadingNext,
      shouldUseGradientBackground = false,
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

          <Grid container spacing={2} className="questionnaire-form-group">
            {options.map((option) => {
              return (
                <Grid item xs={12} md={6} key={option.label}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className="questionnaire-option-item"
                    disabled={isLoadingNext}
                    onClick={() => onSelectOption(option)}
                  >
                    {getIcon(option.icon)}
                    {option.label}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <div className="questionnaire-action-area questionnaire-action-nav-area">
          <IconButton className="questionnaire-arrow-button">
            <ArrowLeftIcon size={25} />
          </IconButton>

          <IconButton disabled className="questionnaire-arrow-button">
            <ArrowRightIcon size={25} />
          </IconButton>
        </div>
      </Scaffold>
    )
  }
}

export default OptionTypeQuestion;
