import React from 'react';
import CenterLayout from '../components/CenterLayout';
import { useContext, Context } from '../context';
import { putReq, getReq } from '../requests';
import Button from '../components/Button'
import Title from '../components/Title';
import Box from '../components/Box';
import useInterval from '../customHooks/UseInterval';
import Img from './Img';
import YoutubeEmbed from './YoutubeEmbed';
import BlankThumbnail from './BlankThumbnail';
import Typography from './Typography';

function PlayQuiz ({ playerId, setQuizEnded }) {
  const [playerAnswers, setPlayerAnswers] = React.useState([]);
  const [trueAnswer, setTrueAnswer] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [question, setQuestion] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [video, setVideo] = React.useState(null);

  const [quizStarted, setQuizStarted] = React.useState(false);
  const [questionId, setQuestionId] = React.useState(-42);
  const [questionTimeOut, setQuestionTimeOut] = React.useState(false);
  const [timer, setTimer] = React.useState(-42);

  const { setters } = useContext(Context);

  const pollQuizStarted = async () => {
    let started = false

    try {
      started = (await getReq(`play/${playerId}/status`, {})).started
    } catch (e) {
      if (quizStarted) {
        setQuizEnded(true);
        return;
      } else {
        setters.setError(true);
        setters.setErrorMessage(e);
        return;
      }
    }

    if (started) {
      setQuizStarted(true);
    }
  }

  const pollQuestion = async () => {
    if (quizStarted) {
      let question = null;

      try {
        question = (await getReq(`play/${playerId}/question`, {})).question;
      } catch (e) {
        if (quizStarted) {
          setQuizEnded(true);
          return;
        }
        setters.setError(true);
        setters.setErrorMessage(e);
        return;
      }

      if (question.id !== questionId) {
        setQuestion(question.text);
        setImage(question.image);
        setVideo(question.video);

        question.answers.map((answer) => { return { ...answer, disabled: false } })
        setAnswers(question.answers);

        setQuestionId(question.id);
        setTimer(parseFloat(question.time));
        setQuestionTimeOut(false);
        setPlayerAnswers([]);
      }
    }
  }

  useInterval(pollQuizStarted, 300);
  useInterval(pollQuestion, 300);
  useInterval(() => { setTimer(timer - 1) }, questionTimeOut ? null : 1000);

  React.useEffect(() => {
    if (timer <= 0) {
      setQuestionTimeOut(true);
      disableAllAnswerButtons();
      updateTrueAnswer();
    }
  }, [timer]);

  const updateTrueAnswer = async () => {
    if (!quizStarted) {
      return;
    }

    let answers = null;

    try {
      answers = (await getReq('play/' + playerId + '/answer', {})).answerIds;
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }
    setTrueAnswer(answers);
  }

  const displayTrueAnswer = () => {
    if (questionTimeOut) {
      if (trueAnswer !== []) {
        return trueAnswer.map((answer) => <Box key={answer.id}><Typography key={answer.id}>{answer.text}</Typography></Box>)
      } else {
        return <Typography color='text.secondary'>NO ANSWER</Typography>
      }
    }
  }

  const loadMedia = () => {
    if (image && video) {
      return <Img src={image}/>
    }
    if (image) {
      return <Img src={image}/>
    } else if (video) {
      return <YoutubeEmbed link={video}/>
    } else {
      return <BlankThumbnail/>
    }
  }

  const selectAnswer = async (answerId) => {
    try {
      await putReq(`play/${playerId}/answer`, { answerIds: [...playerAnswers, answerId] });
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    setPlayerAnswers([...playerAnswers, answerId])
  }

  const getAnswer = (id) => {
    return answers.find(answer => answer.id === id);
  }

  const disableAnswerButton = (answerId) => {
    getAnswer(answerId).disabled = true;
    setAnswers(answers.slice());
  }

  const isAnswerButtonDisabled = (answerId) => {
    return getAnswer(answerId).disabled;
  }

  const disableAllAnswerButtons = () => {
    answers.map(answer => {
      answer.disabled = true
      return null
    });
    setAnswers(answers.slice())
  }

  const loadAnswerButtons = () => {
    return answers.map(answer => {
      return (
        <Button
          sx={{ mx: 2, mb: 2, textTransform: 'none' }}
          onClick = {(e) => {
            selectAnswer(answer.id);
            disableAnswerButton(answer.id);
          }}
          aria-label='answer button'
          key={answer.id}
          variant='contained'
          disabled={isAnswerButtonDisabled(answer.id)}
          size='large'
        >
          {answer.text}
        </Button>
      );
    });
  }

  const loadPage = () => {
    if (quizStarted) {
      return (
        <>
          <Box sx={{ mb: 3 }}>
            <Title>{question}</Title>
          </Box>
          <Box sx={{ mb: 3 }}>
            {loadMedia()}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>Time Remaining: {timer}</Typography>
          </Box>
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {loadAnswerButtons()}
          </Box>
          <Box sx={{ mb: 3 }}>
            {questionTimeOut && <Typography>Answer: </Typography>}
            {displayTrueAnswer()}
          </Box>
        </>
      );
    } else {
      return <Title>Please Wait</Title>
    }
  }

  return (
    <>
      <CenterLayout>
        {loadPage()}
      </CenterLayout>
    </>
  );
}

export default PlayQuiz;
