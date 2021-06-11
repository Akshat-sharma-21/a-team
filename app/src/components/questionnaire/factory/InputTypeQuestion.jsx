import React, { useState } from "react";
import { Scaffold } from "../../utilities/core";
import { Grid, IconButton, TextField } from "@material-ui/core";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                disableFuture
                variant="dialog"
                format="MM/dd/yyyy"
                name="date"
                label="Date of Birth"
                value={userInputValue === "" ? new Date() : userInputValue}
                onChange={(event) => {
                  let dateString = // Formating the string in a particular format
                    event.toDateString().split(" ")[1] +
                    " " +
                    event.toDateString().split(" ")[2] +
                    " " +
                    event.toDateString().split(" ")[3] +
                    " ";
                  setUserInputValue(dateString);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
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
