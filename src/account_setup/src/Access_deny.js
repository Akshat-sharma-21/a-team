import React from 'react';
import {Button} from '@material-ui/core'; 

function Access_deny(){
    return(
        <div className='container'>
            <div className='item1'>
            <img  src="cimage.png" alt="left component" width='300px' height='400px'></img>
            </div>

            <div className="item2">
                <img 

                style={{marginLeft:'120px',marginTop:'-20px'}} 
                src="deny.png" width="70px" height="70x" alt=" Access denied logo">

                </img>

                <h2 style={{ marginLeft:'20px',marginTop:'-10px'}} >Access Denied</h2>

                <p style={{marginTop:'-20px'}}>We are a closed platform and your email does'nt seems to
                    be in our list.To be a part of our platform fill out a form at
                    
                <a href="#" style={{color:'blue'}}> reallos.com</a>
                </p>

                <Button variant="outlined" style={{ left:'100px', width:"100px", height:"40px" }}>Go Back</Button>

            </div>
        </div>
           
    );
}

export default Access_deny;