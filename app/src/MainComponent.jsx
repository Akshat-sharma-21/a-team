import { Switch, Route, Redirect } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Questionnaire from "./components/questionnaire/Questionnaire";
import Signin from "./components/account/SignIn/SignIn";
import Signup from "./components/account/SignUp/SignUp";
import PreApprovalDashboard from "./components/PreApprovalDashboard/PreApprovalDashboard";
import TasksDashboard from "./components/TasksDashboard/TasksDashboard";
import { getAuth } from "./Authenticate";

const PrivateRoute = (
  { component: Component, ...rest } // Component that protects all the routing if the user is not autenticated
) => (
  <Route
    {...rest}
    render={(props) =>
      getAuth() ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
    }
  />
);

function Main() {
  return (
    <Switch>
      <PrivateRoute path="/onboarding" component={Onboarding} />
      <PrivateRoute path="/dashboard" component={Roadmap} />
      <PrivateRoute path="/documents" component={Document} />
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
      <PrivateRoute path="/tasks_summary" component={PreApprovalDashboard} />
      <PrivateRoute path="/tasks_dashboard" component={TasksDashboard} />
      <PrivateRoute path="/questions/:step" component={Questionnaire} />
      <Redirect exact from="/" to="/signin" />
      <Route path="*" component={Signin} />
      {/* Later change the last route to a error page */}
    </Switch>
  );
}
export default Main;
