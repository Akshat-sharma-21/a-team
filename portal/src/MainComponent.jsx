import Dashboard from "./component/dashboard/Dashboard";
import TransactionAssist from "./component/transaction_assist/TransactionAssist";
import PeopleInvolved from "./component/people/PeopleInvolved";
import Documents from "./component/documents/Documents";
import ProfileSummary from "./component/profile_summary/ProfileSummary";
import CreateAccount1 from "./component/account_setup/CreateAccount1";
import CreateAccount2 from "./component/account_setup/CreateAccount2";
import EmailVerification from "./component/account_setup/EmailVerification";
import PhoneVerification from "./component/account_setup/PhoneVerification";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assist" component={TransactionAssist} />
      <Route path="/people" component={PeopleInvolved} />
      <Route path="/documents" component={Documents} />
      <Route path="/profile" component={ProfileSummary} />
      <Route path="/create_account/1" component={CreateAccount1} />
      <Route path="/create_account/2" component={CreateAccount2} />
      <Route path="/create_account/3" component={EmailVerification} />
      <Route path="/create_account/4" component={PhoneVerification} />
    </Switch>
  );
}

export default Main;
