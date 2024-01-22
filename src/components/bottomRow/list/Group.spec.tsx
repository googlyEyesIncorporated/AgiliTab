import { fireEvent, render, screen } from "@testing-library/react";
import { ListGroup } from "./Group";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { ComponentProps } from "react";
import "@testing-library/jest-dom";

const props = {
  title: "test group",
  term: {
    start: 0,
    end: 100,
    unitType: "type 1",
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
      itemList: [
        {
          id: "1",
          name: "Task 1",
          done: false,
        },
      ],
      index: 0,
      listKey: "mediumTermList" as const,
      save: true,
    },
  },
  listKey: "shortTermList" as const,
  isScopedToWorkingHours: false,
  groupId: 1,
};

const setup = (props: ComponentProps<typeof ListGroup>) =>
  render(
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
    setup(props);
    expect(screen.getByText(props.list[0].name)).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByTestId(elapsedTime)).toBeInTheDocument();
    expect(screen.getByTestId(settingsIcon)).toBeInTheDocument();
    expect(screen.getByTestId(copyIcon)).toBeInTheDocument();
  });

  it("should NOT show hidden icons without mousing over them", () => {
    setup(props);

    expect(
      screen.queryByTestId(copyIcon)?.querySelector(hidden)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(settingsIcon)?.querySelector(hidden)
    ).toBeInTheDocument();
  });

  it("should show hidden icons when mousing over them", () => {
    setup(props);
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
    setup(props);
    fireEvent.mouseEnter(screen.getByTestId(header));

    fireEvent.click(
      screen.getByTestId(settingsIcon).querySelector(".fa-gears") as Element
    );
    expect(screen.getByTestId("column-settings")).toBeInTheDocument();
  });
});
