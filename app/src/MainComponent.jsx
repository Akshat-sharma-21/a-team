import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Onboarding from "./components/Onboarding/Onboarding";
import Roadmap from "./components/Roadmap/Roadmap";
import Document from "./components/Documents/Documents";
import Questionnaire from "./components/questionnaire/Questionnaire";
import Signin from "./components/account/SignIn/SignIn";
import Signup from "./components/account/SignUp/SignUp";
import ConnectionSignup from "./components/account/SignUp/ConnectionSignup";
import TaskSummary from "./components/TaskSummary/TaskSummary";
import TasksDashboard from "./components/TasksDashboard/TasksDashboard";
import Lenders from "./components/Lenders/Lenders";
import HomeInsurance from "./components/HomeInsurance/HomeInsurance";
import SignUpWithProvider from "./components/account/SignUpWithProviders/SignUpWithProviders";
import { getAuth } from "./Authenticate";
import DocumentViewer from "./components/Documents/viewer/DocumentViewer";
import NoDocument from "./components/Documents/NoDocuments";
import VerifyPhone from "./components/account/SignUp/VerifyPhone";
import VerifyMail from "./components/account/SignUp/VerifyMail";
import ProfileEdit from "./components/Roadmap/ProfileEdit";
import DeviceNotSupported from "./components/DeviceNotSupported/DeviceNotSupported";
import ResetPassword from "./components/account/SignUp/ResetPassword";
import CreatePassword from "./components/account/SignUp/CreatePassword";
import CheckYourMail from "./components/account/SignUp/CheckYourMail";
import Payment from "./components/payment/Payment";

const PrivateRoute = (
  { component: Component, ...rest } // Component that protects all the routing if the user is not autenticated
) => (
  <Route
    {...rest}
    render={(props) =>
      getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

function Main() {
  let [screen, setScreen] = useState(
    window.innerWidth < 425 && window.innerWidth > 319
  );
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setScreen(window.innerWidth < 425 && window.innerWidth > 319);
  };

  if (screen)
    // If the screen is in the desired range
    return (
      <Switch>
        <Route path="/Signup" component={Signup} />
        <Route path="/SignupWithProvider" component={SignUpWithProvider} />
        <Route path="/connect/:id" component={ConnectionSignup} />
        <Route path="/Signin" component={getAuth() ? Roadmap : Signin} />
        <Route path="/verifyEmail" component={VerifyMail} />
        <Route path="/verifyPhone" component={VerifyPhone} />
        <Route path="/create-password" component={CreatePassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/check-mail" component={CheckYourMail} />
        <PrivateRoute path="/profile" component={ProfileEdit} />
        <PrivateRoute path="/dashboard" component={Roadmap} />
        <PrivateRoute path="/onboarding" component={Onboarding} />
        <PrivateRoute path="/questions/:step" component={Questionnaire} />
        <PrivateRoute exact path="/documents" component={Document} />
        <PrivateRoute path="/nodoc" component={NoDocument} />
        <PrivateRoute path="/documents/:doc" component={DocumentViewer} />
        <PrivateRoute path="/tasks" component={TasksDashboard} />
        <PrivateRoute path="/:step/tasks_summary" component={TaskSummary} />
        <PrivateRoute path="/lenders" component={Lenders} />
        <PrivateRoute path="/insurance" component={HomeInsurance} />
        {/*  <PrivateRoute path="/payment" component={Payment} />*/}
        <Redirect exact from="/" to="/signin" />
        <Route path="*" component={Signin} />
        {/* Later change the last route to a error page || change the payment route to private */}
      </Switch>
    );
  else {
    return <Route path="*" component={DeviceNotSupported} />;
  }
}
export default Main;
