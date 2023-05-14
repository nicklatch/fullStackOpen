import BlogsList from './components/BlogsList';
import Header from './components/Header';
import './App.css';
import { useState } from 'react';
import LoginForm from './components/LoginForm';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Header user={user} />
      {user === null ? <LoginForm setUser={setUser} /> : <BlogsList />}
    </>
  );
};

export default App;
