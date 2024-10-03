import React from 'react';
import CenterLayout from '../components/CenterLayout';
import { postReq } from '../requests';
import { useContext, Context } from '../context';
import Button from '../components/Button'
import TextField from '../components/TextField';
import Title from '../components/Title';
import Box from '../components/Box';

function JoinQuiz ({ fetchedSessionId, setSessionJoined, setPlayerId }) {
  const [name, setName] = React.useState('');
  const [inputSessionId, setInputSessionId] = React.useState('');

  const { setters } = useContext(Context);

  const joinSession = async (sessionId, name) => {
    try {
      setPlayerId((await postReq('play/join/' + sessionId, { name })).playerId);
      setSessionJoined(true);
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
    }
  }

  React.useEffect(() => {
    if (fetchedSessionId) {
      setInputSessionId(fetchedSessionId);
    }
  }, [])

  return (
    <>
      <CenterLayout>
        <Box sx={{ mb: 3 }}>
          <Title>Join Session</Title>
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            label='Session ID'
            type='number'
            value={inputSessionId}
            onChange={(e) => setInputSessionId(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            label='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Button aria-label='Join quiz button' onClick={() => joinSession(inputSessionId, name)}>
          Join Quiz
        </Button>
      </CenterLayout>
    </>
  );
}

export default JoinQuiz;
