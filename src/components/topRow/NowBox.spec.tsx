import { render, screen } from "@testing-library/react";
import { NowBox } from "./NowBox";
import TimeProvider from "../TimeProvider";
import { epochTimes } from "../../commonTestData.json";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const { Sep012023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};

describe("NowBox", () => {
  beforeEach(() => {
    jestSetTime(Sep012023);
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
