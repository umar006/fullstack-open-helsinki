const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "655c4390b13c51f101d87946",
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "655c4390b13c51f101d87946",
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "655c4390b13c51f101d87946",
  },
];

const initialUsers = [
  {
    _id: "655c4390b13c51f101d87946",
    username: "mluukkai",
    name: "Matti Luukkainen",
    passwordHash: "salainen",
    blogs: [
      "5a422a851b54a676234d17f7",
      "5a422b3a1b54a676234d17f9",
      "5a422b891b54a676234d17fa",
    ],
  },
  {
    _id: "655cbf1c7625024b0ced4347",
    username: "root",
    name: "Superuser",
    passwordHash: "salainen",
    blogs: [],
  },
];

const nonExistingId = async () => {
  const note = new Blog({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
};
