import React from 'react';
import CenterLayout from '../components/CenterLayout';
import Box from '../components/Box';
import Button from '../components/Button';
import { useParams } from 'react-router-dom'
import { Context, useContext } from '../context';
import { getReq, postReq } from '../requests';
import LoggedInNavBar from '../nav/LoggedInNavBar';
import Title from '../components/Title';
import SessionEndPrompt from '../components/SessionEndPrompt';
import Typography from '../components/Typography';

function Session () {
  const [results, setResults] = React.useState(null);
  const [endPrompt, setEndPrompt] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [active, setActive] = React.useState(true);

  const { sessionId, quizId } = useParams();
  const { setters } = useContext(Context);

  const advance = async (event) => {
    try {
      await postReq('admin/quiz/' + quizId + '/advance', {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    checkStatusAndLoadPage();
  }

  const stop = async (event) => {
    try {
      await postReq('admin/quiz/' + quizId + '/end', {}, localStorage.getItem('token'));
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }
    setActive(false);
    setEndPrompt(true);
  }

  const checkStatusAndLoadPage = async () => {
    let status = null;

    try {
      status = (await getReq('admin/session/' + sessionId + '/status', {}, localStorage.getItem('token'))).results;
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    setStage(parseInt(status.position) + 1);

    if (!status.active) {
      setActive(false);
    }
  }

  const loadResults = async () => {
    if (!active) {
      let results = null;
      try {
        results = await getReq('admin/session/' + sessionId + '/results', {}, localStorage.getItem('token'));
      } catch (e) {
        setters.setError(true);
        setters.setErrorMessage(e);
        return;
      }
      setResults(results);
    }
  }

  React.useEffect(() => checkStatusAndLoadPage(), []);
  React.useEffect(() => loadResults(), [active]);

  const LoadPage = () => {
    if (active) {
      return (
        <>
          <Box sx={{ mb: 3 }}>
            {stage === 0 ? <Title>Not started yet...</Title> : <Title>Displaying question {stage}...</Title>}
          </Box>
          <Box sx={{ mb: 3 }}>
            <Button onClick={advance} aria-label='Advance to next question'>Show Next Question</Button>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Button onClick={stop} color='error' aria-label='Stop game session'>Stop Session</Button>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box sx={{ mb: 3 }}>
          <Title>Results!</Title>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography>{JSON.stringify(results)}</Typography>
          </Box>
          <Box>
            <Typography>{'Fancy shmancy json results (Im outta time to parse it sorry)'}</Typography>
          </Box>
        </>
      );
    }
  }

  return (
    <>
      <SessionEndPrompt endPrompt={endPrompt} setEndPrompt={setEndPrompt} checkStatusAndLoadPage={checkStatusAndLoadPage}/>
      <LoggedInNavBar/>
      <CenterLayout>
        {LoadPage()}
      </CenterLayout>
    </>
  );
}

export default Session;
