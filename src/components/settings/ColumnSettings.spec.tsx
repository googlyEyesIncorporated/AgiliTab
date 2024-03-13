import { render, screen } from "@testing-library/react";
import { ColumnSettings } from "./ColumnSettings";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { addTerm } from "../../features/itemList/itemListSlice";
import { generateNewList } from "../../features/utils/generateNewList";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";
import { DateTime } from "luxon";

const props = {
  settingsContainer: { current: null },
  setHideSettings: jest.fn(),
  groupId: "0",
};

const columnSettings = (
  <Provider store={store}>
    <ColumnSettings {...props} />
  </Provider>
);

const listWithDuration = {
  title: "Day",
  duration: { qty: 1, unit: "days" },
  startDate: DateTime.now().startOf("day").toFormat(DATE_TIME_NO_SECONDS),
  type: "duration" as const,
  list: [],
};

const setup = (props: any) =>
  render(
    <Provider store={store}>
      <ColumnSettings {...props} />
    </Provider>
  );

describe("ColumnSetting", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render a settings box with a beginning date/time picker and a inputs to set duration by default", () => {
    const { rerender } = setup(props);
    const action = addTerm(
      generateNewList({ listKey: "0", listObject: listWithDuration })
    );
    act(() => {
      store.dispatch(action);
    });
    rerender(columnSettings);
    expect(screen.getByTestId("group-0-date")).not.toBeChecked();
    expect(screen.getByTestId("group-0-duration")).toBeChecked();
  });
  it("should render a settings box with a beginning and end date/time picker after selecting date from radio buttons", async () => {
    const { rerender } = setup(props);
    const action = addTerm(
      generateNewList({ listKey: "0", listObject: listWithDuration })
    );
    act(() => {
      store.dispatch(action);
    });
    rerender(columnSettings);
    await user.click(screen.getByTestId("group-0-date"));
    expect(screen.getByTestId("group-0-end-datepicker")).toBeVisible();
  });
});
