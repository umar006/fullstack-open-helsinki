import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";

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
