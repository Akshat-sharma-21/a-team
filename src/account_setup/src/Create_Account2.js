import React from 'react';
import {TextField,Button} from '@material-ui/core'; 
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
function Create_Account2(){
    return(
        <div className='container'>
          <div className='item1'>
            <img  src="cimage.png" alt="left component" width='300px' height='400px'></img>
          </div>
  
          <div className='item2'>
            <h1 className='subitem1' style={{marginTop:'-30px',marginLeft:'-30px'}}>Account Setup</h1>

            <TextField style={subitem2} className='subitem2' variant='outlined' label='Create Password'></TextField>
            <TextField style={subitem6} className='subitem6' variant='outlined' label='Confirm Password'></TextField>


            <div className='item3' style={item3}>
            <Button style={subitem4} className='subitem4' variant='contained'>Back</Button>
            <Button style={subitem5} className='subitem5' variant='contained'>Next<ArrowForwardIcon variant='contained'></ArrowForwardIcon></Button>
            </div>
          </div>
          </div>
    );
}


const item3={
    display:'flex',
    flexdirection:'row',
    marginTop:'-60px'
}


const subitem2 =  {
    width: '275px',
    height: '10px',
    top: '-70px',
    left: '10px'
};

const subitem6 =  {
    width: '275px',
    height: '10px',
    top: '-80px',
    left: '10px'
};



const subitem4 ={
    top: '60px',
    left: '90px',
    width:'80px',
    height:'40px'
};

const subitem5 ={
    top: '60px',
    left: '100px',
    background: 'linear-gradient(to left,#33ccff 0%,#2B44FF 90%)',
    color: 'white',
    width:'80px',
    height:'40px'
};

export default Create_Account2;

