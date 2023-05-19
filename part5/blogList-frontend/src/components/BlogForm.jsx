/* eslint-disable react/prop-types */
import { useState } from 'react';

const BlogForm = ({ createBlog, setNotification }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
    setNotification(`${newBlogTitle} by ${newBlogAuthor} has been added!`);
    setTimeout(() => {
      setNotification('');
    }, 5000);
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  return (
    <>
      <form>
        <label>
          Title:
          <input
            type='text'
            value={newBlogTitle}
            name='Title'
            onChange={handleTitleChange}
          />
        </label>
        <label>
          {' '}
          Author:
          <input
            type='text'
            value={newBlogAuthor}
            name='Author'
            onChange={handleAuthorChange}
          />
        </label>
        <label>
          {' '}
          URL:
          <input
            type='text'
            value={newBlogUrl}
            name='URL'
            onChange={handleUrlChange}
          />
        </label>
        <button type='submit' onClick={addBlog}>
          Create
        </button>
      </form>
      <br />
    </>
  );
};

export default BlogForm;
