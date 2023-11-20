const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => {
    return totalLikes + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    if (!favorite || favorite.likes < blog.likes)
      return { title: blog.title, author: blog.author, likes: blog.likes };

    return favorite;
  }, null);
};

const mostBlogs = (blogs) => {
  const groupAuthor = _.groupBy(blogs, "author");
  const blogCount = _.mapValues(
    groupAuthor,
    (authorBlogs) => authorBlogs.length,
  );
  const mostAuthor = _.maxBy(_.keys(blogCount, (author) => blogCount[author]));
  const mostBlogs = blogCount[mostAuthor];

  return {
    author: mostAuthor,
    blogs: mostBlogs,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
