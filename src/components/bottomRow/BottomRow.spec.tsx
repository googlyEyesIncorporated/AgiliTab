import { fireEvent, render, screen } from "@testing-library/react";
import { BottomRow } from ".";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import { epochTimes } from "../../commonTestData.json";
import { addTerm } from "../../features/itemList/itemListSlice";
import { generateNewList } from "../../features/utils/generateNewList";
import { DateTime } from "luxon";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const user = userEvent.setup();

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
    act(() => {
      store.dispatch(addTerm(list1));
      store.dispatch(addTerm(list2));
      store.dispatch(addTerm(list3));
    });
    rerender(WrappedBottomRow);
    const bottomRow = screen.getByTestId("bottom-row");
    expect(bottomRow).toBeInTheDocument();
    expect(bottomRow).toMatchSnapshot();
  });

  it("should update the list title when title is edited", async () => {
    const replacementText = "Replacement Text";
    const { rerender } = render(WrappedBottomRow);
    act(() => {
      store.dispatch(addTerm(list1));
    });
    rerender(WrappedBottomRow);
    fireEvent.click(
      screen.getByTestId("group-0-settings").querySelector("svg") as Element
    );
    const titleInput = screen.getByTestId("group-0-unit-name");
    user.clear(titleInput);
    user.click(titleInput);
    user.paste(replacementText);
    rerender(WrappedBottomRow);
    expect(screen.getByText(replacementText)).toBeInTheDocument();
  });
});
