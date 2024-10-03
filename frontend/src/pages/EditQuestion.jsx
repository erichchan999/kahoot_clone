import React from 'react';
import LoggedInNavBar from '../nav/LoggedInNavBar';
import CenterLayout from '../components/CenterLayout';
import Box from '../components/Box';
import Title from '../components/Title';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContext, Context } from '../context';
import { getReq, putReq } from '../requests';
import TextField from '../components/TextField';
import Button from '../components/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BlankThumbnail from '../components/BlankThumbnail';
import YoutubeEmbed from '../components/YoutubeEmbed';
import Typography from '../components/Typography';
import { Grid } from '@mui/material';
import AnswerCard from '../components/AnswerCard';
import { v4 } from 'uuid';
import { fileToDataUrl } from '../fileToDataUrl';
import Img from '../components/Img';

function EditQuestion () {
  const [questionImage, setQuestionImage] = React.useState(null);
  const [questionText, setQuestionText] = React.useState('');
  const [questionTime, setQuestionTime] = React.useState(0);
  const [questionPoints, setQuestionPoints] = React.useState(0);
  const [youtubeEmbedURL, setYoutubeEmbedURL] = React.useState('');
  const [video, setVideo] = React.useState('');
  const [answers, setAnswers] = React.useState([]);

  const imgRef = React.useRef(null);

  const { quizId, questionId } = useParams();
  const { setters } = useContext(Context);
  const navigate = useNavigate();

  const getAnswer = (id) => {
    return answers.find(answer => answer.id === id);
  }

  const updateAnswer = (id, text, correct) => {
    const answer = getAnswer(id);
    answer.text = text;
    answer.correct = correct;
    const newAnswers = answers.slice()
    setAnswers(newAnswers);
  }

  const deleteAnswer = (id) => {
    if (answers.length <= 2) {
      setters.setError(true);
      setters.setErrorMessage('Cannot have less than 2 answers');
      return;
    }

    setAnswers(answers.filter((answer) => answer.id !== id));
  }

  const createNewAnswer = async () => {
    if (answers.length >= 6) {
      setters.setError(true);
      setters.setErrorMessage('Cannot have more than 6 answers');
      return;
    }

    const newAnswers = answers.slice();
    const id = v4();
    newAnswers.push({
      text: 'empty answer',
      id,
      correct: false,
    });
    setAnswers(newAnswers);
  }

  const populateEditQuestion = async () => {
    let quiz = null;

    try {
      quiz = await getReq('admin/quiz/' + quizId, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    const fetchedQuestions = quiz.questions;

    const fetchedQuestion = fetchedQuestions.find(question => question.id === questionId);

    if (!fetchedQuestion) {
      setters.setError(true);
      setters.setErrorMessage('Question not found');
      return;
    }

    if (fetchedQuestion.image) {
      setQuestionImage(fetchedQuestion.image);
    }

    if (fetchedQuestion.video) {
      setVideo(fetchedQuestion.video);
      setYoutubeEmbedURL(fetchedQuestion.video);
    } else {
      setVideo(null);
      setYoutubeEmbedURL('');
    }

    if (fetchedQuestion.text) {
      setQuestionText(fetchedQuestion.text);
    }

    if (fetchedQuestion.time) {
      setQuestionTime(fetchedQuestion.time);
    }

    if (fetchedQuestion.points) {
      setQuestionPoints(fetchedQuestion.points);
    }

    if (fetchedQuestion.answers) {
      setAnswers(fetchedQuestion.answers);
    }
  }

  const requestQuizChanges = async () => {
    let questions = null;
    let quiz = null;

    try {
      quiz = await getReq('admin/quiz/' + quizId, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    questions = quiz.questions;

    const question = questions.find((question) => question.id === questionId);

    if (video && !questionImage) {
      question.image = null;
      question.video = video;
    } else if (!video && questionImage) {
      question.image = questionImage;
      question.video = null;
    } else if (video && questionImage) {
      question.image = questionImage;
      question.video = null;
    } else {
      question.image = questionImage;
      question.video = video;
    }

    question.text = questionText;
    question.time = questionTime;
    question.points = questionPoints;

    question.answers = answers;

    try {
      await putReq('admin/quiz/' + quizId, quiz, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    navigate('/quiz/' + quizId);
  }

  const media = () => {
    if (questionImage) {
      return <Img src={questionImage} alt='question image' />
    } else if (video) {
      return <YoutubeEmbed link={video} alt='question video' />
    } else {
      return <BlankThumbnail />
    }
  }

  const uploadImage = async (event) => {
    let img = null;
    try {
      img = await fileToDataUrl(event.target.files[0]);
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e.message);
    }
    setQuestionImage(img);
    if (imgRef.current) {
      imgRef.current.value = null;
    }
  }

  React.useEffect(populateEditQuestion, []);

  return (
    <>
      <LoggedInNavBar/>
      <CenterLayout>
        <Title sx={{ mb: 3 }}>Edit Question</Title>
        <Grid container columnSpacing={2} sx={{ mb: 3 }}>
          <Grid item md={6} xs={12}>
            <Box sx={{ mb: 3 }}>
              {media()}
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Question Text"
                type='text'
                multiline
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Time limit: seconds"
                type='number'
                value={questionTime}
                onChange={(e) => setQuestionTime(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Points"
                type='number'
                value={questionPoints}
                onChange={(e) => setQuestionPoints(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                  label="Youtube video embed URL"
                  type='url'
                  value={youtubeEmbedURL}
                  onChange={(e) => setYoutubeEmbedURL(e.target.value)}
                />
                <Button
                  onClick={() => {
                    setVideo(null);
                    setYoutubeEmbedURL('');
                  }}
                  aria-label='reset video button'
                >
                  Reset Video
                </Button>
                <Button onClick={() => setVideo(youtubeEmbedURL)} aria-label='Load youtube video link'>Load Video</Button>
              </Box>
              <Typography sx={{ my: 0.5 }}> Or </Typography>
              <Box>
                <Button onClick={() => setQuestionImage(null)} aria-label='reset image button'>Reset Image</Button>
                <Button component="label" startIcon={<PhotoCamera />} aria-label='upload image button'>
                  Upload
                  <input ref={imgRef} hidden accept="image/*" type="file" onInput={uploadImage} />
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>
              { answers.map(answer => {
                return (
                  <AnswerCard
                    getAnswer={getAnswer}
                    updateAnswer={updateAnswer}
                    id={answer.id}
                    key={answer.id}
                    deleteAnswer={deleteAnswer}
                  />
                );
              })}
            </Box>
            <Box>
              <Button onClick={createNewAnswer} aria-label='create new answer button'>Create New Answer</Button>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Button color="error" component={Link} to={'/quiz/' + quizId} aria-label='Discard changes to question button'>Discard</Button>
          <Button onClick={populateEditQuestion} aria-label='Reset changes to question button'>Reset</Button>
          <Button onClick={requestQuizChanges} color='success' aria-label='Save changes to question button'>Save Changes</Button>
        </Box>
      </CenterLayout>
    </>
  );
}

export default EditQuestion;
