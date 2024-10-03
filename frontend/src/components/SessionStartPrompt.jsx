import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function SessionStartPrompt ({ startPrompt, setStartPrompt, sessionId, quizId }) {
  const navigate = useNavigate();

  const handleClose = () => {
    setStartPrompt(false);
    navigate('/session/' + sessionId + '/quiz/' + quizId);
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(`http://localhost:3000/play/${sessionId}`);
  }

  return (
    <Dialog
      open={startPrompt}
      onClose={handleClose}
      aria-labelledby="Session ended"
      aria-describedby="Session ended by admin"
    >
      <DialogTitle>
        Session started!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Session ID: {sessionId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopy} autoFocus aria-label='Copy session Id button'>Copy Session Id</Button>
        <Button onClick={handleClose} aria-label='Go to session button'>To Session</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SessionStartPrompt;
