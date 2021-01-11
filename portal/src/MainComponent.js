import Dashboard from "./component/dashboard/dashboard";
import TransactionAssist from "./component/transaction assist/transactionAssist";
import PeopleInvolved from "./component/people/peopleInvolved";
import Documents from "./component/documents/Documents";
import { Switch, Route } from "react-router-dom";
function Main() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assist" component={TransactionAssist} />
      <Route path="/people" component={PeopleInvolved} />
      <Route path="/documents" component={Documents} />
    </Switch>
  );
}
export default Main;
