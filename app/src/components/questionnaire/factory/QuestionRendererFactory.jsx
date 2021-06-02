import React from "react";
import OptionTypeQuestion from "./OptionTypeQuestion";
import InputTypeQuestion from "./InputTypeQuestion";
import { LinearProgress } from "@material-ui/core";

function QuestionRendererFactory(props) {
  // function to render the questions
  function renderProgressBar() {
    return (
      <LinearProgress
        className="questionnaire-progress-bar"
        style={{
          display: props.isLoadingNext ? "block" : "none",
        }}
      />
    );
  }
  const {
    questionData,
    onNext,
    isLoadingNext,
    transactionId,
    stepName,
    onPrev,
  } = props;

  if (questionData.type === "options") {
    const { id, question, helper, options, bg } = props.questionData;
    return (
      <>
        {renderProgressBar()}
        <OptionTypeQuestion
          key={id}
          questionTitle={question}
          helperText={helper}
          options={options}
          shouldUseGradientBackground={bg === 2}
          isLoadingNext={isLoadingNext}
          onSelectOption={(option) => {
            onNext(transactionId, stepName, id, option);
          }}
          onPrev={() => onPrev(transactionId, stepName, id)}
        />
      </>
    );
  } else {
    const { id, question, helper, input, bg } = props.questionData;
    return (
      <>
        {renderProgressBar()}

        <InputTypeQuestion
          key={id}
          questionTitle={question}
          helperText={helper}
          input={input}
          shouldUseGradientBackground={bg === 2}
          isLoadingNext={isLoadingNext}
          onNext={(userInputValue) => {
            onNext(transactionId, stepName, id, userInputValue);
          }}
          onPrev={() => onPrev(transactionId, stepName, id)}
        />
      </>
    );
  }
}

export default QuestionRendererFactory;
