const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();
  await User.insertMany(helper.initialUsers);
});

describe("create user", () => {
  test("success create user", async () => {
    const newUser = {
      username: "test",
      name: "test test",
      password: "test",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAfterCreate = await helper.usersInDb();
    expect(usersAfterCreate).toHaveLength(helper.initialUsers.length + 1);

    const usernames = usersAfterCreate.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
