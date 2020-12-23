import Dashboard from './component/dashboard/dashboard'
import {Switch, Route} from 'react-router-dom';
function Main(){
    return(
        <Switch>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    );
}
export default Main; 