import React from 'react';
import CenterLayout from '../components/CenterLayout';
import { getReq } from '../requests';
import { useContext, Context } from '../context';
import Title from '../components/Title';
import Box from '../components/Box';
import { Typography } from '@mui/material';
// import Typography from './Typography';

function PlayerQuizResults ({ playerId }) {
  const { setters } = useContext(Context);
  const [quizResults, setQuizResults] = React.useState(null);

  const getAndParseResults = async () => {
    let results = null;

    try {
      results = await getReq('play/' + playerId + '/results', {});
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
    }

    setQuizResults(results);
  }

  React.useEffect(() => {
    getAndParseResults();
  }, []);

  return (
    <>
      <CenterLayout>
        <Box sx={{ mb: 3 }}>
          <Title>Your Results!</Title>
        </Box>
        <Box sx={{ mb: 3 }}>
          {JSON.stringify(quizResults)}
        </Box>
        <Box>
          <Typography>{'fancy JSON results, again! [I have no time left to parse it :(]'}</Typography>
        </Box>
      </CenterLayout>
    </>
  );
}

export default PlayerQuizResults;
