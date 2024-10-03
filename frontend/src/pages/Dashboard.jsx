import React from 'react';
import LoggedInNavBar from '../nav/LoggedInNavBar';
import CenterLayout from '../components/CenterLayout';
import Box from '../components/Box';
import QuizCard from '../components/QuizCard';
import { getReq } from '../requests';
import { Context, useContext } from '../context';
import Button from '../components/Button';
import CreateNewQuiz from '../components/CreateNewQuiz';
import Title from '../components/Title';

function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [createNewQuiz, setCreateNewQuiz] = React.useState(false);

  const { setters } = useContext(Context);

  const populateDashboardQuizzes = async () => {
    let fetchedQuizzes = null;

    try {
      fetchedQuizzes = (await getReq('admin/quiz', {}, localStorage.getItem('token'))).quizzes;
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
      return;
    }

    fetchedQuizzes = fetchedQuizzes.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    })

    try {
      fetchedQuizzes = await Promise.all(
        fetchedQuizzes.map(
          async (quiz) => {
            return {
              id: quiz.id,
              ...(await getReq('admin/quiz/' + quiz.id, {}, localStorage.getItem('token')))
            }
          }
        )
      );
    } catch (e) {
      setters.setError(true);
      setters.setErrorMessage(e);
    }

    fetchedQuizzes = fetchedQuizzes.map(quiz =>
      <QuizCard
        key={quiz.id}
        title={quiz.name}
        thumbnail={quiz.thumbnail}
        questionSize={quiz.questions.length}
        quizTime={quiz.questions.reduce(
          (accumulator, currentValue) => accumulator + parseFloat(currentValue.time),
          0
        )}
        id={quiz.id}
        populateDashboardQuizzes={populateDashboardQuizzes}
      />
    );

    setQuizzes(fetchedQuizzes)
  }

  React.useEffect(populateDashboardQuizzes, []);

  return (
    <>
      <CreateNewQuiz createNewQuiz={createNewQuiz} setCreateNewQuiz={setCreateNewQuiz} populateDashboardQuizzes={populateDashboardQuizzes}/>
      <LoggedInNavBar/>
      <CenterLayout>
        <Box sx={{ mb: 3 }}>
          <Title>Dashboard</Title>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Button onClick={() => { setCreateNewQuiz(true); }}>Create New Game</Button>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {quizzes}
        </Box>
      </CenterLayout>
    </>
  );
}

export default Dashboard;
