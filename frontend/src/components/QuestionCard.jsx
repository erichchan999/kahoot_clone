import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from './Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Button from './Button';
import { useContext, Context } from '../context';
import { getReq, putReq } from '../requests';
import { useNavigate } from 'react-router-dom'

function QuestionCard ({ populateQuizQuestions, question, questionId, quizId }) {
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  async function handleDelete () {
    let quiz = null;

    try {
      quiz = await getReq('admin/quiz/' + quizId, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    quiz.questions = quiz.questions.filter((question) => { return question.id !== questionId });

    try {
      await putReq('admin/quiz/' + quizId, quiz, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    populateQuizQuestions();
  }

  return (
    <Card sx={{ width: 200, mb: 2, mx: 1 }}>
      <CardActionArea onClick={() => { navigate('/quiz/' + quizId + '/question/' + questionId) }}>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {question}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'right' }}>
        <Button onClick={handleDelete} color="error" aria-label='Delete question button'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuestionCard;
