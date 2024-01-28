import { render, screen } from "@testing-library/react";
import { BottomRow } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";

describe("bottomRow", () => {
  it("should display 3 lists, shortTerm, mediumTerm, longTerm", () => {
    render(
      <Provider store={store}>
        <BottomRow />
      </Provider>
    );
    const bottomRow = screen.getByTestId("bottom-row");
    expect(bottomRow).toBeInTheDocument();
    expect(bottomRow).toMatchSnapshot();
  });
});
