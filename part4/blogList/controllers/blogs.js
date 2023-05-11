const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.status(200).json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog ? response.status(200).json(blog) : response.status(404).end();
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'invalid token' });
  }
  const user = await User.findById(decodedToken.id);

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  );

  response.status(201).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    response.status(401).json({ error: 'invalid token' });
  }
  const user = await User.findById(decodedToken.id);
  console.log(user.id);
  const blogToRemove = await Blog.findById(request.params.id);
  console.log(String(blogToRemove.user), blogToRemove.id);
  console.log(user.id === String(blogToRemove.user));

  if (user.id !== String(blogToRemove.user)) {
    response
      .status(401)
      .json({ error: 'You do not have permission to remove this blog' })
      .end();
  } else {
    await Blog.findByIdAndRemove(blogToRemove.id);
    response.status(204).end();
  }
});

module.exports = blogsRouter;
