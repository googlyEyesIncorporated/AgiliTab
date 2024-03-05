import { fireEvent, render, screen } from "@testing-library/react";
import { ListGroup } from "./Group";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { generateNewList } from "../../../features/utils/generateNewList";

const user = userEvent.setup();

const list1 = generateNewList();

const mockDispatch = jest.fn();
jest.mock("../../../app/hooks", () => ({
  ...jest.requireActual("../../../app/hooks"),
  useAppDispatch: jest.fn().mockImplementation(() => mockDispatch),
  useAppSelector: jest.fn().mockImplementation(() => list1),
}));

const props = {
  title: "test group",
  term: {
    start: 0,
    end: 100,
  },
  list: [
    {
      id: "1",
      name: "Task 1",
      done: false,
    },
  ],
  dragAndDrop: {
    enterListItem: jest.fn(),
    dragStart: jest.fn(),
    dragEnd: jest.fn(),
    enterList: jest.fn(),
    itemBeingDragged: {
      index: 0,
      listKey: "mediumTermList" as const,
    },
  },
  index: 0,
  type: "date",
  listKey: "shortTermList" as const,
  groupId: "1",
};

const WrappedListGroup = (
  <Provider store={store}>
    <ListGroup {...props} />;
  </Provider>
);

const settingsIcon = `group-${props.groupId}-settings`;
const copyIcon = `group-${props.groupId}-copy`;
const header = `group-${props.groupId}-header`;
const elapsedTime = `group-${props.groupId}-elapsed-time`;
const hidden = ".hidden";
const fadeIn1Sec = ".fade-in-1s";

describe("Group", () => {
  it("should render as expected", () => {
    render(WrappedListGroup);
    expect(screen.queryByText(props.list[0].name)).toBeInTheDocument();
    expect(screen.queryByText(props.title)).toBeInTheDocument();
    expect(screen.queryByTestId(elapsedTime)).toBeInTheDocument();
    expect(screen.queryByTestId(settingsIcon)).toBeInTheDocument();
    expect(screen.queryByTestId(copyIcon)).toBeInTheDocument();
  });

  it('should not see elapsed time when timeframe is set to "none"', () => {
    render(
      <Provider store={store}>
        <ListGroup {...{ ...props, type: "none" }} />;
      </Provider>
    );
    expect(screen.queryByText(props.list[0].name)).toBeInTheDocument();
    expect(screen.queryByText(props.title)).toBeInTheDocument();
    expect(screen.queryByTestId(elapsedTime)).not.toBeInTheDocument();
    expect(screen.queryByTestId(settingsIcon)).toBeInTheDocument();
    expect(screen.queryByTestId(copyIcon)).toBeInTheDocument();
  });

  it("should see elapsed time when timeframe is set to 'duration'", () => {
    render(
      <Provider store={store}>
        <ListGroup {...{ ...props, type: "duration" }} />;
      </Provider>
    );
    expect(screen.queryByText(props.list[0].name)).toBeInTheDocument();
    expect(screen.queryByText(props.title)).toBeInTheDocument();
    expect(screen.queryByTestId(elapsedTime)).toBeInTheDocument();
    expect(screen.queryByTestId(settingsIcon)).toBeInTheDocument();
    expect(screen.queryByTestId(copyIcon)).toBeInTheDocument();
  });

  it("should see elapsed time when timeframe is set to 'date'", () => {
    render(
      <Provider store={store}>
        <ListGroup {...{ ...props, type: "date" }} />;
      </Provider>
    );
    expect(screen.queryByText(props.list[0].name)).toBeInTheDocument();
    expect(screen.queryByText(props.title)).toBeInTheDocument();
    expect(screen.queryByTestId(elapsedTime)).toBeInTheDocument();
    expect(screen.queryByTestId(settingsIcon)).toBeInTheDocument();
    expect(screen.queryByTestId(copyIcon)).toBeInTheDocument();
  });

  it("should NOT show hidden icons without mousing over them", () => {
    render(WrappedListGroup);

    expect(
      screen.queryByTestId(copyIcon)?.querySelector(hidden)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(settingsIcon)?.querySelector(hidden)
    ).toBeInTheDocument();
  });

  it("should show hidden icons when mousing over them", () => {
    render(WrappedListGroup);
    fireEvent.mouseEnter(screen.getByTestId(header));

    // copyIcon
    expect(
      screen.queryByTestId(copyIcon)?.querySelector(hidden)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(copyIcon)?.querySelector(fadeIn1Sec)
    ).toBeInTheDocument();

    // settingsIcon
    expect(
      screen.queryByTestId(settingsIcon)?.querySelector(hidden)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(settingsIcon)?.querySelector(fadeIn1Sec)
    ).toBeInTheDocument();
  });

  it("should render a settings box when gears are clicked", () => {
    render(WrappedListGroup);
    fireEvent.mouseEnter(screen.getByTestId(header));

    fireEvent.click(
      screen.getByTestId(settingsIcon).querySelector(".fa-gears") as Element
    );
    expect(screen.queryByTestId("column-settings")).toBeInTheDocument();
  });

  it("should copy the list when copy icon was clicked", async () => {
    render(WrappedListGroup);
    await user.click(
      screen.getByTestId("group-1-copy").querySelector("svg") as Element
    );
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe("Task 1");
  });
});
