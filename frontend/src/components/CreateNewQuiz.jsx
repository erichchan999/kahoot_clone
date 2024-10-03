import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from './Button';
import TextField from './TextField';
import { Context, useContext } from '../context';
import { postReq } from '../requests';

function CreateNewQuiz ({ createNewQuiz, setCreateNewQuiz, populateDashboardQuizzes }) {
  const [quizName, setQuizName] = React.useState('');

  const { setters } = useContext(Context);

  const handleClose = () => {
    setCreateNewQuiz(false);
    setQuizName('');
  }

  const handleSubmit = async () => {
    try {
      await postReq('admin/quiz/new', { name: quizName }, localStorage.getItem('token'))
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    setCreateNewQuiz(false);
    setQuizName('');
    populateDashboardQuizzes();
  }

  return (
    <Dialog
      open={createNewQuiz}
      onClose={handleClose}
      aria-labelledby="Create new quiz"
      aria-describedby="Enter new quiz name"
    >
      <DialogTitle>
        Create New Quiz
      </DialogTitle>
      <DialogContent>
        <TextField
          label='name'
          type='text'
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          margin='normal'
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewQuiz;
