import Dashboard from "./component/dashboard/dashboard";
import TransactionAssist from "./component/transaction assist/transactionAssist";
import { Switch, Route } from "react-router-dom";
function Main() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assist" component={TransactionAssist} />
    </Switch>
  );
}
export default Main;
