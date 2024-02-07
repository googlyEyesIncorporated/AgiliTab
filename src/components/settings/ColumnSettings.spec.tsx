import { render, screen } from "@testing-library/react";
import { ColumnSettings } from "./ColumnSettings";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const props = {
  settingsContainer: { current: null },
  setHideSettings: jest.fn(),
  groupId: 0,
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
    setup(props);
    expect(screen.getByTestId("group-0-date")).not.toBeChecked();
    expect(screen.getByTestId("group-0-duration")).toBeChecked();
  });
  it("should render a settings box with a beginning and end date/time picker after selecting date from radio buttons", async () => {
    setup(props);

    await user.click(screen.getByTestId("group-0-date"));
    expect(screen.getByTestId("group-0-end-datepicker")).toBeVisible();
  });
});
