import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import SignIn from './components/account/SignIn/SignIn';
import SignUp from "./components/account/SignUp/SignUp";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}
export default Main;
