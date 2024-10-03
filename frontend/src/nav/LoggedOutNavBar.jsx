import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '../components/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { Link } from 'react-router-dom'

function LoggedOutNavBar () {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Big Brain
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to='/login'
            aria-label="Sign in button"
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to='/register'
            aria-label="Register button"
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default LoggedOutNavBar;
