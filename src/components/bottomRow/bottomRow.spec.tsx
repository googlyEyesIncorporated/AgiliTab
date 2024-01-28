import { render, screen } from "@testing-library/react";
import { BottomRow } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import { epochTimes } from "../../commonTestData.json";

const { Sep012023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};

describe("bottomRow", () => {
  jestSetTime(Sep012023);
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
