import BlogsList from './components/BlogsList';
import Header from './components/Header';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import ErrorMessage from './components/ErrorMessage';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');

  return (
    <>
      <Header user={user} setUser={setUser} />
      <ErrorMessage errorMessage={errorMessage} />
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <BlogsList
          setErrorMessage={setErrorMessage}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default App;
