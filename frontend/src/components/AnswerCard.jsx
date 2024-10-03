import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from './Typography';
import { CardActions } from '@mui/material';
import Button from './Button';
import TextField from './TextField';

function AnswerCard ({ getAnswer, updateAnswer, id, deleteAnswer }) {
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    setText(getAnswer(id).text);
    setIsCorrect(getAnswer(id).correct);
  }, [])

  function handleDelete () {
    deleteAnswer(id);
  }

  const getCorrectButton = () => {
    if (isCorrect) {
      return (
        <Button
          onClick={() => {
            setIsCorrect(false);
            updateAnswer(id, text, false);
          }}
          aria-label='Turn incorrect button'
          color="success"
          variant="contained"
        >
          Correct
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            setIsCorrect(true);
            updateAnswer(id, text, true);
          }}
          aria-label='Turn correct button'
        >
          Correct
        </Button>
      );
    }
  }

  return (
    <Card sx={{ width: 200, mb: 2, mx: 1 }}>
      <CardContent>
        <Typography gutterBottom variant={'h6'}>
          Answer:
        </Typography>
        <TextField
          type='text'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            updateAnswer(id, e.target.value, isCorrect);
          }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'right' }}>
        {getCorrectButton()}
        <Button onClick={handleDelete} color="error" aria-label='Delete answer button'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default AnswerCard;
