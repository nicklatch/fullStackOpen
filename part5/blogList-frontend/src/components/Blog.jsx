import { Suspense, useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setErrorMessage, user }) => {
  const [buttonName, setButtonName] = useState('View');
  const [visibility, setVisiblity] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);

  const shownVisibility = {
    display: visibility ? 'flex' : 'none',
    flexDirection: 'column',
  };

  const toggleVisibility = () => {
    setVisiblity(!visibility);
    setButtonName(buttonName === 'View' ? 'Hide' : 'View');
  };

  const handleLikeButton = async () => {
    try {
      const newLikes = blogLikes + 1;
      const updatedLikes = { ...blog, likes: newLikes };
      const response = await blogService.update(blog.id, updatedLikes);
      setBlogLikes(response.likes);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const stylesMain = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    border: '2px solid black',
    marginBottom: '1rem',
    borderRadius: '5px',
    padding: '4px',
  };

  const titleAuthor = {
    marginRight: '1rem',
    marginTop: '2px',
    marginBottom: '2px',
  };

  return (
    <div key={blog.id} style={stylesMain}>
      <h4 style={titleAuthor}>
        {blog.title}, {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonName}</button>
      </h4>
      <div style={shownVisibility}>
        <span>
          <a id='url' href={blog.url}>
            {blog.url}
          </a>
        </span>
        <span>
          <label htmlFor='likes'>Likes: </label>
          <span id='likes'>{blogLikes} </span>
          <button onClick={handleLikeButton}>like</button>
        </span>
        <span>{!blog.user.name ? user.name : blog.user.name}</span>
      </div>
    </div>
  );
};

export default Blog;
