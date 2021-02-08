import { Switch, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Questionnaire from "./components/questionnaire/Questionnaire";
import Signin from "./components/account/SignIn/SignIn";
import Signup from "./components/account/SignUp/SignUp";
<<<<<<< HEAD
import Recommend from "./components/Recommened/Recommend";

=======
import PreAprooval from "./components/Pre-Aprooval/PreAprooval";
import PreAprooval1 from "./components/Pre-Aprooval/PreAprooval1";
import PreAprooval2 from "./components/Pre-Aprooval/PreAprooval2";
import PreAprooval3 from "./components/Pre-Aprooval/PreAprooval3";
import PreAprooval4 from "./components/Pre-Aprooval/PreAprooval4";
import PreApprovalDashboard from "./components/PreApprovalDashboard/PreApprovalDashboard";
import TasksDashboard from "./components/TasksDashboard/TasksDashboard";
>>>>>>> upstream/master
function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/documents" component={Document} />
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
<<<<<<< HEAD
      <Route path="/Recommend" component={Recommend} />
=======
      <Route path="/pre1" component={PreAprooval} />
      <Route path="/pre2" component={PreAprooval1} />
      <Route path="/pre3" component={PreAprooval2} />
      <Route path="/pre4" component={PreAprooval3} />
      <Route path="/pre5" component={PreAprooval4} />
      <Route path="/preapproval-dashboard" component={PreApprovalDashboard} />
      <Route path="/tasks_dashboard" component={TasksDashboard} />
      <Route path="/questions" component={Questionnaire} />
>>>>>>> upstream/master
    </Switch>
  );
}
export default Main;
