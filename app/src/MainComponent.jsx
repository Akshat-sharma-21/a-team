import { Switch, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Document2 from "./components/Documents/Documents2";
import PreAprooved from "./components/PreAprooval/PreAprooved";
import PreAprooved1 from "./components/PreAprooval/PreAprooved1";
import PreAprooved2 from "./components/PreAprooval/PreAprooved2";
import PreAprooved3 from "./components/PreAprooval/PreAprooved3";
import PreAprooved4 from "./components/PreAprooval/PreAprooved4";

function Main() {
  return (
    <Switch>
      <Route path="/onboard" component={Onboarding} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/documents" component={Document} />
      <Route path="/documents2" component={Document2} />
      <Route path="/pre" component={PreAprooved} />
      <Route path="/pre1" component={PreAprooved1} />
      <Route path="/pre2" component={PreAprooved2} />
      <Route path="/pre3" component={PreAprooved3} />
      <Route path="/pre4" component={PreAprooved4} />
    </Switch>
  );
}
export default Main;
