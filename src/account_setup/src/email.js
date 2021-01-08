import React from 'react';
import {TextField,Button} from '@material-ui/core'; 
import { Input } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'


function Email(){
    return(
        <div className='container'>
            <div className='item1'>
                <img  src="cimage.png" alt="left component" width='300px' height='400px'></img>
             </div>

            <div className='item2'>
                <img  style={{marginTop:'-20px',marginLeft:'120px'}} src='verified.png' alt='verified logo' width='60px' height='60px'></img>

                <h2 style={{marginLeft:'20px',marginTop:'-10px'}} >Email Verification</h2>

                <p style={{marginLeft:'20px',marginTop:'-30px'}}>A confirmation code has sent to your email .
                    Please enter it to proceed.
                </p>

                <div className='item3' style={{marginLeft:'40px',display:'flex',flexDirection:'row'}}>

                    <TextField variant="outlined" style={mystyle,{marginLeft:'-5px'}} ></TextField>
                    <TextField variant="outlined" style={mystyle,{marginLeft:'10px'}} ></TextField>
                    <TextField variant="outlined" style={mystyle,{marginLeft:'10px'}} ></TextField>
                    <TextField variant="outlined" style={mystyle,{marginLeft:'10px'}} ></TextField>
                
                </div>

                <p>Did'nt get the code ? <a href='#' style={{color:'blue'}}>resend it</a></p>

                <div style={{display:'flex',flexdirection:'row',marginLeft:'100px',marginTop:'-20px'}}>

                    <Button style={{width:'50px',height:'35px'}} variant='contained'>BACK</Button>

                    <Button  variant='filled' 
                        style={{background:'linear-gradient(to left,#33ccff 0%,#2B44FF 90%)', 
                                marginLeft:'20px',
                                width:'80px',
                                height:'35px',
                                color:'white'}}>
                        NEXT
                        <ArrowForwardIcon style={{color:'white'}} variant='contained'></ArrowForwardIcon>
                    </Button>

                </div>
            
            </div>

         </div>
       
         
    );
}

const mystyle = {
    width:'50px',
    height:"10px",
    borderradius:" 12px 12px 12px 12px ",
    marginTop:'-20px'
};


export default Email;