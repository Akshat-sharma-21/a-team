import { useState, useEffect } from "react";
import "./Questionnaire.css";
import QuestionnaireImg from "../../assets/QuestionsImg.png";
import QuestionnaireImgEnd from "../../assets/QuestionsImgEnd.png";
import { Scaffold, ReallosButton } from "../utilities/core";
import { useParams, useHistory } from "react-router-dom";
import { fetchQuestions } from "../../actions/questionActions";
import { fetchUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

const mapStateToProps = (state) => ({
  utils: state.utils,
  questions: state.questions,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchQuestions, fetchUser }, dispatch);
};

function QuestionStarting({ fetchQuestion, loading, step, Transaction }) {
  // if the step is pre-approval
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
            Answer a few questions to get started on your {step}
          </Typography>
        </Grid>
        <Grid item xs={10} className="questionnaire-start-button">
          <ReallosButton
            primary
            variant="light"
            fullWidth
            disabled={loading}
            onClick={() => {
              fetchQuestion(Transaction, step);
            }}
          >
            Let's Start
          </ReallosButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function QuestionBasic({
  Question,
  Type,
  Options,
  fetchQuestion,
  step,
  loading,
  Transaction,
}) {
  let [textval, textvalChange] = useState("");
  if (Type === "Options") {
    // If the question is of type options
    return (
      <Scaffold>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className="questionnaire-progressbar">
            <ProgressBarSimple variant="determinate" value={50} />
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-questions">
              {Question}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-helped-text">
              {/*Helper text will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          {/* Options will be dynamically fetched from the databse*/}
          {Options.map((option) => {
            return (
              <Grid item xs={12} className="questionnaire-answers">
                <Button
                  variant="outlined"
                  fullWidth
                  className="questionnaire-answers-options"
                  disabled={loading}
                  onClick={() =>
                    fetchQuestion(Transaction, step, Question, option)
                  }
                >
                  {option}
                </Button>
              </Grid>
            );
          })}
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
  } else {
    return (
      <Scaffold>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className="questionnaire-progressbar">
            <ProgressBarGradient variant="determinate" value={50} />
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-questions">
              {Question}
              {/*Question will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-helped-text-gradient">
              {/*Helper text will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          {/* The type of input to be collected will be fetched from the database*/}
          <Grid item xs={12} className="questionnaire-answers">
            <TextField
              variant="outlined"
              fullWidth
              value={textval}
              onChange={(event) => {
                textvalChange(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton className="questionnaire-arrow-button">
              <ArrowLeftIcon
                size={25}
                className="questionnaire-arrow-button-arrow"
              />
            </IconButton>

            <IconButton
              className="questionnaire-arrow-button-right"
              onClick={() =>
                fetchQuestion(Transaction, step, Question, textval)
              }
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
}

function QuestionGradient({
  Question,
  Options,
  Type,
  fetchQuestion,
  step,
  loading,
  Transaction,
}) {
  let [textval, textvalChange] = useState("");
  if (Type === "Options") {
    // if the question is of type options
    return (
      <Scaffold bgVariant="gradient">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className="questionnaire-progressbar">
            <ProgressBarSimple variant="determinate" value={50} />
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-questions">
              {Question}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-helped-text">
              {/*Helper text will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          {/* Options will be dynamically fetched from the databse*/}
          {Options.map((option) => {
            return (
              <Grid item xs={12} className="questionnaire-answers">
                <Button
                  variant="outlined"
                  fullWidth
                  className="questionnaire-answers-options"
                  disabled={loading}
                  onClick={() =>
                    fetchQuestion(Transaction, step, Question, option)
                  }
                >
                  {option}
                </Button>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <IconButton className="questionnaire-arrow-button-light">
              <ArrowLeftIcon
                size={25}
                className="questionnaire-arrow-button-arrow"
              />
            </IconButton>
          </Grid>
        </Grid>
      </Scaffold>
    );
  } else {
    return (
      <Scaffold bgVariant="gradient">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} className="questionnaire-progressbar">
            <ProgressBarGradient variant="determinate" value={50} />
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-questions">
              {Question}
              {/*Question will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="questionnaire-helped-text-gradient">
              {/*Helper text will be dynamically fetched from the database*/}
            </Typography>
          </Grid>
          {/* The type of input to be collected will be fetched from the database*/}
          <Grid item xs={12} className="questionnaire-answers">
            <TextField
              variant="outlined"
              fullWidth
              value={textval}
              onChange={(event) => {
                textvalChange(event.target.value);
              }}
            />
            <IconButton className="questionnaire-arrow-button-light">
              <ArrowLeftIcon
                size={25}
                className="questionnaire-arrow-button-arrow"
              />
            </IconButton>

            <IconButton
              className="questionnaire-arrow-button-light-right"
              onClick={() =>
                fetchQuestion(Transaction, step, Question, textval)
              }
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
}

function EndQuestion({ history }) {
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
            onClick={() => history.push("/tasks_summary")}
          >
            Yeah Sure!
          </ReallosButton>
        </Grid>
        <Grid item xs={10} className="questionnaire-finish-second-button">
          <ReallosButton
            variant="light"
            className="questionnaire-confirm-answer-button"
          >
            <SyncIcon size={18} className="questionnaire-refresh-icon" />
            Startover
          </ReallosButton>
        </Grid>
      </Grid>
    </Scaffold>
  );
}

function Questionnaire(props) {
  useEffect(() => {
    if (props.utils.reload === true) {
      props.fetchUser();
    }
  }, []);

  const history = useHistory();

  let { step } = useParams(); // getting the step for which the questions must be fetched
  if (props.questions.bg === 0) {
    // if we are fetching the questions for the first time
    return (
      <QuestionStarting
        fetchQuestion={props.fetchQuestions}
        Loading={props.utils.loading}
        step={step}
        Transaction={props.user.Transaction}
      />
    );
  } else if (props.questions.bg === 1) {
    // if bg is set to 1
    return (
      <QuestionBasic
        Question={props.questions.Question}
        Options={props.questions.Options}
        Type={props.questions.Type}
        fetchQuestion={props.fetchQuestions}
        step={step}
        loading={props.utils.loading}
        Transaction={props.user.Transaction}
      />
    );
  } else if (props.questions.bg === 2) {
    return (
      <QuestionGradient
        Question={props.questions.Question}
        Options={props.questions.Options}
        Type={props.questions.Type}
        fetchQuestion={props.fetchQuestions}
        step={step}
        loading={props.utils.loading}
        Transaction={props.user.Transaction}
      />
    );
  } else if (props.questions.bg === 3) {
    // if the questiong have been completed
    return <EndQuestion history={history} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
