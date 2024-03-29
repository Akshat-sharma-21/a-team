import { useEffect, useState } from "react";
import Dashboard from "./component/dashboard/Dashboard";
import TransactionAssist from "./component/transaction_assist/TransactionAssist";
import PeopleInvolved from "./component/people/PeopleInvolved";
import Documents from "./component/documents/Documents";
import DocumentViewer from "./component/documents/viewer/DocumentViewer";
import ProfileSummary from "./component/profile_summary/ProfileSummary";
import AccountSetup from "./component/account_setup/AccountSetup";
import Signin from "./component/account_setup/SignIn";
import DeviceNotSupported from "./component/DeviceNotSupported/DeviceNotSupported";
import Onboarding from "./component/Onboarding/Onboarding";
import { Switch, Route, Redirect } from "react-router-dom";
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
  let [screen, setScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setScreen(window.innerWidth > 768);
  };

  if (screen) {
    return (
      <Switch>
        <Route path="/onboarding" component={Onboarding} />

        <PrivateRoute exact path="/transactions" component={Dashboard} />
        <PrivateRoute
          path="/transactions/:tid/assist"
          component={TransactionAssist}
        />
        <PrivateRoute
          path="/transactions/:tid/people"
          component={PeopleInvolved}
        />
        <PrivateRoute
          path="/transactions/:tid/documents/:doc"
          component={DocumentViewer}
        />
        <PrivateRoute
          path="/transactions/:tid/documents"
          component={Documents}
        />
        <PrivateRoute path="/profile" component={ProfileSummary} />
        <Route path="/account-setup" component={AccountSetup} />
        <Route path="/home" component={getAuth() ? Dashboard : Signin} />
        <Redirect exact from="/" to="home" />
        <Route path="*" component={Signin} />
        {/*Later change the last Route to the Error component */}
      </Switch>
    );
  } else {
    return <Route path="*" component={DeviceNotSupported} />;
  }
}

export default Main;
