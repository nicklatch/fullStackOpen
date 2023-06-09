import { useState, useRef } from 'react';
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const removeBlog = async (blogId) => {
    if (window.confirm('Delete this blog post?')) {
      await blogService.remove(blogId);
      setBlogs(
        blogs.filter((blog) => {
          return blog.id !== blogId && blog;
        })
      );
      setNotification('Succesfully removed');
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
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
            buttonLabelOne="New Blog"
            buttonLabelTwo="Cancel"
            ref={blogFormRef}
          >
            <BlogForm
              createBlog={addBlog}
              setNotification={setNotification}
              user={user}
            />
          </Toggle>
          <BlogsList
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            user={user}
            removeBlog={removeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
