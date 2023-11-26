import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
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

test("blog url and likes should rendered after click event", async () => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: 99,
    user: {},
  };

  const { container, getByText } = render(<Blog blog={blog} user={{}} />);
  const btnShow = getByText("view");

  await userEvent.click(btnShow);

  const div = container.querySelector(".togglableContent");
  expect(div).not.toHaveStyle("display: none");

  const blogUrl = getByText("testUrl");
  const blogLikes = getByText("99");

  expect(blogUrl).toBeInTheDocument();
  expect(blogLikes).toBeInTheDocument();
});
