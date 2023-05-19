import { useState, useRef, useEffect } from 'react';
import blogService from './services/blogs';
import BlogsList from './components/BlogsList';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import ErrorMessage from './components/ErrorMessage';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Toggle from './components/Toggle';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const response = await blogService.create(blogObject);
    setBlogs(blogs.concat(response.data));
  };

  return (
    <>
      <Header user={user} setUser={setUser} />
      <ErrorMessage errorMessage={errorMessage} />
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <>
          <Toggle
            buttonLabelOne='New Blog'
            buttonLabelTwo='Cancel'
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} setNotification={setNotification} />
          </Toggle>
          <BlogsList
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
    </>
  );
};

export default App;
