const mongoose = require('mongoose');
const helper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialNotes = helper.biggerList;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialNotes) {
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
  expect(response.body).toHaveLength(initialNotes.length);
});

test('blogs all have defined id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;
  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

// !left off at completeion of 4.10
test('new blog is added', async () => {
  const newBlog = new Blog({
    title: 'A new Blog',
    authour: 'Sum Gui',
    url: 'www.nope.no',
    likes: 430018,
  });

  api.post('/api/blogs'); //Left off rigth here 4.10
});

afterAll(async () => {
  await mongoose.connection.close();
});
