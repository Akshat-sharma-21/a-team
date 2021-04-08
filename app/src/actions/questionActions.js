import axios from "axios";
import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilsActions";

export const SET_QUESTION = "SET_QUESTION";
export const CLEAR_QUESTION = "CLEAR_QUESTION";
export const COMPLETED_QUESTIONS = "COMPLETED_QUESTIONS";

export function fetchQuestions(tid, step, id, answer) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatch an action to set loading to true
    axios
      .post(`/${step}`, {
        tid: tid,
        id: id,
        answer: answer,
      })
      .then((res) => {
        if (res.data.completed === true) {
          // if the questioning have been completed
          dispatch(setLoadingFalse()); // disaptching an action to set loading to false
          dispatch(setCompletedQuestionsAction());
        } else {
          dispatch(setLoadingFalse()); // disaptching an action to set loading to false
          dispatch(setQuestionAction(res.data)); // distpatcing an action to set the next question
        }
      })
      .catch((err) => {
        dispatch(setErrors(err));
      });
  };
}

export function resetQuestion(tid, step, id) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatching an action to set loading to true
    if (step === "find-agent") step = "FindAgent";
    else if (step === "pre-approval") step = "PreApproval";
    if (id === 1) {
      // if the first question is being asked of the preapproval
      dispatch(setLoadingFalse());
      dispatch(clearQuestionsAction());
    } else {
      axios
        .post("/reset-step", {
          tid: tid,
          step: step,
          id: id,
        })
        .then((res) => {
          if (res.data.reset && res.data.reset === true) {
            dispatch(setLoadingFalse());
            dispatch(clearQuestionsAction());
          } else {
            dispatch(setLoadingFalse());
            dispatch(setQuestionAction(res.data));
          }
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    }
  };
}

function setQuestionAction(payload) {
  // pure action
  return {
    type: SET_QUESTION,
    payload,
  };
}

function setCompletedQuestionsAction() {
  //pure action
  return {
    type: COMPLETED_QUESTIONS,
  };
}

function clearQuestionsAction() {
  // pure action
  return {
    type: CLEAR_QUESTION,
  };
}
