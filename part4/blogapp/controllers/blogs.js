const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET);
  if (!decodedToken.id)
    return response.status(401).json({ error: "token invalid" });

  const user = request.user;

  const body = request.body;

  const errors = [];

  if (!body.url) errors.push("url is required");
  if (!body.title) errors.push("title is required");

  if (errors.length) return response.status(400).json(errors);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const blogToDelete = await Blog.findOne({
    _id: request.params.id,
    user: user.id,
  });
  if (!blogToDelete) {
    return response.status(403).json({ error: "user invalid" });
  }

  await blogToDelete.deleteOne();

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const user = request.user;
  const blogToUpdate = await Blog.findOne({ _id: idToUpdate, user: user.id });
  if (!blogToUpdate) {
    return response.status(403).json({ error: "user invalid" });
  }

  const body = request.body;
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const result = await blogToUpdate.updateOne(updatedBlog, { new: true });

  response.json(result);
});

module.exports = blogRouter;
