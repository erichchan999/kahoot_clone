import React from 'react';
import CenterLayout from '../components/CenterLayout';
import JoinQuiz from '../components/JoinQuiz';
import { useParams } from 'react-router-dom'
import PlayQuiz from '../components/PlayQuiz';
import PlayerQuizResults from '../components/PlayerQuizResults';

function Play () {
  const [sessionJoined, setSessionJoined] = React.useState(false);
  const [quizEnded, setQuizEnded] = React.useState(false);
  const [playerId, setPlayerId] = React.useState(-42);

  const { sessionId } = useParams();

  const loadPage = () => {
    if (sessionJoined && !quizEnded) {
      return <PlayQuiz playerId={playerId} setQuizEnded={setQuizEnded}/>
    } else if (sessionJoined && quizEnded) {
      return <PlayerQuizResults playerId={playerId} />
    } else {
      return <JoinQuiz fetchedSessionId={sessionId} setSessionJoined={setSessionJoined} setPlayerId={setPlayerId} />
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

export default Play;
