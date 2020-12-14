import './App.css';
import React from "react";
import logo1 from './logo1.png';
import logo2 from './logo2.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function App() {
  return (
    <div className="App">
      
      
      <div>
      
      <h1>Congtratulations,-Name- ❤️</h1>
      </div>
      <img id='logo1' src={logo1} alt='logo'></img>
      <br></br>
      <img id='logo2' src={logo2} alt='logo'></img>
      <div>
      <h2>You're one step close to your dream house</h2>
      </div>
      <div >
      <ArrowForwardIcon id = 'button' variant="contained" color="primary">
      </ArrowForwardIcon>
      </div>

</div>
  );
}

export default App;
