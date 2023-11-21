const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const errors = [];
  const body = request.body;
  if (!body.url) errors.push("url is required");
  if (!body.title) errors.push("title is required");

  if (errors.length) response.status(400).json(errors);

  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const body = request.body;
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const result = await Blog.findByIdAndUpdate(idToUpdate, blogToUpdate, {
    new: true,
  });
  if (!result) response.status(404).end();

  response.json(result);
});

module.exports = blogRouter;
