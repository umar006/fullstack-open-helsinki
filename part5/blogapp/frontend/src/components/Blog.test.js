import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import Togglable from "./Togglable";

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

describe("Togglable component", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabelShow="show" buttonLabelHide="hide">
        <div>togglable content</div>
      </Togglable>,
    ).container;
  });

  test("at start children should not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
