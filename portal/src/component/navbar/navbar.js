import './navbar.css';
import navbarImg from '../../assets/navbar-logo.png';
import {AppBar, Toolbar} from '@material-ui/core';

function Navbar(props){
    return(
        <AppBar position="static" className="Navbar">
            <Toolbar variant="dense">
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;