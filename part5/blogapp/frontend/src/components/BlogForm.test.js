import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogServices from "../services/blogServices";

jest.mock("../services/blogServices");

test("<BlogForm /> success", async () => {
  const mockUseRef = { current: { toggleVisibility: jest.fn() } };
  const component = render(
    <BlogForm blogs={[]} setBlogs={jest.fn()} blogFormRef={mockUseRef} />,
  );

  const titleField = screen.getByPlaceholderText("title");
  const authorField = screen.getByPlaceholderText("author");
  const urlField = screen.getByPlaceholderText("url");
  const btnCreate = screen.getByText("create");

  await userEvent.type(titleField, "title kucing");
  await userEvent.type(authorField, "author dinosaurus");
  await userEvent.type(urlField, "test url");

  await userEvent.click(btnCreate);

  expect(blogServices.create).toHaveBeenCalledTimes(1);

  const notifSuccess = component.getByText(
    "title kucing by author dinosaurus",
    { exact: false },
  );
  expect(notifSuccess).toBeInTheDocument();
});
