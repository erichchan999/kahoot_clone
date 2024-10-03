import React from 'react';
import LoggedInNavBar from '../nav/LoggedInNavBar';
import CenterLayout from '../components/CenterLayout';
import Box from '../components/Box';
import { useParams } from 'react-router-dom';
import { useContext, Context } from '../context';
import { getReq, putReq } from '../requests';
import Button from '../components/Button';
import BlankThumbnail from '../components/BlankThumbnail';
import TextField from '../components/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Typography from '../components/Typography';
import { fileToDataUrl } from '../fileToDataUrl';
import QuizChangesSaved from '../components/QuizChangesSaved';
import { v4 } from 'uuid';
import QuestionCard from '../components/QuestionCard';
import Img from '../components/Img';

function EditQuiz () {
  const [questions, setQuestions] = React.useState([]);
  const [quizMetaSaved, setQuizMetaSaved] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(null);

  const imgRef = React.useRef();

  const { quizId } = useParams();
  const { setters } = useContext(Context);

  const populateQuizQuestions = async () => {
    let quiz = null;

    try {
      quiz = await getReq('admin/quiz/' + quizId, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    setTitle(quiz.name);
    setThumbnail(quiz.thumbnail);

    const fetchedQuestions = quiz.questions;

    setQuestions(fetchedQuestions.map((question) => {
      return (
        <QuestionCard
          populateQuizQuestions={populateQuizQuestions}
          question={question.text}
          questionId={question.id}
          quizId={quizId}
          key={question.id}
        />
      );
    }));
  }

  const uploadImage = async (event) => {
    let img = null;
    try {
      img = await fileToDataUrl(event.target.files[0]);
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e.message);
    }
    setThumbnail(img);
    if (imgRef.current) {
      imgRef.current.value = null;
    }
  }

  const requestQuizMetaChanges = async () => {
    try {
      await putReq('admin/quiz/' + quizId, { name: title, thumbnail }, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
    }

    populateQuizQuestions();
    setQuizMetaSaved(true);
  }

  const createQuestion = async () => {
    let quiz = null;

    try {
      quiz = await getReq('admin/quiz/' + quizId, {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    const fetchedQuestions = quiz.questions;

    fetchedQuestions.push({
      id: v4(),
      text: 'empty question',
      time: 10,
      points: 5,
      answers: [
        { id: v4(), text: 'empty answer', correct: false },
        { id: v4(), text: 'empty answer', correct: false }
      ]
    });

    try {
      await putReq('admin/quiz/' + quizId, quiz, localStorage.getItem('token'))
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    populateQuizQuestions();
  }

  React.useEffect(populateQuizQuestions, []);

  return (
    <>
      <QuizChangesSaved quizSaved={quizMetaSaved} setQuizSaved={setQuizMetaSaved}/>
      <LoggedInNavBar/>
      <CenterLayout>
        <Box sx={{ mb: 3 }}>
          <Typography>Quiz Name: </Typography>
          <TextField
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          {thumbnail ? <Img src={thumbnail} alt='quiz image' /> : <BlankThumbnail />}
        </Box>
        <Box sx={{ mb: 3 }}>
          <Button onClick={() => setThumbnail(null)} aria-label='reset image button'>Reset Image</Button>
          <Button component="label" startIcon={<PhotoCamera />} aria-label='upload image button'>
            Upload
            <input ref={imgRef} hidden accept="image/*" type="file" onInput={uploadImage} />
          </Button>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Button onClick={populateQuizQuestions} aria-label='Reset meta quiz changes'>Reset</Button>
          <Button onClick={requestQuizMetaChanges} color='success' aria-label='Submit meta quiz changes'>Save Changes</Button>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Button onClick={createQuestion} aria-label='create question button'>Create New Question</Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {questions}
        </Box>
      </CenterLayout>
    </>
  );
}

export default EditQuiz;
