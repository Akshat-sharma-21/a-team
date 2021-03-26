import React from "react";
import PropTypes from "prop-types";
import OptionTypeQuestion from "./OptionTypeQuestion";
import InputTypeQuestion from "./InputTypeQuestion";
import { LinearProgress } from "@material-ui/core";


/**
 * Renders a question based on the given type
 * @augments {React.Component<Props>}
 */
class QuestionRendererFactory extends React.Component {
  static propTypes = {
    /**
     * Data pertaining to the question to be rendered.
     */
    questionData: PropTypes.object,

    /**
     * Current transaction ID. This will be used to fetch
     * successive questions.
     */
    transactionId: PropTypes.string,

    /**
     * Step name for which the questions are fetched. This
     * will be used to fetch successive questions.
     */
    stepName: PropTypes.string,

    /**
     * Callback function called when the user clicks on the
     * "Next" button or selects an option.
     */
    onNext: PropTypes.func,

    /**
     * Specifies if the next question is currently being
     * fetched. Used to disable the options/input to prevent
     * multiple requests.
     */
    isLoadingNext: PropTypes.bool,
  }

  renderProgressBar() {
    return (
      <LinearProgress
        className="questionnaire-progress-bar"
        style={{
          display: this.props.isLoadingNext ? 'block' : 'none',
        }}
      />
    );
  }

  render() {
    const {
      questionData,
      onNext,
      isLoadingNext,
      transactionId,
      stepName
    } = this.props;

    if (questionData.type === "options") {
      const { question, helper, options, bg } = this.props.questionData;

      return (
        <>
          {this.renderProgressBar()}

          <OptionTypeQuestion
            questionTitle={question}
            helperText={helper}
            options={options}
            shouldUseGradientBackground={bg === 2}
            isLoadingNext={isLoadingNext}
            onSelectOption={(option) => {
              onNext(transactionId, stepName, question, option);
            }}
          />
        </>
      );
    }
    else {
      const { question, helper, inputLabel, bg } = this.props.questionData;

      return (
        <>
          {this.renderProgressBar()}

          <InputTypeQuestion
            questionTitle={question}
            helperText={helper}
            inputLabel={inputLabel}
            shouldUseGradientBackground={bg === 2}
            isLoadingNext={isLoadingNext}
            onNext={(userInputValue) => {
              onNext(transactionId, stepName, question, userInputValue);
            }}
          />
        </>
      );
    }
  }
}

export default QuestionRendererFactory;
