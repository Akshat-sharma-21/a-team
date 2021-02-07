import { useState } from "react";
import "./Questionnaire.css";
import QuestionnaireImg from "../../assets/QuestionsImg.png";
import { Scaffold, ReallosButton } from "../utilities/core";
import {
  Grid,
  IconButton,
  Typography,
  LinearProgress,
  withStyles,
  Button,
} from "@material-ui/core";
import {
  ArrowLeftIcon,
  RocketIcon,
  ThumbsdownIcon,
} from "@primer/octicons-react";

const ProgressBarSimple = withStyles((theme) => ({
  root: {
    height: 8,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "##000000",
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

function QuestionBasic({ changeQuestion }) {
  return (
    <Scaffold className="questionnaire-progressbar">
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <ProgressBarSimple
            variant="determinate"
            value={50}
          ></ProgressBarSimple>
        </Grid>
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12}>
          <Typography className="questionnaire-questions">
            Are you Pre-Approved ?{" "}
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
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
        <Grid item xs={12} className="questionnaire-empty-div" />
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

  if (questions == 1) {
    return <QuestionStarting changeQuestion={changeQuestion} />;
  } else if (questions == 0) {
    return <QuestionBasic changeQuestion={changeQuestion} />;
  } else {
    return <Scaffold bgVariant="gradient"></Scaffold>;
  }
}

export default Questionnaire;
