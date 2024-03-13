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

describe("List", () => {
  it("should be added, removed and then undo removing it", async () => {
    const { rerender } = setup();
    // Null before clicking
    expect(screen.queryByTestId("group-container")).toBeNull();
    await user.click(
      screen.getByTestId("add-group").querySelector("svg") as Element
    );
    rerender(AppJsx);
    // Now has a group container
    expect(screen.getByTestId("group-container")).toBeInTheDocument();

    // trash it
    await user.click(
      screen
        .getByTestId("group-container")
        .querySelector("svg.fa-trash") as Element
    );
    // Is null after clicking trash icon
    expect(screen.queryByTestId("group-container")).toBeNull();

    // undo
    fireEvent.keyDown(document, {
      key: "z",
      ctrlKey: true,
    });

    // Now has a group container again
    expect(screen.getByTestId("group-container")).toBeInTheDocument();
  });
});
