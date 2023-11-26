import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("display render blog title and author", () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    user: {},
  };

  render(<Blog blog={blog} user={{}} />);

  const element = screen.getByText(`${blog.title} ${blog.author}`);
  expect(element).toBeDefined();
});
