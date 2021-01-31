import Dashboard from "./component/dashboard/Dashboard";
import TransactionAssist from "./component/transaction_assist/TransactionAssist";
import PeopleInvolved from "./component/people/PeopleInvolved";
import Documents from "./component/documents/Documents";
import ProfileSummary from "./component/profile_summary/ProfileSummary";
import AccountSetup from "./component/account_setup/AccountSetup";
import { Switch, Route } from "react-router-dom";

function Main() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assist" component={TransactionAssist} />
      <Route path="/people" component={PeopleInvolved} />
      <Route path="/documents" component={Documents} />
      <Route path="/profile" component={ProfileSummary} />
      <Route path="/account_setup" component={AccountSetup} />
    </Switch>
  );
}

export default Main;
