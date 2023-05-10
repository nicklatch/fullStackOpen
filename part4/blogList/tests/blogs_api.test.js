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

describe('If the db has blogs, it...', () => {
  test('should return blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 10000);

  test('should return all blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('should have ID key for all blogs', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe('If a blog is added, it...', () => {
  test('should be able to return the name of its author', async () => {
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

  test('should default to zero if no likes are added', async () => {
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

  test('should respond with 400 if no title is specified', async () => {
    const newBlogNoTitle = {
      author: 'Sum Gui',
      url: 'www.nope.no',
    };
    await api.post('/api/blogs').send(newBlogNoTitle).expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test('should respond with 400 if no url is specified', async () => {
    const newBlogNoTitle = {
      title: 'A new blog',
      author: 'Sum Gui',
    };
    await api.post('/api/blogs').send(newBlogNoTitle).expect(400);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('Updating a blog post', () => {
  test('should succeed and return a status code of 201', async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedValues = {
      likes: 400,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedValues)
      .expect(201);

    const updatedBlog = await api
      .get(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(updatedBlog.body.likes).toEqual(updatedValues.likes);
  });
});

describe('Deletion of a blog...', () => {
  test('should succeed with status code 204 if it is valid', async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
