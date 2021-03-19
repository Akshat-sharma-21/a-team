import axios from "axios";
import { setLoadingTrue, setLoadingFalse, setErrors } from "./utilsActions";

export const SET_QUESTION = "SET_QUESTION";
export const CLEAR_QUESTION = "CLEAR_QUESTION";
export const COMPLETED_QUESTIONS = "COMPLETED_QUESTIONS";

export function fetchQuestions(tid, step, question, answer) {
  return (dispatch) => {
    dispatch(setLoadingTrue()); // dispatch an action to set loading to true
    axios
      .post(`/${step}`, {
        tid: tid,
        question: question,
        answer: answer,
      })
      .then((res) => {
        if (res.data.Completed === true) {
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
