import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@primer/octicons-react";
import { Scaffold } from "../../utilities/core";
import { getIcon } from "./QuestionnaireIconMap";

import { Grid, IconButton, Button } from "@material-ui/core";

function OptionTypeQuestion(props) {
  // function to map option type questions
  const {
    questionTitle,
    helperText,
    options,
    onSelectOption,
    isLoadingNext,
    shouldUseGradientBackground = false,
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

          <div
            className={
              shouldUseGradientBackground
                ? "questionnaire-helper-text-gradient"
                : "questionnaire-helper-text-plain"
            }
          >
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
                  onClick={() => onSelectOption(option.label)}
                >
                  {getIcon(option.icon)} &nbsp; &nbsp; &nbsp;{option.label}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <div className="questionnaire-action-area questionnaire-action-nav-area">
        <IconButton
          className="questionnaire-arrow-button"
          onClick={() => onPrev()}
        >
          <ArrowLeftIcon size={ArrowIconSize} />
        </IconButton>

        <IconButton
          disabled
          className={
            shouldUseGradientBackground
              ? "questionnaire-arrow-button-graident-disabled"
              : "questionnaire-arrow-button-plain-disabled"
          }
        >
          <ArrowRightIcon size={ArrowIconSize} />
        </IconButton>
      </div>
    </Scaffold>
  );
}

export default OptionTypeQuestion;
