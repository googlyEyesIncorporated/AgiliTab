import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import "@testing-library/jest-dom";
import { DateTime } from "luxon";
import userEvent from "@testing-library/user-event";

const AppJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

const setup = () => render(AppJsx);
const Now = DateTime.now();
const user = userEvent.setup();

describe("List Items", () => {
  it("should be added, removed and then undo removing it", async () => {
    // Setup
    const { rerender } = setup();
    await user.click(
      screen.getByTestId("add-group").querySelector("svg") as Element
    );
    rerender(AppJsx);

    // Add List item
    fireEvent.change(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="text"]') as Element,
      { target: { value: "Test 1" } }
    );
    await user.click(
      screen
        .getByTestId("group-container")
        .querySelector('input[type="submit"]') as Element
    );
    expect(screen.getByTestId("list-item-0")).toBeInTheDocument();

    // Remove List item
    await user.click(screen.getByTestId("list-item-delete-0"));
    expect(screen.queryByTestId("list-item-0")).toBeNull();

    // Undo removal of List item
    fireEvent.keyDown(document, {
      key: "z",
      ctrlKey: true,
    });
    expect(screen.getByTestId("list-item-0")).toBeInTheDocument();
  });
});
