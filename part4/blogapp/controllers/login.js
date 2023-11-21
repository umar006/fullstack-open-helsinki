const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");

const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = !user
    ? null
    : bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect)
    return response.status(401).json({ error: "invalid username or password" });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES,
  });

  response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
