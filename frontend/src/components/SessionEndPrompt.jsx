import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';
import { Link } from 'react-router-dom';

function SessionEndPrompt ({ endPrompt, setEndPrompt, checkStatusAndLoadPage }) {
  const handleClose = () => {
    setEndPrompt(false);
    checkStatusAndLoadPage();
  };

  return (
    <Dialog
      open={endPrompt}
      onClose={handleClose}
      aria-labelledby="Session ended"
      aria-describedby="Session ended by admin"
    >
      <DialogTitle>
        Session ended!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Would you like to view the results?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button component={Link} to='/dashboard' onClick={handleClose} aria-label='Return to dashboard button'>Return To Dashboard</Button>
        <Button onClick={handleClose} autoFocus aria-label='Yes go to results button'>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SessionEndPrompt;
