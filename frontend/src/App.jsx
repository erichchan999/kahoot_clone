import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authenticate from './components/Authenticate';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AutoSignIn from './components/AutoSignIn';
import { Context, initialValue } from './context';
import ErrorAlert from './components/ErrorAlert';
import EditQuiz from './pages/EditQuiz';
import EditQuestion from './pages/EditQuestion';
import Play from './pages/Play';
import Session from './pages/Session';

function App () {
  const [error, setError] = React.useState(initialValue.error);
  const [errorMessage, setErrorMessage] = React.useState(initialValue.errorMessage);
  const getters = {
    error,
    errorMessage,
  }
  const setters = {
    setError,
    setErrorMessage
  }
  return (
    <>
      <ErrorAlert error={error} setError={setError} errorMessage={errorMessage} />
      <Context.Provider value={{ getters, setters }}>
        <BrowserRouter>
            <Routes>
              <Route index element={<AutoSignIn redirectTo='/dashboard'><Login /></AutoSignIn>} />
              <Route path="/login" element={<AutoSignIn redirectTo='/dashboard'><Login /></AutoSignIn>} />
              <Route path="/register" element={<AutoSignIn redirectTo='/dashboard'><Register /></AutoSignIn>} />
              <Route path="/dashboard" element={<Authenticate redirectTo='/'><Dashboard /></Authenticate>}/>
              <Route path="/quiz/:quizId" element={<Authenticate redirectTo='/'><EditQuiz /></Authenticate>}/>
              <Route path="/quiz/:quizId/question/:questionId" element={<Authenticate redirectTo='/'><EditQuestion /></Authenticate>}/>
              <Route path="/session/:sessionId/quiz/:quizId" element={<Authenticate redirectTo='/'><Session /></Authenticate>}/>
              <Route path="/play" element={<Play />}/>
              <Route path="/play/:sessionId" element={<Play />}/>
            </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
