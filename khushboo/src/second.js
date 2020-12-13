import circle from './images/eclipse.png';
import hand from './images/second.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './second.css';
function second() {
    return (
            <div class="back">
                <div className ="pics">
                <img src={hand} className="second App-logo3"/>
                <img src={circle} className="eclipse App-logo3"/>            
                </div>
                 <div>
                <p class="Line2">We will connect you to all the professionals you need</p>
                </div>
                <div>
                <ArrowForwardIcon id='button2' variant="contained" color="primary">
                </ArrowForwardIcon>
                <ArrowBackIcon id='btn2' variant="contained" color="primary">
                </ArrowBackIcon>
            </div>
            </div>
    )
        
}
export default second;