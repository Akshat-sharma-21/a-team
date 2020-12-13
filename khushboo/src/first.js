import firstlogo from './images/group.png';
import './first.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function first() {
    return (
        <div>
            <div>
                <img src={firstlogo} className="App-logo1"></img>
            </div>
            <div>
                <p className="Line1">We will guide you through out the process and will do the hardwork!</p>
            </div>
            <div>
                <ArrowForwardIcon id='button1' variant="contained" color="primary">
                </ArrowForwardIcon>
                <ArrowBackIcon id='btn1' variant="contained" color="primary">
                </ArrowBackIcon>
            </div>
        </div>
    )
}

export default first;