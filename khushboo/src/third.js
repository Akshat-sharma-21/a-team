
import thirdlogo from './images/3rd.png';
import './third.css';
import Button from '@material-ui/core/Button';

function third() {
    return (
        <div>
            <div>
                <img src={thirdlogo} className="App-logo2" />
            </div>
            <div>
                <p class="Line3">Upload & Share all your documents hassle Free And we'll keep it Safe!</p>
            </div>
            <Button id='bigButton'>Let's go
            </Button>
        </div>
    )
}
export default third;