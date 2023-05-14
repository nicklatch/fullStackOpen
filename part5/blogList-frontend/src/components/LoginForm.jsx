/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const LoginForm = ({ setUser }) => {
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
      console.log(exception);
    }
    console.log(`${username} is logged in`);
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

export default LoginForm;
