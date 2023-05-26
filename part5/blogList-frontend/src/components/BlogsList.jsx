import { useEffect, Suspense } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const BlogsList = ({ blogs, setBlogs, setErrorMessage, user, removeBlog }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Suspense fallback={<span>loading</span>}>
        {blogs
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setErrorMessage={setErrorMessage}
              user={user}
              removeBlog={removeBlog}
            />
          ))
          .sort()}
      </Suspense>
    </>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default BlogsList;
