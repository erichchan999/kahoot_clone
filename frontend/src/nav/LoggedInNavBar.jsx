import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '../components/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '../components/Typography';
import Button from '../components/Button';
import { postReq } from '../requests'
import { useContext, Context } from '../context';
import { Link, useNavigate } from 'react-router-dom'

function LoggedInNavBar () {
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  const onLogOut = async () => {
    try {
      await postReq('admin/auth/logout', {}, localStorage.getItem('token'));
      navigate('/');
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
    }
    localStorage.removeItem('token');
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
              <Typography variant="h6" component="div" sx={{ marginRight: 1 }}>
                Big Brain
              </Typography>
              <Button
                color="inherit"
                component={Link}
                to='/dashboard'
                aria-label='To dashboard button'
              >
                Dashboard
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
              <Button
                color="inherit"
                onClick={() => onLogOut()}
                aria-label="Sign out button"
              >
                Log Out
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default LoggedInNavBar;
