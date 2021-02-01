import { Switch, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Document2 from "./components/Documents/Documents2";
import Signin from "./components/account/SignIn/SignIn";
import Signup from "./components/account/SignUp/SignUp";
import PreApproval from "./components/PreApproval/PreApproval";
import PreApproval2 from "./components/PreApproval2/PreApproval2";

function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/documents" component={Document} />
      <Route path="/documents2" component={Document2} />
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
      <Route path="/preapproval" component={PreApproval} />
      <Route path="/preapproval2" component={PreApproval2} />
    </Switch>
  );
}
export default Main;
