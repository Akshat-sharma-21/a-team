import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import SignIn from './components/account/SignIn/SignIn';
import SignUp from "./components/account/SignUp/SignUp";
import Document from "./components/Documents/Documents";
import Document2 from "./components/Documents/Documents2";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/documents" component={Document} />
      <Route path="/documents2" component={Document2} />
    </Switch>
  );
}
export default Main;
