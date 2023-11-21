require("dotenv").config();

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = String(process.env.JWT_EXPIRES);

module.exports = { MONGODB_URI, PORT, JWT_SECRET, JWT_EXPIRES };
