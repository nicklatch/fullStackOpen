const mongoose = require('mongoose');
const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogs = listHelper.biggerList;
const testHelper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
}, 10000);

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 10000);

test('All blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('All blogs have ID key', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

test('A new blog can be added, verifed by returning the author', async () => {
  const newBlog = {
    title: 'A new Blog',
    author: 'Sum Gui',
    url: 'www.nope.no',
    likes: 43018,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const authors = blogsAtEnd.map((b) => b.author);
  expect(authors).toContain('Sum Gui');
});

test('If a new blog is added without likes, they will default to zero', async () => {
  const newBlogNoLikes = {
    title: 'A new Blog',
    author: 'Sum Gui',
    url: 'www.nope.no',
  };

  await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const likesArr = blogsAtEnd.map((b) => b.likes);
  expect(likesArr).toContain(0);
});

test('If a blog is added without a title, respond with 400', async () => {
  const newBlogNoTitle = {
    author: 'Sum Gui',
    url: 'www.nope.no',
  };
  await api.post('/api/blogs').send(newBlogNoTitle).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test('If a blog is added without a url, respond with 400', async () => {
  const newBlogNoTitle = {
    title: 'A new blog',
    author: 'Sum Gui',
  };
  await api.post('/api/blogs').send(newBlogNoTitle).expect(400);

  const blogsAtEnd = await testHelper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
