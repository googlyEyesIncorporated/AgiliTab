import { render, screen } from "@testing-library/react";
import { NowBox } from "./NowBox";
import TimeProvider from "../TimeProvider";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("NowBox", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("01 Sep 2023 00:00:00 GMT"));
  });
  it("should render the current date/time", () => {
    render(
      <Provider store={store}>
        <TimeProvider specifiedPeriod={5000}>
          <NowBox />
        </TimeProvider>
      </Provider>
    );
    const nowBox = screen.getByTestId("now-box");
    expect(nowBox).toMatchSnapshot();
  });
});
