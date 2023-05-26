import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Invalid Username or Password');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <form>
      <h2>Please Login</h2>
      <span>
        <label>
          Username:{' '}
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>{' '}
        <label>
          Password:{' '}
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>{' '}
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
      </span>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default LoginForm;
