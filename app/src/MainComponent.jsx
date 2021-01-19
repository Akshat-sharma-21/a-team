import { Switch, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents"
import Document2 from "./components/Documents/Documents2"

function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/documents" component={Document} />
      <Route path="/documents2" component={Document2} />
    </Switch>
  );
}
export default Main;
