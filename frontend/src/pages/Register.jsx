import React from 'react';
import CenterLayout from '../components/CenterLayout';
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import LoggedOutNavBar from '../nav/LoggedOutNavBar';
import TextField from '../components/TextField';
import Title from '../components/Title';
import Box from '../components/Box';
import { postReq } from '../requests';
import { useContext, Context } from '../context';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const { setters } = useContext(Context);

  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let token = null;

    try {
      token = (await postReq('admin/auth/register', { email, password, name })).token;
      localStorage.setItem('token', token);
    } catch (e) {
      setters.setErrorMessage(e);
      setters.setError(true);
      resetForm();
      return;
    }

    resetForm();
    navigate('/dashboard');
  }

  return (
    <>
      <LoggedOutNavBar />
      <CenterLayout>
        <Title>
          Register
        </Title>
        <Box component='form' onSubmit={handleSubmit}>
          <Box>
            <TextField
              label="email"
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='dense'
            />
          </Box>
          <Box>
            <TextField
              label="name"
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin='dense'
            />
          </Box>
          <Box>
            <TextField
              label="password"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='dense'
            />
          </Box>
          <Box>
            <Button type='submit'>Submit</Button>
          </Box>
        </Box>
      </CenterLayout>
    </>
  );
}

export default Register;
