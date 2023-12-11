const bcrypt = require("bcrypt");
const User = require("../models/user");

const userRouter = require("express").Router();

userRouter.get("/", async (request, response) => {
  const users = await User.find().populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const idToFind = request.params.id;
  const user = await User.findById(idToFind).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });

  response.json(user);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const errors = [];

  if (!username) errors.push("username is required");
  if (!password) errors.push("password is required");
  if (username.length < 3) errors.push("username at least 3 characters long");
  if (password.length < 3) errors.push("password at least 3 characters long");

  if (errors.length) return response.status(400).json({ errors: errors });

  const usernameExist = await User.exists({ username });
  if (usernameExist)
    return response.status(422).json({ error: "username already exists" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
