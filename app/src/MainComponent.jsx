import { Switch, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Questionnaire from "./components/questionnaire/Questionnaire";
import Signin from "./components/account/SignIn/SignIn";
import Signup from "./components/account/SignUp/SignUp";
import PreApprovalDashboard from "./components/PreApprovalDashboard/PreApprovalDashboard";
import TasksDashboard from "./components/TasksDashboard/TasksDashboard";
function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/documents" component={Document} />
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
      <Route path="/preapproval-dashboard" component={PreApprovalDashboard} />
      <Route path="/tasks_dashboard" component={TasksDashboard} />
      <Route path="/questions" component={Questionnaire} />
    </Switch>
  );
}
export default Main;
