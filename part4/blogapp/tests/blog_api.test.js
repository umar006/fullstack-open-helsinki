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

  test("if author property is missing, return status code 400", async () => {
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

afterAll(async () => {
  await mongoose.connection.close();
});
