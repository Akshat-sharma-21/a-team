import React from 'react';
import {TextField,Button,Checkbox} from '@material-ui/core'; 

function Sign_in1(){
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
                <Checkbox style={{marginTop:'40px'}}
                    value="checkedA"
                />
                <h5 style={{marginTop:'73px'}}>Remember Me</h5> 

                <a href='#' style={{marginTop:'70px',marginLeft:'20px'}}>Forgot Password ?</a>

            </div>

            <Button variant='filled' style={subitem3}>SIGN IN</Button>

            <div className='item4' style={item4}>

            <p>Want To Be The Part Of Platfrom ? </p>
            <a href='#' style={{color:'blue',marginTop:'12px'}}>Register Now</a>

            </div>

            </div>
            </div>

    );
}

const subitem2 = {
    width:'275px',
    height:'10px',
    top:'-20px',
    left:'10px'
}

const subitem6 = {
    width:'275px',
    height:'10px',
    top:'20px',
    left:'10px'
}

const item3 = {
    display:'flex',
    flexdirection:'row'
}

const subitem3 = {
    background:'linear-gradient(to left,#33ccff 0%,#2B44FF 90%)',
    color:'white',
    width:'275px',
    height:'40px',
    marginLeft:'20px'

}

const item4={
    display:'flex',
    flexdirection:'row'
}


export default Sign_in1;