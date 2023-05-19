import { useEffect, Suspense } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogsList = ({ blogs, setBlogs, setErrorMessage }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      <Suspense fallback={<span>loading</span>}>
        {blogs
          .map((blog) => (
            <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} />
          ))
          .sort()}
      </Suspense>
    </>
  );
};

export default BlogsList;
