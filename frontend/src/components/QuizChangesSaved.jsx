import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';

function QuizChangesSaved ({ quizSaved, setQuizSaved }) {
  const handleClose = () => {
    setQuizSaved(false);
  }

  return (
    <Dialog
      open={quizSaved}
      onClose={handleClose}
      aria-labelledby="Saved message"
      aria-describedby="Quiz name and thumbnail saved"
    >
      <DialogTitle>
        Saved!
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Quiz name and thumbnail saved
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default QuizChangesSaved;
