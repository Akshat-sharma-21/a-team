import { useState } from "react";
import "./Questionnaire.css";
import QuestionnaireImg from "../../assets/QuestionsImg.png";
import QuestionnaireImgEnd from "../../assets/QuestionsImgEnd.png";
import { Scaffold, ReallosButton } from "../utilities/core";
import {
  Grid,
  IconButton,
  Typography,
  LinearProgress,
  withStyles,
  Button,
  TextField,
} from "@material-ui/core";
import {
  ArrowLeftIcon,
  RocketIcon,
  ThumbsdownIcon,
  ArrowRightIcon,
  SyncIcon,
} from "@primer/octicons-react";

const ProgressBarSimple = withStyles((theme) => ({
  // ProgressBar for the light background
  root: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "rgba(119,119,119,0.4)",
  },
  bar: {
    borderRadius: 5,
  },
}))(LinearProgress);

const ProgressBarGradient = withStyles((theme) => ({
  // ProgressBar for the Gradient background
  root: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bar: {
    borderRadius: 5,
  },
}))(LinearProgress);

function QuestionStarting({ changeQuestion }) {
  return (
    <Scaffold bgVariant="gradient" className="questionnaire">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <IconButton className="questionnaire-back-button">
            <ArrowLeftIcon size={"35"} />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <img
            src={QuestionnaireImg}
            alt=""
            width="100%"
            className="questionnaire-img"
          />
        </Grid>
        <Grid item xs={10}>
          <Typography className="questionnaire-text">
            Answer a few questions to get started on your Pre-Approval
          </Typography>
        </Grid>
        <Grid item xs={10} className="questionnaire-start-button">
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

function QuestionBasic({ changeQuestion }) {
  return (
    <Scaffold>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="questionnaire-progressbar">
          <ProgressBarSimple variant="determinate" value={50} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="questionnaire-questions">
            Are you Pre-Approved ?
            {/*Question will be dynamically fetched from the database*/}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="questionnaire-helped-text">
            Pre-approval means lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam cursus magna lectus, ut euismod neque
            feugiat sed. Phasellus ultrices est lacus, porttitor venenatis erat
            condimentum posuere
            {/*Helper text will be dynamically fetched from the database*/}
          </Typography>
        </Grid>
        {/* Options will be dynamically fetched from the databse*/}
        <Grid item xs={12} className="questionnaire-answers">
          <Button
            variant="outlined"
            fullWidth
            className="questionnaire-answers-options"
            onClick={() => changeQuestion()}
            startIcon={
              <RocketIcon size={25} className="questionnaire-answer-icons" />
            }
          >
            Yes
          </Button>
        </Grid>
        <Grid item xs={12} className="questionnaire-answers-sub">
          <Button
            variant="outlined"
            fullWidth
            className="questionnaire-answers-options"
            onClick={() => changeQuestion()}
            startIcon={
              <ThumbsdownIcon
                size={25}
                className="questionnaire-answer-icons"
              />
            }
          >
            No
          </Button>
        </Grid>
        <Grid item xs={12}>
          <IconButton className="questionnaire-arrow-button">
            <ArrowLeftIcon
              size={25}
              className="questionnaire-arrow-button-arrow"
            />
          </IconButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function QuestionGradient({ changeQuestion }) {
  return (
    <Scaffold bgVariant="gradient">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className="questionnaire-progressbar">
          <ProgressBarGradient variant="determinate" value={50} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="questionnaire-questions">
            Enter Your Name
            {/*Question will be dynamically fetched from the database*/}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="questionnaire-helped-text-gradient">
            Your name is required to lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam cursus magna lectus, ut euismod neque
            feugiat sed.
            {/*Helper text will be dynamically fetched from the database*/}
          </Typography>
        </Grid>
        {/* The type of input to be collected will be fetched from the database*/}
        <Grid item xs={12} className="questionnaire-answers">
          <TextField variant="outlined" label="Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <IconButton className="questionnaire-arrow-button-light">
            <ArrowLeftIcon
              size={25}
              className="questionnaire-arrow-button-arrow"
            />
          </IconButton>

          <IconButton
            className="questionnaire-arrow-button-light-right"
            onClick={() => changeQuestion()}
          >
            <ArrowRightIcon
              size={25}
              className="questionnaire-arrow-button-arrow"
            />
          </IconButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function EndQuestion({ changeQuestion }) {
  return (
    <Scaffold bgVariant="gradient" className="questionnaire">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <IconButton className="questionnaire-back-button">
            <ArrowLeftIcon size={"35"} />
          </IconButton>
        </Grid>
        <Grid item xs={7}>
          <img
            src={QuestionnaireImgEnd}
            alt=""
            width="100%"
            className="questionnaire-img"
          />
        </Grid>
        <Grid item xs={10}>
          <Typography className="questionnaire-text">
            You've answered all the questions! Do you want to submit them?
          </Typography>
        </Grid>
        <Grid item xs={10} className="questionnaire-finish-button">
          <ReallosButton
            primary
            variant="light"
            className="questionnaire-confirm-answer-button"
            onClick={() => changeQuestion()}
          >
            Yeah Sure!
          </ReallosButton>
        </Grid>
        <Grid item xs={10} className="questionnaire-finish-second-button">
          <ReallosButton
            variant="light"
            className="questionnaire-confirm-answer-button"
            onClick={() => changeQuestion()}
          >
            <SyncIcon size={18} className="questionnaire-refresh-icon" />
            Startover
          </ReallosButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function Questionnaire() {
  const [questions, updateQuestion] = useState(0); // The initial state of the questions is 0 which represents the starting page
  function changeQuestion() {
    if (questions === 0) {
      updateQuestion(1); // To set the questions to 1 intially when the first question is asked
    } else if (questions === 1) {
      updateQuestion(2); // To set the question to 2 when it's 1
    } else if (questions === 2) {
      updateQuestion(3); // To set the question to 1 when it's 2
    } else {
      updateQuestion(0);
    }
  }

  if (questions === 0) {
    return <QuestionStarting changeQuestion={changeQuestion} />;
  } else if (questions === 1) {
    return <QuestionBasic changeQuestion={changeQuestion} />;
  } else if (questions === 2) {
    return <QuestionGradient changeQuestion={changeQuestion} />;
  } else {
    return <EndQuestion changeQuestion={changeQuestion} />;
  }
}

export default Questionnaire;
