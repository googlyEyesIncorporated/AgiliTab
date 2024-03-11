import { render, screen } from "@testing-library/react";
import { NowBox } from "./NowBox";
import TimeProvider from "../TimeProvider";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { hmma, mmmddyyyyDate } from "../../utils/DateTimeRegex";

describe("NowBox", () => {
  it("should render the current date/time", () => {
    render(
      <Provider store={store}>
        <TimeProvider specifiedPeriod={5000}>
          <NowBox />
        </TimeProvider>
      </Provider>
    );
    expect(screen.getByTestId("clock").innerHTML).toMatch(hmma);
    expect(
      screen.getByTestId("now-box").querySelector(".date span div")?.innerHTML
    ).toMatch(mmmddyyyyDate);
  });
});
