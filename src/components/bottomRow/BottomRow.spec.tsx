import { render, screen } from "@testing-library/react";
import { BottomRow } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import { epochTimes } from "../../commonTestData.json";
import { addTerm } from "../../features/itemList/itemListSlice";
import { generateNewList } from "../../features/utils/generateNewList";
import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";

const { Sep012023 } = epochTimes;
const jestSetTime = (newDateTime: number) => {
  jest.useFakeTimers().setSystemTime(new Date(newDateTime));
};

const WrappedBottomRow = (
  <Provider store={store}>
    <BottomRow />
  </Provider>
);
jestSetTime(Sep012023);

const Now = DateTime.now();

const list1 = generateNewList({
  listKey: "0",
  listObject: {
    type: "date",
    startDate: Now.startOf("day").toFormat(DATE_TIME_NO_SECONDS),
    endDate: Now.endOf("day").toFormat(DATE_TIME_NO_SECONDS),
    list: [],
    title: "Today",
  },
});
const list2 = generateNewList({
  listKey: "1",
  listObject: {
    type: "date",
    startDate: Now.startOf("month").toFormat(DATE_TIME_NO_SECONDS),
    endDate: Now.endOf("month").toFormat(DATE_TIME_NO_SECONDS),
    list: [],
    title: "Month",
  },
});
const list3 = generateNewList({
  listKey: "2",
  listObject: {
    type: "date",
    startDate: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
    endDate: Now.endOf("year").toFormat(DATE_TIME_NO_SECONDS),
    list: [],
    title: "Year",
  },
});

describe("bottomRow", () => {
  it("should display 3 lists", () => {
    const { rerender } = render(WrappedBottomRow);
    store.dispatch(addTerm(list1));
    store.dispatch(addTerm(list2));
    store.dispatch(addTerm(list3));
    rerender(WrappedBottomRow);
    const bottomRow = screen.getByTestId("bottom-row");
    expect(bottomRow).toBeInTheDocument();
    expect(bottomRow).toMatchSnapshot();
  });
});
