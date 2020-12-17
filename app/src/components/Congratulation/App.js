import './App.css';
import React from "react";
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import logo3 from './logo3.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function App() {
  return (
    <div className="App"> 


      <div class ='header'>      
      <p>Congtratulations,-Name- <img src={logo3} alt="logo"></img></p>
      
      </div>
      <img class='logo1' src={logo1} alt='logo'></img>
      <br></br>
      <img class='logo2' src={logo2} alt='logo'></img>
      <div>
      <p class='line2'>You're one step close to your dream house</p>
      </div>
      <div >
      <ArrowForwardIcon class = 'button' variant="contained" color="primary">
      </ArrowForwardIcon>
      </div>
</div>
  );
}

export default App;















