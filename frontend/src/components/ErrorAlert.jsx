import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';

function ErrorAlert ({ error, setError, errorMessage }) {
  const handleClose = () => {
    setError(false);
  };

  return (
    <Dialog
      open={error}
      onClose={handleClose}
      aria-labelledby="Error"
      aria-describedby="User error occured"
    >
      <DialogTitle>
        Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorAlert;
