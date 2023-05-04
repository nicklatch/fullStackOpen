require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then()
  .catch((error) => next.error);

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

//API start
app.get("/api/blogs", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

app.get("/api/blogs/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      blog ? response.json(blog) : response.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/blogs", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((newBlog) => {
      response.status(201).json(newBlog);
    })
    .catch((error) => next(error));
});

app.put("/api/blogs/:id", (request, response, next) => {
  const { title, author, url, likes } = request.body;

  Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

app.delete("/api/blogs/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
