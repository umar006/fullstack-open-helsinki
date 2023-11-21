const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany();

  for (let blog of helper.initialBlogs) {
    let newBlog = new Blog(blog);
    await newBlog.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(3);
  expect(response.body[0].id).toBeDefined();
});

describe("addition new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Type wars");
  });

  test("if likes property is missing, value is zero", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("if title property is missing, return status code 400", async () => {
    const newBlog = {
      author: "Robert C. Martin",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog post", () => {
  test("success delete one blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete("/api/blogs/" + blogToDelete.id).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blogTitles = blogsAtEnd.map((blog) => blog.title);
    expect(blogTitles).not.toContain(blogToDelete.title);
  });
});

describe("update a blog post", () => {
  test("success update one blog", async () => {
    const blogsBeforeUpdate = await helper.blogsInDb();
    const blogToUpdate = blogsBeforeUpdate[0];
    blogToUpdate.likes++;

    await api
      .put("/api/blogs/" + blogToUpdate.id)
      .send(blogToUpdate)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blog.id === blogToUpdate.id,
    );
    expect(updatedBlog.likes).toBe(blogToUpdate.likes);
  });

  test("failed update one blog if id not found", async () => {
    const idNotFound = await helper.nonExistingId();

    await api
      .put("/api/blogs/" + idNotFound)
      .send({})
      .expect(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
