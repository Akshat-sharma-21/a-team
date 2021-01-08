import React from 'react';
import './App.css';
import {TextField,Button} from '@material-ui/core'; 
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Create_Account2 from './Create_Account2';
import Sign_in1 from './Sign_In1';
import Email from './email.js';
import Phone from './phone.js';
import Access_deny from './Access_deny';
import ReallosModal from './modal.js'

function App() {
  return (
   
   <ReallosModal visible="true" modalWidth="620px" modalHeight="391px">
    <div  className="App">
      {/* <Create_Account></Create_Account> */}
      {/* <Create_Account2></Create_Account2> */}
      {/* <Sign_in1></Sign_in1> */}
      {/* <Email></Email> */}
      <Phone></Phone>
      {/* <Access_deny></Access_deny> */}
    </div>
    </ReallosModal>
    
  );
}

function Create_Account(){
  return(
    <ReallosModal visible="true" modalWidth="620px" modalHeight="391px">
      <div className='container'>
        <div className='item1'>
          <img  src="cimage.png" alt="left component" width='300px' height='400px'></img>
        </div>

        <div className='item2'>
          <h1 className='subitem1'>Account Setup</h1>

          <TextField className='subitem2' variant='outlined' label='Email'></TextField>

          <Button className='subitem3' variant='contained'>Next
          <ArrowForwardIcon variant='contained'></ArrowForwardIcon>
          </Button>

        </div>
        </div>
    </ReallosModal>

  );
}


export default App;
