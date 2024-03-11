import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const AppJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

const setup = () => render(AppJsx);
const user = userEvent.setup();

describe("Copy Icons", () => {
  it("copy List and List Item", async () => {
    // Setup
    const { rerender } = setup();
    await user.click(
      screen.getByTestId("add-group").querySelector("svg") as Element
    );
    rerender(AppJsx);

    // Add first item
    fireEvent.change(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="text"]') as Element,
      { target: { value: "Task 1" } }
    );
    await user.click(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="submit"]') as Element
    );

    // Add second item
    fireEvent.change(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="text"]') as Element,
      { target: { value: "Task 2" } }
    );
    await user.click(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="submit"]') as Element
    );

    // Copy whole list
    await user.click(
      screen
        .getByTestId("group-container")
        .querySelector("svg.fa-copy") as Element
    );
    const wholeList = await navigator.clipboard.readText();
    expect(wholeList).toEqual("Task 1\r\nTask 2");

    // Copy list item
    await user.click(
      screen.getByTestId("list-item-0").querySelector("svg.fa-copy") as Element
    );
    const listItem = await navigator.clipboard.readText();
    expect(listItem).toEqual("Task 1");
  });
});
