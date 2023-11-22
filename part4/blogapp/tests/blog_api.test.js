const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

let headers = {};

beforeAll(async () => {
  const response = await api.post("/api/login").send({
    username: "mluukkai",
    password: "salainen",
  });

  headers.Authorization = "Bearer " + response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany();
  await User.deleteMany();

  await Blog.insertMany(helper.initialBlogs);
  await User.insertMany(helper.initialUsers);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .set(headers)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are three blogs", async () => {
  const response = await api.get("/api/blogs").set(headers);

  expect(response.body).toHaveLength(3);
  expect(response.body[0].id).toBeDefined();
});

describe("addition new blog", () => {
  test("a valid blog can be added", async () => {
    const users = await helper.usersInDb();
    const userMluukkai = users.find((user) => user.username === "mluukkai");
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      userId: userMluukkai.id,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set(headers)

      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs").set(headers);
    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("Type wars");
  });

  test("if likes property is missing, value is zero", async () => {
    const users = await helper.usersInDb();
    const userMluukkai = users.find((user) => user.username === "mluukkai");
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      userId: userMluukkai.id,
    };

    const response = await api
      .post("/api/blogs")
      .set(headers)
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
      .set(headers)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog post", () => {
  test("success delete one blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete("/api/blogs/" + blogToDelete.id)
      .set(headers)
      .expect(204);

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
      .set(headers)
      .send(blogToUpdate)
      .expect(200);

    const blogsAfterUpdate = await helper.blogsInDb();
    const updatedBlog = blogsAfterUpdate.find(
      (blog) => blog.id === blogToUpdate.id,
    );
    expect(updatedBlog.likes).toBe(blogToUpdate.likes);
  });

  test("failed update one blog if user not authorized", async () => {
    const idNotFound = await helper.nonExistingId();

    await api
      .put("/api/blogs/" + idNotFound)
      .set(headers)
      .send({})
      .expect(403);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
