import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from './Typography';
import { CardActionArea, CardActions } from '@mui/material';
import BlankThumbnail from '../img/blankthumbnail.jpg';
import Button from './Button';
import { useContext, Context } from '../context';
import { getReq, postReq, deleteReq } from '../requests';
import { useNavigate } from 'react-router-dom'
import Box from './Box';
import SessionStartPrompt from './SessionStartPrompt';

function QuizCard ({ title, thumbnail, questionSize, quizTime, id, populateDashboardQuizzes }) {
  const [sessionId, setSessionId] = React.useState(-42);
  const [startPrompt, setStartPrompt] = React.useState(false);

  const { setters } = useContext(Context);

  const navigate = useNavigate();

  async function handleDelete () {
    try {
      await deleteReq('admin/quiz/' + id, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    populateDashboardQuizzes();
  }

  async function handleStartSession () {
    let fetchedQuizzes = null;

    try {
      fetchedQuizzes = (await getReq('admin/quiz', {}, localStorage.getItem('token'))).quizzes;
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    const quiz = fetchedQuizzes.find(quiz => quiz.id === id);
    const fetchedSessionId = quiz.active;

    if (!fetchedSessionId) {
      try {
        await postReq('admin/quiz/' + id + '/start', {}, localStorage.getItem('token'));
      } catch (e) {
        setters.setError(true);
        setters.setErrorMessage(e);
        return;
      }

      let fetchedQuizzes = null;

      try {
        fetchedQuizzes = (await getReq('admin/quiz', {}, localStorage.getItem('token'))).quizzes;
      } catch (e) {
        setters.setError(true);
        setters.setErrorMessage(e);
        return;
      }

      const quiz = fetchedQuizzes.find(quiz => quiz.id === id);
      setSessionId(quiz.active);
      setStartPrompt(true);
    } else {
      navigate('/session/' + fetchedSessionId + '/quiz/' + id);
    }
  }

  return (
    <>
      <SessionStartPrompt startPrompt={startPrompt} setStartPrompt={setStartPrompt} sessionId={sessionId} quizId={id}/>
      <Card sx={{ width: 200, mb: 2, mx: 1 }}>
        <CardActionArea onClick={() => { navigate('/quiz/' + id) }}>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail || BlankThumbnail}
            alt="game card image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Box>
              <Typography variant='body'>
                Questions: {questionSize}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body'>
                Quiz time: {quizTime}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'right' }}>
          <Button onClick={handleStartSession} aria-label='Start quiz session button'>
            Start Session
          </Button>
          <Button onClick={handleDelete} color="error" aria-label='Delete quiz button'>
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default QuizCard;
