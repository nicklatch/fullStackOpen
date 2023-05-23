import { useEffect, Suspense } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogsList = ({ blogs, setBlogs, setErrorMessage, user, removeBlog }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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

export default BlogsList;
