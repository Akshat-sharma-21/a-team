import Dashboard from "./component/dashboard/dashboard";
import TransactionAssist from "./component/transaction assist/transactionAssist";
import PeopleInvolved from "./component/people/peopleInvolved";
import Documents from "./component/documents/Documents";
import ProfileSummary from "./component/profile_summary/profileSummary";
import Create_Account1 from "./component/account_setup/Create_Account1";
import Create_Account2 from "./component/account_setup/Create_Account2";
import Email from "./component/account_setup/email";
import Phone from "./component/account_setup/phone";

import { Switch, Route } from "react-router-dom";
function Main() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assist" component={TransactionAssist} />
      <Route path="/people" component={PeopleInvolved} />
      <Route path="/documents" component={Documents} />
      <Route path="/profile" component={ProfileSummary} />
      <Route path="/acc1" component={Create_Account1} />
      <Route path="/acc2" component={Create_Account2} />
      <Route path="/acc3" component={Email} />
      <Route path="/acc4" component={Phone} />
    </Switch>
  );
}
export default Main;
