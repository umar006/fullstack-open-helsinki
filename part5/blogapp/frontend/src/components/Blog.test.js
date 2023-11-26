import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
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

test("blog url should not rendered", () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    user: {},
  };

  const container = render(<Blog blog={blog} user={{}} />).container;

  const div = container.querySelector(".togglableContent");

  expect(div).toHaveStyle("display: none");
});
