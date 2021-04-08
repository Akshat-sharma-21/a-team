import { useEffect } from "react";
import "./Questionnaire.css";
import { useParams, useHistory } from "react-router-dom";
import { fetchQuestions, resetQuestion } from "../../actions/questionActions";
import { fetchUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QuestionnaireIntro from "./QuestionnaireIntro";
import QuestionnaireOutro from "./QuestionnaireOutro";
import QuestionRendererFactory from "./factory/QuestionRendererFactory";

const mapStateToProps = (state) => ({
  utils: state.utils,
  questions: state.questions,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchQuestions, fetchUser, resetQuestion },
    dispatch
  );
};

/**
 * Renders Questionnaire page.
 *
 * @param {object} props
 * @returns {JSX.Element}
 */
function Questionnaire(props) {
  useEffect(() => {
    if (props.utils.reload === true) {
      props.fetchUser();
    }
  }, []);

  const history = useHistory();

  // getting the step for which the questions must be fetched
  let { step } = useParams();

  const { fetchQuestions } = props;
  const { loading } = props.utils;
  const { Transaction: transactionId } = props.user;

  if (props.questions.bg === 0) {
    // If we are fetching the questions for the first time.
    return (
      <QuestionnaireIntro
        stepName={step}
        isLoadingQuestions={loading}
        onFetchQuestions={() => {
          fetchQuestions(transactionId, step);
        }}
      />
    );
  } else if (props.questions.bg === 3) {
    // If the user answers all the questions.
    return (
      <QuestionnaireOutro
        onSubmit={() => history.push(`/${step}/tasks_summary`)}
        onStartOver={() => {
          props.resetQuestion(transactionId, step, -1);
        }}
      />
    );
  } else {
    // Render the question that has been fetched.
    return (
      <QuestionRendererFactory
        questionData={props.questions}
        isLoadingNext={loading}
        onNext={props.fetchQuestions}
        onPrev={props.resetQuestion}
        transactionId={transactionId}
        stepName={step}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
