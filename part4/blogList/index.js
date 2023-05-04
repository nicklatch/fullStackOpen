require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then()
  .catch((error) => next.error);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs).catch((error) => next(error));
  });
});

app.post('/blogs/api', (request, response, next) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = process.env.PORT;
app.listen(`Listening on port: ${PORT}`);
