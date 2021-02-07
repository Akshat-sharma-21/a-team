import { useState } from "react";
import "./Questionnaire.css";
import QuestionnaireImg from "../../assets/QuestionsImg.png";
import { Scaffold, ReallosButton } from "../utilities/core";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowLeftIcon } from "@primer/octicons-react";

function QuestionStarting({ changeQuestion }) {
  return (
    <Scaffold bgVariant="gradient" className="questionnaire">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <IconButton className="questionnaire-back-button">
            <ArrowLeftIcon size={"35"} />
          </IconButton>
        </Grid>
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={6}>
          <img
            src={QuestionnaireImg}
            alt=""
            width="100%"
            className="questionnaire-img"
          />
        </Grid>
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={10}>
          <Typography className="questionnaire-text">
            Answer a few questions to get started on your Pre-Approval
          </Typography>
        </Grid>
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />

        <Grid item xs={10}>
          <ReallosButton
            primary
            variant="light"
            fullWidth
            onClick={() => changeQuestion()}
          >
            Let's Start
          </ReallosButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function Questionnaire() {
  const [questions, updateQuestion] = useState(0); // The initial state of the questions is 0 which represents the starting page
  function changeQuestion() {
    if (questions == 0) {
      updateQuestion(1); // To set the questions to 1 intially when the first question is asked
    } else if (questions == 1) {
      updateQuestion(2); // To set the question to 2 when it's 1
    } else {
      updateQuestion(1); // To set the question to 1 when it's 2
    }
  }

  if (questions == 0) {
    return <QuestionStarting changeQuestion={changeQuestion} />;
  } else if (questions == 1) {
    return <Scaffold></Scaffold>;
  } else {
    return <Scaffold bgVariant="gradient"></Scaffold>;
  }
}

export default Questionnaire;
