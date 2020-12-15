import './signup.css';
import {TextField} from '@material-ui/core'; 
import {Button} from '@material-ui/core'; 


function App() {
  return (
    < div className="App">
      
      <img id='logo' src="signup_logo.png" alt='logo'></img>
      <div>
      <h1>Tell us about yourself ,</h1>
      </div>

    <div class='Textfield'>
      <div id='t1'>
      <TextField 
        size='medium'
        label='Name'
        variant='outlined'
        color='primary'
        />
      </div>

      

      <div id='t2'>
      <TextField 
        size='medium'
        label='Email'
        variant='outlined'
        color='primary'
      />
      </div>

      

      <div id='t3'>
      <TextField 
        size='medium'
        label='Phone'
        variant='outlined'
        color='primary'
      />
      </div>

      

      <div id='t4'>
      <TextField 
        size='medium'
        label='Password'
        variant='outlined'
        color='primary'
      />
      </div>

      

      <div id='t5'>
      <TextField 
        size='medium'
        label='Confirm Password'
        variant='outlined'
        color='primary'
      />
      </div>
    </div>
    
      
      <div >
      <Button id = 'button' variant="contained" color="primary">
        Create My Account
      </Button>
      </div>

</div>
  );
}

export default App;
