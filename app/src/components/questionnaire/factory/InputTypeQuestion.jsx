import React, { useState } from "react";
import { Scaffold } from "../../utilities/core";
import { Grid, IconButton, TextField } from "@material-ui/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";

function InputTypeQuestion(props) {
  // function to display input type questions
  let [userInputValue, setUserInputValue] = useState("");
  const {
    questionTitle,
    helperText,
    input,
    isLoadingNext,
    shouldUseGradientBackground = false,
    onNext,
    onPrev,
  } = props;

  let ArrowIconSize = 25;
  if (window.innerHeight < 750) ArrowIconSize = 21;
  return (
    <Scaffold
      bgVariant={shouldUseGradientBackground ? "gradient" : "plain"}
      className="questionnaire-root"
    >
      <Grid
        container
        direction="column"
        className="questionnaire-main-container"
      >
        <div className="questionnaire-header-group">
          <div className="questionnaire-question">{questionTitle}</div>

          <div className="questionnaire-helper-text">{helperText}</div>
        </div>

        <div className="questionnaire-form-group">
          {input.type === "date" ? (
            <TextField
              label={input.label}
              variant="outlined"
              type="date"
              fullWidth
              value={userInputValue}
              disabled={isLoadingNext}
              onChange={(event) => {
                setUserInputValue(event.target.value);
              }}
            />
          ) : (
            <TextField
              label={input.label}
              variant="outlined"
              fullWidth
              value={userInputValue}
              disabled={isLoadingNext}
              onChange={(event) => {
                setUserInputValue(event.target.value);
              }}
            />
          )}
        </div>
      </Grid>

      <div className="questionnaire-action-area questionnaire-action-nav-area">
        <IconButton
          className="questionnaire-arrow-button"
          onClick={() => onPrev()}
        >
          <ArrowLeftIcon size={ArrowIconSize} />
        </IconButton>

        <IconButton
          className="questionnaire-arrow-button"
          onClick={() => onNext(userInputValue)}
        >
          <ArrowRightIcon size={ArrowIconSize} />
        </IconButton>
      </div>
    </Scaffold>
  );
}

export default InputTypeQuestion;
