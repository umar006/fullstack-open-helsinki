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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
