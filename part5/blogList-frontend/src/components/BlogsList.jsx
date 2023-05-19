import { useState, useEffect } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import Toggle from './Toggle';

const BlogsList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogsList;
